import type { Express } from "express";
import rateLimit from "express-rate-limit";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";
import { 
  getAvailableSlots, 
  getAlternativeSlots, 
  createAppointment, 
  formatDateGerman 
} from "./calendar";

// 2026-08-12: Rate-Limiting fuer alle Formular-Endpunkte, die Post von aussen annehmen.
// 20 Requests/15 Minuten je IP.
const formularLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Zu viele Anfragen. Bitte in einigen Minuten erneut versuchen." },
});

// 2026-08-12: /api/contact hatte KEINE Eingabevalidierung (const formData = req.body direkt
// verwendet) -- das Formular ist hochdynamisch (30+ Felder je nach gewaehltem Service).
// Statt starrem Zod-Schema: jeder String-Wert im kompletten Anfrage-Body wird rekursiv auf
// spitze Klammern geprueft (deckt auch kuenftige neue Formularfelder ab, ohne Schema-Pflege).
function enthaeltSpitzeKlammer(wert: unknown): boolean {
  if (typeof wert === "string") return /[<>]/.test(wert);
  if (Array.isArray(wert)) return wert.some(enthaeltSpitzeKlammer);
  if (wert && typeof wert === "object") {
    return Object.values(wert as Record<string, unknown>).some(enthaeltSpitzeKlammer);
  }
  return false;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Health Check Endpoint
  app.get("/health", (req, res) => {
    res.status(200).send("ok");
  });
  
  app.post("/api/contact", formularLimiter, async (req, res) => {
    try {
      const formData = req.body;
      const ip = (req.headers['x-forwarded-for'] as string || req.ip || '').split(',')[0].trim();
      if (enthaeltSpitzeKlammer(formData)) {
        return res.status(400).json({ success: false, error: "Ungültige Zeichen im Formular." });
      }
      
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = parseInt(process.env.SMTP_PORT || "465");
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      
      console.log(`[EMAIL] SMTP Config Check - Host: ${smtpHost ? 'SET' : 'MISSING'}, Port: ${smtpPort}, User: ${smtpUser ? 'SET' : 'MISSING'}, Pass: ${smtpPass ? 'SET' : 'MISSING'}`);
      
      if (!smtpHost || !smtpUser || !smtpPass) {
        console.log("[EMAIL] SMTP not configured, logging form data:", JSON.stringify(formData));
        return res.json({ success: true, message: "Anfrage gespeichert (E-Mail-Versand nicht konfiguriert)" });
      }
      
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: 465,
        secure: true,
        tls: {
          rejectUnauthorized: false,
          ciphers: 'SSLv3'
        },
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        connectionTimeout: 30000,
        greetingTimeout: 30000,
      });
      
      const fullName = `${formData.firstName || ""} ${formData.lastName || ""}`.trim();
      const subjectLine = formData.subject || "Kontaktformular";
      const subject = `Neue Anfrage: ${subjectLine} - ${fullName || "Unbekannt"}`;

      let emailBody = `
NEUE ANFRAGE VON RENODEX.DE
============================

KONTAKTDATEN:
- Name: ${fullName || "-"}
- Firma: ${formData.company || "-"}
- Telefon: ${formData.phone || "-"}
- E-Mail: ${formData.email || "-"}
- Adresse: ${formData.address || "-"}
- PLZ: ${formData.postalCode || "-"}
- Ort: ${formData.city || "-"}

BETREFF:
${subjectLine}
${formData.message ? `
BESCHREIBUNG:
${formData.message}
` : ""}${(formData.objektAddress || formData.objektPostalCode || formData.objektCity) ? `
BAUVORHABEN-ADRESSE:
- Adresse: ${formData.objektAddress || "-"}
- PLZ: ${formData.objektPostalCode || "-"}
- Ort: ${formData.objektCity || "-"}
` : ""}${formData.inspektionTerminFormatted ? `
TERMINWUNSCH:
${formData.inspektionTerminFormatted}
` : ""}`;

      if (formData.uploadedFiles && formData.uploadedFiles.length > 0) {
        emailBody += `
HOCHGELADENE DATEIEN:
${formData.uploadedFiles.map((f: any) => `- ${f.name} (${f.type}, ${Math.round(f.size / 1024)} KB)`).join("\n")}
(Hinweis: Dateien wurden vom Kunden hochgeladen, aber nicht an diese E-Mail angehängt. Bitte beim Rückruf ansprechen.)
`;
      }

      emailBody += `
============================
Gesendet von: renodex.de Kontaktformular
Absender-IP: ${ip}
Zeitpunkt: ${new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" })}
`;

      await transporter.sendMail({
        from: `"Renodex" <${smtpUser}>`,
        to: "info@renodex.de",
        replyTo: formData.email || smtpUser,
        subject: subject,
        text: emailBody,
      });
      
      console.log("Email sent successfully to info@renodex.de");

      // Send confirmation email to customer (optional - don't fail if this doesn't work)
      if (formData.email) {
        try {
          const customerEmailBody = `Guten Tag ${fullName || ""},

vielen Dank für Ihre Anfrage bei Renodex!

Wir haben Ihre Nachricht erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.

IHRE ANFRAGE:
- Betreff: ${subjectLine}
${formData.address ? `- Adresse: ${formData.address}, ${formData.postalCode || ""} ${formData.city || ""}` : ""}

Bei dringenden Notfällen erreichen Sie uns unter:
Telefon: [Telefon folgt]

Mit freundlichen Grüßen
Ihr Team von Renodex

---
Renodex
[Adresse folgt]
E-Mail: info@renodex.de
Web: www.renodex.de`;

          await transporter.sendMail({
            from: `"Renodex" <${smtpUser}>`,
            to: formData.email,
            subject: `Ihre Anfrage bei Renodex - ${subjectLine}`,
            text: customerEmailBody,
          });
          
          console.log("Confirmation email sent to customer:", formData.email);
        } catch (confirmError: any) {
          console.log("Could not send confirmation email to customer (non-critical):", confirmError?.message);
        }
      }

      res.json({ success: true, message: "Anfrage erfolgreich gesendet" });
      
    } catch (error: any) {
      console.error("Error sending email:", error?.message || error);
      console.error("Full error:", JSON.stringify(error, null, 2));
      res.status(500).json({ success: false, message: "Fehler beim Senden der Anfrage: " + (error?.message || "Unbekannter Fehler") });
    }
  });

  // Calendar availability endpoint
  app.get("/api/calendar/availability", async (req, res) => {
    try {
      const dateStr = req.query.date as string;
      if (!dateStr) {
        return res.status(400).json({ error: "Datum erforderlich" });
      }

      const date = new Date(dateStr);
      const slots = await getAvailableSlots(date);
      
      res.json({
        date: dateStr,
        availableSlots: slots.map(s => ({
          start: s.toISOString(),
          formatted: formatDateGerman(s),
        })),
      });
    } catch (error: any) {
      console.error("Calendar availability error:", error?.message || error);
      res.status(500).json({ error: "Fehler beim Abrufen der Verfügbarkeit" });
    }
  });

  // Get next available appointment slots (for form widget)
  app.get("/api/calendar/next-slots", async (req, res) => {
    try {
      const count = Math.min(parseInt(req.query.count as string) || 6, 12);
      const today = new Date();
      const allSlots: { date: string; time: string; dateTime: string; formatted: string }[] = [];
      
      // Check next 14 business days
      for (let i = 1; i <= 21 && allSlots.length < count; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() + i);
        
        // Skip weekends
        if (checkDate.getDay() === 0 || checkDate.getDay() === 6) continue;
        
        try {
          const daySlots = await getAvailableSlots(checkDate);
          for (const slot of daySlots) {
            if (allSlots.length >= count) break;
            allSlots.push({
              date: slot.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' }),
              time: slot.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' }),
              dateTime: slot.toISOString(),
              formatted: formatDateGerman(slot),
            });
          }
        } catch (e) {
          // Skip days with errors
        }
      }
      
      res.json({ slots: allSlots });
    } catch (error: any) {
      console.error("Next slots error:", error?.message || error);
      res.status(500).json({ error: "Fehler beim Abrufen der Termine", slots: [] });
    }
  });

  // Calendar booking endpoint
  app.post("/api/calendar/book", formularLimiter, async (req, res) => {
    try {
      const { name, email, phone, service, dateTime, notes, problemSummary } = req.body;
      
      if (!name || !email || !dateTime) {
        return res.status(400).json({ error: "Name, E-Mail und Termin erforderlich" });
      }

      const startTime = new Date(dateTime);
      const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour duration

      const summary = `Renodex: ${service || "Beratungstermin"} - ${name}`;
      const description = `Kunde: ${name}
E-Mail: ${email}
Telefon: ${phone || "-"}
Leistung: ${service || "Beratung"}
${problemSummary ? `\nPROBLEM/URSACHE:\n${problemSummary}` : ""}
${notes ? `\nAnmerkungen: ${notes}` : ""}

Gebucht über renodex.de Chatbot`;

      const appointment = await createAppointment(
        summary,
        description,
        startTime,
        endTime,
        email
      );

      // Send confirmation email to customer
      const smtpHost = process.env.SMTP_HOST;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      if (smtpHost && smtpUser && smtpPass) {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: 465,
          secure: true,
          tls: { rejectUnauthorized: false, ciphers: 'SSLv3' },
          auth: { user: smtpUser, pass: smtpPass },
        });

        await transporter.sendMail({
          from: `"Renodex" <${smtpUser}>`,
          to: email,
          subject: `Terminbestätigung: ${formatDateGerman(startTime)} - Renodex`,
          text: `Guten Tag ${name},

vielen Dank für Ihre Terminbuchung bei Renodex!

Ihr Termin wurde bestätigt:
- Datum: ${formatDateGerman(startTime)}
- Leistung: ${service || "Beratung"}
${notes ? `- Ihre Anmerkungen: ${notes}` : ""}

Bei Fragen erreichen Sie uns unter:
E-Mail: info@renodex.de
Telefon: [Telefon folgt]

Mit freundlichen Grüßen
Ihr Team von Renodex
[Adresse folgt]`,
        });

        // Also notify the company
        await transporter.sendMail({
          from: `"Renodex" <${smtpUser}>`,
          to: "info@renodex.de",
          subject: `Neue Terminbuchung: ${formatDateGerman(startTime)} - ${name}`,
          text: `NEUE TERMINBUCHUNG über Chatbot
============================

Termin: ${formatDateGerman(startTime)}
Kunde: ${name}
E-Mail: ${email}
Telefon: ${phone || "-"}
Leistung: ${service || "Beratung"}

${problemSummary ? `PROBLEM/URSACHE (Zusammenfassung):
${problemSummary}
` : ""}${notes ? `Anmerkungen: ${notes}
` : ""}
Die Terminanfrage geht jetzt an ein Teammitglied zur Bestaetigung.`,
        });
      }

      res.json({
        success: true,
        eventId: appointment.eventId,
        message: `Termin am ${formatDateGerman(startTime)} erfolgreich gebucht!`,
      });
    } catch (error: any) {
      console.error("Calendar booking error:", error?.message || error);
      res.status(500).json({ error: "Fehler beim Buchen des Termins" });
    }
  });

  // AI Chatbot endpoint with calendar integration
  // Verkaufschat: laeuft ueber Claude Code auf dem eigenen VPS (Dienst renodex-bot,
  // 187.127.70.129:8107) -- dort ohne jedes Werkzeug und nur fuer diesen Host freigegeben.
  // 23.08.2026 KORRIGIERT: zeigte faelschlich auf Port 8102 (089dachgmbh-bot) -- ein
  // "renodexgmbh-bot" existierte nie, der Kommentar war falsch/der Port ein Kopierfehler.
  // Der Chat antwortete dadurch mit 089Dach-GmbH-Inhalten statt Renodex-eigenen -- klarer
  // Firmentrennungs-Verstoss. Eigener Dienst renodex-bot.service jetzt angelegt.
  // Der Prompt (Renodex_Bot/prompt.md) wird bei jeder Anfrage frisch gelesen,
  // Aenderungen wirken sofort ohne Deploy. Ersetzt die vorherige direkte Anthropic-API-
  // Integration samt eingebauter Kalenderabfrage (Regel: kein API-Schluessel und kein
  // Google-Kalender-Zugang in der Website selbst, siehe projekte/webseiten/CLAUDE.md) --
  // Terminwunsch geht jetzt wie bei renodex.de per Gespraech + Lead-Mail, nicht per
  // Slot-Anzeige.
  app.post("/api/chat", formularLimiter, async (req, res) => {
    const RUECKFALL = "Entschuldigung, ich kann gerade nicht antworten. Schreiben Sie uns " +
      "bitte an info@renodex.de oder rufen Sie an: [Telefon folgt].";
    try {
      const { messages } = req.body || {};
      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ message: "Ungültige Anfrage" });
      }
      const letzte = messages[messages.length - 1];
      const frage = String(letzte?.content || "").trim();
      if (!frage) return res.status(400).json({ message: "Ungültige Nachricht" });
      const verlauf = messages.slice(0, -1).map((m: any) => ({ role: m.role, content: m.content }));
      const r = await fetch("http://187.127.70.129:8107/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: frage, history: verlauf }),
        signal: AbortSignal.timeout(90_000),
      });
      if (!r.ok) return res.json({ message: RUECKFALL, fallback: true });
      const daten: any = await r.json();
      return res.json({ message: daten.message || RUECKFALL });
    } catch (error: any) {
      console.error("Chat error:", error?.message || error);
      res.status(500).json({ message: "Chat service unavailable" });
    }
  });

  // DB-Preise (preis_katalog ueber preis-api.service) fuer Live-Ueberschreibung im
  // Frontend, ohne neuen Deploy -- gleiches Muster wie Renodex-Haptseite.
  let preiseCache: { stand: number; daten: any } | null = null;
  app.get("/api/preise", async (_req, res) => {
    const RUECKFALL = { firma_group: "renodex", preise: [] };
    try {
      if (preiseCache && Date.now() - preiseCache.stand < 60_000) {
        return res.json(preiseCache.daten);
      }
      const r = await fetch("http://187.127.70.129:3034/preise/renodex", {
        signal: AbortSignal.timeout(5_000),
      });
      if (!r.ok) return res.json(preiseCache?.daten || RUECKFALL);
      const daten = await r.json();
      preiseCache = { stand: Date.now(), daten };
      return res.json(daten);
    } catch (error: any) {
      console.error("Preis-API Fehler:", error?.message || error);
      return res.json(preiseCache?.daten || RUECKFALL);
    }
  });

  return httpServer;
}
