// Firmenangaben für renodex.de – die EINZIGE Stelle dafür (Client und Server importieren sie).
// Ziel 1926, Betreiber 04.11.2026: „Tal 44 überall“. Werte = DB-Master kv_generator.firma_templates (Renodex UG).
// Koordinaten Tal 44 laut Photon/OSM. Keine USt-IdNr.: ustId bleibt null, der Baustein erscheint nur, wenn sie gesetzt ist.

export const FIRMA = {
  marke: "Renodex",
  url: "https://renodex.de",
  rechtstraeger: "Renodex UG (haftungsbeschränkt)",
  vertreten: "Robert Daniel Bucur",
  strasse: "Tal 44",
  plz: "80331",
  ort: "München",
  telefon: "+49 89 381684766",
  telefonLink: "+4989381684766",
  email: "info@renodex.de",
  register: "Amtsgericht München, HRB 308842",
  steuernummer: "27/138/05593",
  ustId: null as string | null,
  lat: 48.1354,
  lng: 11.5811,
};

export const FIRMA_ADRESSE = `${FIRMA.strasse}, ${FIRMA.plz} ${FIRMA.ort}`;
