// ⛔ ERZEUGT von /root/projekte/webseiten/mail_signatur_erzeugen.py aus email/mail_entwurf.py
// (FIRMEN_SIGNATUR["renodex"]). Nicht von Hand ändern: Anschrift, Telefon und Pflichtangaben stehen nur
// dort. Stand der Quelle: fd8dae31211b
import fs from "fs";
import path from "path";

export const SIGNATUR = {
  "marke": "renodex",
  "sprache": "de",
  "name": [
    "Ihr Renodex Team"
  ],
  "firma": "Renodex",
  "adresse": [
    "K. Bilic",
    "Helmut-Schmidt-Allee 54",
    "81248 München"
  ],
  "telefon": "+49 89 381684766",
  "email": "info@renodex.de",
  "web": "https://renodex.de",
  "datenschutz": "https://renodex.de/datenschutz",
  "pflichtangaben": [
    "Inhaber: Krešimir Bilic",
    "Sitz der Firma: München",
    "Steuernummer: 144/147/00730"
  ],
  "sprachen": {
    "de": {
      "gruss": "Mit freundlichen Grüßen",
      "tel": "Tel:",
      "mail": "E-Mail:",
      "web": "Web:",
      "datenschutz": "Datenschutz:"
    },
    "hr": {
      "gruss": "S poštovanjem",
      "tel": "Tel:",
      "mail": "E-pošta:",
      "web": "Web:",
      "datenschutz": "Zaštita podataka:"
    },
    "tr": {
      "gruss": "Saygılarımla",
      "tel": "Tel:",
      "mail": "E-posta:",
      "web": "Web:",
      "datenschutz": "Gizlilik Politikası:"
    },
    "es": {
      "gruss": "Un cordial saludo",
      "tel": "Tel:",
      "mail": "Correo:",
      "web": "Web:",
      "datenschutz": "Protección de datos:"
    },
    "ro": {
      "gruss": "Cu stimă",
      "tel": "Tel:",
      "mail": "E-mail:",
      "web": "Web:",
      "datenschutz": "Protecția datelor:"
    },
    "en": {
      "gruss": "Kind regards,",
      "tel": "Phone:",
      "mail": "Email:",
      "web": "Web:",
      "datenschutz": "Privacy policy:"
    },
    "ru": {
      "gruss": "С уважением",
      "tel": "Тел.:",
      "mail": "Эл. почта:",
      "web": "Сайт:",
      "datenschutz": "Защита данных:"
    },
    "uk": {
      "gruss": "З повагою",
      "tel": "Тел.:",
      "mail": "Ел. пошта:",
      "web": "Сайт:",
      "datenschutz": "Захист даних:"
    },
    "zh": {
      "gruss": "此致 敬礼",
      "tel": "电话：",
      "mail": "电子邮件：",
      "web": "网站：",
      "datenschutz": "隐私政策："
    },
    "ar": {
      "gruss": "مع أطيب التحيات",
      "tel": "الهاتف:",
      "mail": "البريد الإلكتروني:",
      "web": "الموقع الإلكتروني:",
      "datenschutz": "حماية البيانات:"
    }
  },
  "logoDatei": "logo-mail.png",
  "logoCid": "renodexlogo",
  "logoBreite": 60,
  "logoHoehe": 50
} as const;

const esc = (wert: string): string =>
  wert.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Gruß und Beschriftungen einer Sprache; unbekannte oder fehlende Angabe = Sprache der Marke. */
function worte(lang?: string) {
  const alle = SIGNATUR.sprachen as Record<string, { gruss: string; tel: string; mail: string; web: string; datenschutz: string }>;
  return (lang && alle[lang]) || alle[SIGNATUR.sprache] || alle["de"];
}

/**
 * Schluss jeder Kunden-Mail als Text: Gruß, Name, Firma, Anschrift, Kontakt, Pflichtangaben.
 * `lang`: Sprache der Mail, wenn die Website mehrsprachig schreibt. `name`: Team-Zeile(n) in dieser Sprache.
 */
