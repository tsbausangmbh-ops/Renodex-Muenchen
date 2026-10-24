// Anweisung 386 (Betreiber 25.10.2026, Nr. 1256): Jede interne Formularmail nennt Website und Seite.
// „Website: <domain>“ fest je Repo, „Seite: <URL>“ aus dem Feld `seite` (window.location.href), sonst Referer,
// sonst „-“. Nur URLs der eigenen Domain, höchstens 300 Zeichen, im HTML escapt (kein Link).
// Gleiches Format wie 089cleaner.de (server/email.ts), gelesen von anfrage_zu_akte._seite_feld.
import type { Request } from "express";

export const WEBSITE = "renodex.de";
const EIGENE_HOSTS = ["renodex.de", "www.renodex.de"];

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export function seiteAusAnfrage(req: Request): string {
  const feld = req.body && typeof req.body.seite === "string" ? req.body.seite.trim() : "";
  const roh = feld || (req.get("referer") || "").trim();
  if (!roh) return "-";
  try {
    const u = new URL(roh);
    if ((u.protocol !== "https:" && u.protocol !== "http:") || !EIGENE_HOSTS.includes(u.hostname.toLowerCase())) return "-";
    u.username = "";
    u.password = "";
    return u.href.slice(0, 300);
  } catch {
    return "-";
  }
}

export function herkunftText(seite: string): string {
  return `Website: ${WEBSITE}\nSeite: ${seite || "-"}`;
}

export function herkunftHtml(seite: string): string {
  return `<p>Website: ${esc(WEBSITE)}<br>Seite: ${esc(seite || "-")}</p>`;
}
