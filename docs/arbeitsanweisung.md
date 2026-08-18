# Arbeitsanweisung: Interne Verlinkung

## Ziel
Die Subdomain dacharbeiten.089dach.de soll durch gezielte interne Verlinkung von der Hauptdomain 089dach.de gestärkt werden. Durch erhöhte Sichtbarkeit wichtiger Landingpages (Notdienst, Dachreparatur, Dachsanierung Kosten, Bezirksseiten) verbessert sich das Crawling und Ranking der Subdomain.

## A) Startseite 089dach.de
1. Drei prominente Links auf der Startseite platzieren:
   - **24h Dachreparatur & Notdienst in München – Soforthilfe bei Sturmschäden** → `/notdienst`
   - **Dach reparieren lassen in München – schnell & zuverlässig** → `/dach-reparieren`
   - **Was kostet eine Dachsanierung in München?** → `/dachsanierung-kosten`
2. Links im Hero‑Bereich, in der Leistungsübersicht und im CTA‑Bereich einfügen. Die Linktexte enthalten jeweils die wichtigsten Keywords und den lokalen Bezug („München“, „Soforthilfe“).

## B) Footer – Dauerhafte Power-Verlinkung
Im Footer auf 089dach.de dauerhaft verlinken:
- **Dachreparatur München** → `/dach-reparieren`
- **Dach Notdienst München** → `/notdienst`
- **Dachsanierung Kosten** → `/dachsanierung-kosten`
Keyword-Anker verwenden, nicht „hier klicken“.

## C) Leistungen-Seite – Kontextlinks
Auf der Seite *Leistungen* (Subdomain) sollen thematische Links eingefügt werden. In den Einführungsabsätzen sind nun Links auf die wichtigsten Unterseiten eingebettet:
- *Dachsanierung Kosten* → `/dachsanierung-kosten`
- *Dachreparatur München* → `/dach-reparieren`
- *24h Dach Notdienst* → `/notdienst`
Diese Links wurden in `leistungen.tsx` implementiert.

## D) Bezirksseiten – Deep Links
Zusätzlich können Links zu Bezirksseiten gesetzt werden, z. B.:
- **Dachreparatur in Schwabing** → `/bezirk/schwabing`
- **Dachdecker Notdienst in Pasing** → `/bezirk/pasing`
- **Dachsanierung in Bogenhausen** → `/bezirk/bogenhausen`

## Anchor-Text-Strategie
- Variationen verwenden: *Dachreparatur München*, *Dach reparieren lassen*, *Notdienst Dachdecker München*, *24h Dachservice* usw.
- Identische Ankertexte vermeiden, um Manipulation zu verhindern.

## Erwarteter Effekt
- +20–40 % mehr Crawling durch Google
- +30–60 % Ranking‑Boost für relevante Keywords
- Sichtbarkeitsanstieg innerhalb von ca. 2‑3 Wochen

## Bonus: Kategorie „Soforthilfe & Reparatur“
Auf 089dach.de eine eigene Kategorie „Soforthilfe & Reparatur“ anlegen, die ausschließlich auf die Subdomain verweist. So erkennt Google das Thema als Kern‑Cluster.

## Umsetzung
- Hero‑Links in `FunnelHero.tsx` angepasst (Notdienst, Reparatur, Sanierungskosten).
- Footer‑Ankertexte in `Footer.tsx` überprüft (stimmen bereits).
- Kontextlinks in `leistungen.tsx` eingefügt (Dachsanierung Kosten, Dachreparatur München, 24h Dach Notdienst).
- Diese Arbeitsanweisung dokumentiert die durchgeführten Änderungen und dient als Leitfaden für weitere SEO‑Optimierungen.