export function signaturText(lang?: string, name?: string[]): string {
  const s = SIGNATUR;
  const w = worte(lang);
  const kontakt = [
    s.telefon ? `${w.tel} ${s.telefon}` : "",
    s.email ? `${w.mail} ${s.email}` : "",
    s.web ? `${w.web} ${s.web}` : "",
    s.datenschutz ? `${w.datenschutz} ${s.datenschutz}` : "",
  ].filter(Boolean);
  return [
    w.gruss,
    ...(name ?? s.name),
    "",
    "_______________________",
    "",
    s.firma,
    ...s.adresse,
    "",
    ...kontakt,
    ...(s.pflichtangaben.length ? ["", ...s.pflichtangaben] : []),
  ].join("\n");
}

/** Derselbe Schluss als HTML: Aptos 10 pt an jedem Knoten, Trennlinie, Logo, Firmenblock. */
export function signaturHtml(lang?: string, name?: string[]): string {
  const s = SIGNATUR;
  const stil = 'font-family:Aptos,sans-serif;font-size:10pt;color:#222;margin:0;line-height:1.35';
  const klein = 'font-family:Aptos,sans-serif;font-size:9pt;color:#555;margin:0;line-height:1.35';
  const zeile = (text: string, css: string = stil) => `<p style="${css}">${esc(text)}</p>`;
  const w = worte(lang);
  const kontakt = [
    s.telefon ? `${w.tel} ${s.telefon}` : "",
    s.email ? `${w.mail} ${s.email}` : "",
    s.web ? `${w.web} ${s.web}` : "",
    s.datenschutz ? `${w.datenschutz} ${s.datenschutz}` : "",
  ].filter(Boolean);
  const logo = signaturLogoPfad()
    ? `<p style="${stil};padding:6px 0"><img src="cid:${s.logoCid}" width="${s.logoBreite}" height="${s.logoHoehe}" alt="${esc(s.firma)}" style="display:block;border:0"></p>`
    : "";
  return [
    `<div style="margin-top:18px">`,
    zeile(w.gruss),
    ...(name ?? s.name).map((n) => zeile(n)),
    `<p style="${stil};border-top:1px solid #bbb;margin-top:12px;padding-top:8px;font-size:1px;line-height:1px">&nbsp;</p>`,
    logo,
    `<p style="${stil};font-weight:bold">${esc(s.firma)}</p>`,
    ...s.adresse.map((a) => zeile(a, klein)),
    `<p style="${klein};padding-top:6px">${kontakt.map(esc).join("<br>")}</p>`,
    s.pflichtangaben.length ? `<p style="${klein};padding-top:6px">${s.pflichtangaben.map(esc).join("<br>")}</p>` : "",
    `</div>`,
  ].join("");
}

/** Das Logo liegt im Container nur unter dist/public; lokal unter client/public. Zur Laufzeit gesucht. */
export function signaturLogoPfad(): string | null {
  if (!SIGNATUR.logoDatei) return null;
  const kandidaten = [
    path.join(process.cwd(), "dist", "public", SIGNATUR.logoDatei),
    path.join(process.cwd(), "public", SIGNATUR.logoDatei),
    path.join(process.cwd(), "client", "public", SIGNATUR.logoDatei),
  ];
  return kandidaten.find((p) => fs.existsSync(p)) ?? null;
}

/** Anhang für nodemailer; leer, wenn das Logo fehlt — eine Mail scheitert nie am Logo (BUG-04-67). */
export function signaturAnhaenge(): { filename: string; path: string; cid: string; contentDisposition: "inline" }[] {
  const pfad = signaturLogoPfad();
  return pfad ? [{ filename: SIGNATUR.logoDatei, path: pfad, cid: SIGNATUR.logoCid, contentDisposition: "inline" }] : [];
}
