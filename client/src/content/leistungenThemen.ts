export interface VertiefungAbschnitt {
  titel: string;
  text: string;
}

export interface WeitereFrage {
  frage: string;
  antwort: string;
}

export interface LeistungThema {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroFrage: string;
  heroLead: string;
  heroImage: string;
  problemUeberschrift: string;
  problemText: string;
  loesungUeberschrift: string;
  loesungPunkte: string[];
  vertiefungUeberschrift?: string;
  vertiefungAbschnitte?: VertiefungAbschnitt[];
  sekundaerBild?: string;
  sekundaerBildAlt?: string;
  bildVorher?: string;
  bildVorherAlt?: string;
  bildNachher?: string;
  bildNachherAlt?: string;
  boxTitel: string;
  ausEinerHandText: string;
  faqFrage: string;
  faqAntwort: string;
  weitereFragen?: WeitereFrage[];
}

export const LEISTUNGEN_THEMEN: LeistungThema[] = [
  {
    slug: "komplettsanierung",
    title: "Komplettsanierung",
    metaTitle: "Komplettsanierung München – Haus & Wohnung | Renodex",
    metaDescription: "Komplettsanierung in München und Umgebung im Umkreis von 25 km: Sanierung, Renovierung, Elektro, Sanitär, Heizung – alles aus einer Hand mit Renodex.",
    heroFrage: "Was ist eine Komplettsanierung – und wann lohnt sie sich?",
    heroLead: "Eine Komplettsanierung fasst alle Gewerke einer Haus- oder Wohnungssanierung unter einer Planung zusammen – von der Elektroinstallation über Sanitär und Heizung bis zu Böden und Malerarbeiten. Statt fünf Handwerker einzeln zu koordinieren, übernimmt Renodex die gesamte Abstimmung.",
    heroImage: "/images/optimized/leistung-komplettsanierung.webp",
    problemUeberschrift: "Mehrere Gewerke, ein Terminplan – und ständig Abstimmungsbedarf",
    problemText: "Wer Haus oder Wohnung umfassend sanieren will, steht schnell vor derselben Herausforderung: Elektriker, Sanitärinstallateur, Maler und Bodenleger arbeiten selten aufeinander abgestimmt. Termine verschieben sich, Gewerke behindern sich gegenseitig, und die Verantwortung für das Gesamtergebnis liegt am Ende bei niemandem so richtig.",
    loesungUeberschrift: "Eine Ansprechperson, ein Zeitplan, ein Ergebnis",
    loesungPunkte: [
      "Ein fester Ansprechpartner für die gesamte Sanierung",
      "Abgestimmter Zeitplan für alle beteiligten Gewerke",
      "Elektro, Sanitär, Heizung, Böden und Malerarbeiten aus einer Planung",
      "Regelmäßige Rücksprache statt Einzelabsprachen mit jedem Gewerk",
    ],
    vertiefungUeberschrift: "Wie läuft eine Komplettsanierung bei RENODEX konkret ab?",
    vertiefungAbschnitte: [
      { titel: "Wie wird eine Komplettsanierung geplant und koordiniert?", text: "Eine Komplettsanierung buendelt mehrere Gewerke zu einem Bauablauf: Haussanierung oder Wohnungssanierung als tragende Basis, dazu je nach Bedarf Innenausbau, Trockenbau und Malerarbeiten/Fassade. RENODEX stimmt die Reihenfolge der Gewerke so ab, dass Rohbauarbeiten vor Ausbauarbeiten stehen und Maler- sowie Fassadenarbeiten den Abschluss bilden. Die Abstimmung erfolgt digital anhand von Fotos, Videos oder Plaenen, die der Kunde vorab einreicht." },
      { titel: "Welche Bausteine lassen sich zu einer Komplettsanierung kombinieren?", text: "Die Komplettsanierung ist eine Buendelung, kein eigenes Gewerk. Als Grundlage dient entweder die Haussanierung (gesamtes Gebaeude) oder die Wohnungssanierung (einzelne Einheit). Ergaenzend werden Innenausbau (Raumaufteilung, Einbauten), Trockenbau (Wand- und Deckenkonstruktionen) sowie Malerarbeiten und Fassade als zusaetzliche Bausteine gebucht - je nachdem, welchen Umfang das Bauvorhaben tatsaechlich braucht." },
      { titel: "Wer ist bei mehreren Gewerken gleichzeitig der Ansprechpartner?", text: "Bei einer Buendelung mehrerer Gewerke gibt es fuer den Kunden einen zentralen Ansprechpartner bei RENODEX, der die einzelnen Baustellen-Termine mit den beteiligten Gewerken abstimmt. So muss der Kunde nicht selbst zwischen Trockenbauer, Maler und Innenausbauer vermitteln, sondern erhaelt eine gemeinsame Zeitschiene fuer den gesamten Ablauf." },
    ],
    boxTitel: "Alle Gewerke aus einer Hand koordiniert",
    ausEinerHandText: "Eine Komplettsanierung betrifft in der Regel Haus und Wohnung gleichermaßen – deshalb koordiniert Renodex auf Wunsch auch Fassade und Mauerwerksabdichtung mit, wenn diese Teil des Vorhabens sind.",
    faqFrage: "Was kostet eine Komplettsanierung in München?",
    faqAntwort: "Die Kosten hängen vom Umfang der Arbeiten, dem Zustand der Bausubstanz und den gewünschten Gewerken ab. Nach einer Besichtigung erstellt Renodex ein transparentes Angebot mit allen enthaltenen Leistungen, bevor die Arbeiten beginnen.",
    weitereFragen: [
      { frage: "Kann ich nur zwei Gewerke kombinieren statt eine volle Sanierung?", antwort: "Ja. Eine Buendelung ist auch mit zwei Bausteinen moeglich, etwa Trockenbau plus Malerarbeiten nach einem Wasserschaden. Die Komplettsanierung im engeren Sinn (Haus- oder Wohnungssanierung als Basis) ist keine Voraussetzung fuer eine Buendelung." },
      { frage: "Muss ich fuer jedes Gewerk eine eigene Anfrage stellen?", antwort: "Nein. Ueber den digitalen Erstkontakt wird das gesamte Bauvorhaben einmal beschrieben, RENODEX ordnet die benoetigten Bausteine intern zu und stimmt die Angebote fuer die beteiligten Gewerke gemeinsam ab." },
      { frage: "Was passiert, wenn waehrend der Arbeiten weitere Gewerke noetig werden?", antwort: "Stellt sich beispielsweise waehrend des Trockenbaus heraus, dass zusaetzlich Malerarbeiten oder Innenausbau noetig sind, wird das im laufenden Bauablauf ergaenzt und mit den bereits beauftragten Gewerken zeitlich abgestimmt, statt einen komplett neuen Vorgang zu starten." },
    ],

  },
  {
    slug: "haussanierung",
    title: "Haussanierung",
    metaTitle: "Außenanlagen sanieren München – Garten, Terrasse, Einfahrt | Renodex",
    metaDescription: "Außenanlagen rund ums Haus in München und Umgebung (25 km Radius): Terrasse, Einfahrt, Gartenwege und Entwässerung aus einer Hand – mit Renodex.",
    heroFrage: "Was gehört zur Sanierung der Außenanlagen rund ums Haus?",
    heroLead: "Terrasse, Einfahrt, Gartenwege und die Entwässerung rund ums Grundstück bilden ein eigenes Fachthema – unabhängig von Fassade oder Dach. Renodex koordiniert die Sanierung dieser Außenanlagen als eigenständiges Vorhaben oder im Zusammenhang mit einer Komplettsanierung.",
    heroImage: "/images/optimized/leistung-haussanierung.webp",
    problemUeberschrift: "Falsches Gefälle rächt sich erst mit der Zeit",
    problemText: "Terrassen und Einfahrten, die vor Jahrzehnten verlegt wurden, entwässern häufig nicht mehr richtig: Platten liegen uneben, Fugen sind ausgewaschen, und Regenwasser läuft in Richtung Haus statt davon weg. Wird nur die Optik erneuert und das Gefälle nicht mitgeplant, taucht das Problem nach der nächsten Sanierung wieder auf.",
    loesungUeberschrift: "Außenanlagen mit funktionierender Entwässerung",
    loesungPunkte: [
      "Prüfung von Gefälle und Entwässerung vor der Neugestaltung",
      "Terrassenbeläge, Einfahrtsbefestigung und Gartenwege abgestimmt",
      "Versickerung oder Ableitung nach den örtlichen Vorgaben geplant",
      "Anschlüsse an Sockel und Fassade wasserdicht ausgeführt",
    ],
    vertiefungUeberschrift: "Worauf kommt es bei der Sanierung von Terrasse und Einfahrt an?",
    vertiefungAbschnitte: [
      { titel: "Welches Gefälle braucht eine Terrasse oder Einfahrt?", text: "Befestigte Außenflächen brauchen in der Regel ein Mindestgefälle von etwa 2 bis 2,5 Prozent, damit Regenwasser zuverlässig abläuft und sich nicht vor der Fassade oder auf dem Belag staut. Wird eine bestehende Fläche neu verlegt, wird dieses Gefälle im Unterbau neu hergestellt, nicht nur an der Oberfläche kaschiert." },
      { titel: "Wohin darf das Regenwasser von Terrasse und Einfahrt abgeleitet werden?", text: "Niederschlagswasser soll nach den wasserrechtlichen Vorgaben möglichst ortsnah versickern statt in die Kanalisation zu laufen – das reduziert häufig auch die Niederschlagswassergebühr der Gemeinde. Ob eine Versickerung auf dem eigenen Grundstück möglich ist, hängt vom Bodenaufbau und den örtlichen Vorgaben der zuständigen Stadt- oder Gemeindeentwässerung ab, die vor der Planung geprüft werden." },
      { titel: "Warum ist der Anschluss an die Fassade bei Terrassen besonders wichtig?", text: "Im Übergang zwischen Terrasse oder Balkon und Fassade muss sichergestellt sein, dass kein Wasser hinter die Abdichtung oder in den Sockelbereich läuft. Ein zu geringer Abstand zwischen Belagoberkante und Fassadenanschluss zählt zu den häufigsten Ursachen für spätere Feuchteschäden am Mauerwerk und wird bei der Planung entsprechend berücksichtigt." },
    ],
    boxTitel: "Außenanlagen aus einer Hand koordiniert",
    ausEinerHandText: "Die Sanierung der Außenanlagen lässt sich eigenständig beauftragen oder mit anderen Gewerken wie Fassade oder Mauerwerksabdichtung kombinieren, wenn diese ohnehin Teil des Vorhabens sind – Renodex stimmt die Reihenfolge entsprechend ab.",
    faqFrage: "Wie lange dauert die Sanierung von Terrasse und Einfahrt?",
    faqAntwort: "Das hängt von der Fläche, dem gewählten Belag und dem Zustand des Unterbaus ab. Nach der digitalen Erstaufnahme über Foto oder Video nennt Renodex einen realistischen Zeitrahmen für das konkrete Vorhaben.",
    weitereFragen: [
      { frage: "Kann die Einfahrt saniert werden, ohne die Terrasse anzufassen?", antwort: "Ja, beide Flächen lassen sich unabhängig voneinander sanieren. Eine gemeinsame Planung lohnt sich vor allem, wenn Maschinen oder Material ohnehin auf das Grundstück müssen." },
      { frage: "Was passiert mit alten Platten oder Pflaster beim Rückbau?", antwort: "Der alte Belag wird aufgenommen, der Unterbau auf Tragfähigkeit und Gefälle geprüft und bei Bedarf neu hergestellt, bevor der neue Belag verlegt wird. Nur die Oberfläche auszutauschen, ohne den Unterbau zu prüfen, behebt bestehende Entwässerungsprobleme nicht." },
      { frage: "Braucht eine Versickerungsanlage im Garten eine Genehmigung?", antwort: "Das hängt von Art und Umfang der Anlage sowie den örtlichen Vorschriften ab. Renodex klärt das im Rahmen der Erstberatung mit den zuständigen Stellen ab, bevor die Umsetzung geplant wird." },
    ],

  },
  {
    slug: "wohnungssanierung",
    title: "Wohnungssanierung",
    metaTitle: "Wohnungssanierung München | Renodex",
    metaDescription: "Wohnungssanierung und Wohnungsrenovierung in München und Umgebung: Bad, Böden, Elektro und Heizung aus einer Hand – mit Renodex.",
    heroFrage: "Was gehört zu einer kompletten Wohnungssanierung dazu?",
    heroLead: "Eine Wohnungssanierung deckt bei Renodex alle Gewerke innerhalb der Wohnung ab: Elektro, Sanitär, Heizung, Böden, Trockenbau und Malerarbeiten – vom einzelnen Raum bis zur kompletten Wohnung. Ausgelöst wird sie häufig durch einen Eigentümerwechsel, eine Vermietung oder den Wunsch, veraltete Technik zeitgemäß zu ersetzen. Renodex saniert unter laufender Terminplanung und mit möglichst wenig Beeinträchtigung für die Bewohner.",
    heroImage: "/images/optimized/leistung-wohnungssanierung.webp",
    problemUeberschrift: "Alle Gewerke einer Wohnung, aber begrenztes Zeitfenster",
    problemText: "In einer Wohnung lässt sich selten monatelang bauen – oft müssen Elektro, Sanitär, Heizung, Böden und Malerarbeiten in einem klar begrenzten Zeitfenster fertig werden, während der Alltag weiterläuft oder ein Mieterwechsel ansteht.",
    loesungUeberschrift: "Alle Gewerke der Wohnung aus einer Planung",
    loesungPunkte: [
      "Klar terminierte Bauabschnitte statt offenem Zeitrahmen",
      "Elektro, Sanitär, Heizung, Böden, Trockenbau und Malerarbeiten aus einer Hand",
      "Abstimmung mit Eigentümer, Hausverwaltung oder Mieter",
      "Saubere Übergabe nach Fertigstellung",
    ],
    vertiefungUeberschrift: "Wie lange dauert eine Wohnungssanierung in München?",
    vertiefungAbschnitte: [
      { titel: "Wie lange dauert eine Wohnungssanierung?", text: "Die Dauer richtet sich nach Größe, Zustand und Umfang der Wohnung sowie danach, ob Bewohner während der Arbeiten ausziehen oder nicht. Eine Wohnung mit Elektro-Neuverkabelung, neuen Böden, Trockenbauarbeiten und Malerarbeiten braucht in der Regel mehr Vorlauf als eine reine Renovierung ohne Eingriff in die Gebäudetechnik. Nach der digitalen Erstaufnahme über Foto, Video oder Sprachnachricht wird ein realistischer Zeitrahmen für die konkrete Wohnung genannt, statt eine pauschale Wochenangabe." },
      { titel: "Welche Gewerke greifen bei einer Wohnungssanierung ineinander?", text: "Elektroinstallation, Sanitär, Heizung, Bodenverlegung, Trockenbau und Malerarbeiten laufen innerhalb einer Wohnung in einer festen Reihenfolge: zuerst Leitungen und Anschlüsse, dann Trockenbau und Wandaufbau, danach Böden und zuletzt die malermäßige Fertigstellung. Diese Reihenfolge verhindert, dass bereits fertige Gewerke durch nachfolgende Arbeiten wieder beschädigt oder verschmutzt werden. Einzelne Fachthemen wie Bad oder Wärmepumpe werden bei Bedarf gesondert abgestimmt, wenn sie über den reinen Wohnungsinnenausbau hinausgehen." },
      { titel: "Was ist bei einer bewohnten Wohnungssanierung zu beachten?", text: "Bleiben Bewohner während der Sanierung in der Wohnung, wird die Reihenfolge der Gewerke so geplant, dass mindestens ein nutzbarer Bereich erhalten bleibt, etwa durch raumweise Abschnitte statt Komplettöffnung aller Räume gleichzeitig. Staubschutz und Abdeckung angrenzender, nicht sanierter Bereiche gehören zur Grundausstattung jeder Innenausbau-Baustelle. Bei Eigentumswohnungen ist zusätzlich zu klären, ob Eingriffe in Leitungen oder Wände die Zustimmung der Eigentümergemeinschaft erfordern." },
    ],
    boxTitel: "Innenausbau nach Plan – ein Ansprechpartner, ein Zeitfenster",
    ausEinerHandText: "Wohnungssanierung ist bei Renodex der komplette Innenausbau einer einzelnen Wohnung – im Unterschied zur Haussanierung, die die Gebäudehülle von außen betrifft, und zur Komplettsanierung, die beides gemeinsam abdeckt.",
    faqFrage: "Kann eine Wohnung während der Sanierung bewohnt bleiben?",
    faqAntwort: "Das hängt vom Umfang der Arbeiten ab. Bei einzelnen Gewerken ist ein Verbleib oft möglich, bei einer Komplettsanierung empfiehlt sich meist ein vorübergehender Auszug. Renodex bespricht das im Vorfeld transparent.",
    weitereFragen: [
      { frage: "Kann eine Wohnungssanierung auch nur einzelne Räume umfassen?", antwort: "Ja, der Innenausbau muss sich nicht auf die gesamte Wohnung erstrecken. Häufig werden einzelne Räume oder Bereiche saniert, während der Rest der Wohnung unverändert bleibt und weiter genutzt wird. Die Gewerke-Reihenfolge (Elektro/Sanitär/Heizung vor Trockenbau, Trockenbau vor Boden und Malerarbeiten) gilt dann für den jeweiligen Teilbereich." },
      { frage: "Wird bei der Wohnungssanierung auch die alte Bausubstanz geprüft?", antwort: "Vor Beginn der eigentlichen Arbeiten wird der bestehende Zustand von Elektroleitungen, Wasserinstallation und Wandaufbau gesichtet, soweit er über eingereichte Fotos oder Videos erkennbar oder vor Ort zugänglich ist. Auffälligkeiten wie veraltete Elektroinstallation ohne FI-Schutzschalter oder erkennbare Feuchtestellen fließen in die Planung der Sanierungsreihenfolge ein." },
      { frage: "Wie werden Materialien für Böden und Malerarbeiten ausgewählt?", antwort: "Die Auswahl von Bodenbelägen, Wandfarben und Oberflächen erfolgt in Abstimmung mit der Nutzung des jeweiligen Raums und den baulichen Gegebenheiten, etwa Feuchtebelastung in Bädern oder Trittschallanforderungen bei Eigentumswohnungen. Konkrete Produktvorschläge werden erst nach Sichtung der Wohnung gemacht, nicht pauschal vorab festgelegt." },
    ],

  },
  {
    slug: "renovierung",
    title: "Renovierung",
    metaTitle: "Renovierung München modernisieren | Renodex",
    metaDescription: "Renovierung in München und Umgebung (25 km Radius): Malerarbeiten, Böden, Türen und mehr aus einer Hand – mit Renodex.",
    heroFrage: "Renovierung oder Sanierung – wo liegt der Unterschied?",
    heroLead: "Eine Renovierung erneuert Oberflächen und Ausstattung, ohne in die Bausubstanz einzugreifen – etwa Malerarbeiten, Böden oder Türen. Renodex übernimmt Renovierungen als eigenständiges Vorhaben oder als Teil einer größeren Sanierung.",
    heroImage: "/images/optimized/leistung-renovierung.webp",
    problemUeberschrift: "Mehrere kleine Gewerke, ein überschaubares Budget",
    problemText: "Bei einer Renovierung sollen oft mehrere Räume gleichzeitig aufgefrischt werden – neue Farbe, neue Böden, vielleicht neue Türen. Für jedes Gewerk einen eigenen Handwerker zu finden, kostet Zeit, die bei einem überschaubaren Vorhaben oft in keinem Verhältnis zum Aufwand steht.",
    loesungUeberschrift: "Renovierung aus einer Hand, ohne Umwege",
    loesungPunkte: [
      "Malerarbeiten, Böden und Türen aus einer Beauftragung",
      "Ein Termin für die Besichtigung, ein Angebot für alle Arbeiten",
      "Auf Wunsch Kombination mit Elektro- oder Sanitärarbeiten",
      "Klare Absprache zu Umfang und Zeitrahmen",
    ],
    vertiefungUeberschrift: "Was zählt bei RENODEX zur Renovierung – und was nicht?",
    vertiefungAbschnitte: [
      { titel: "Wo endet die Renovierung, wo beginnt die Sanierung?", text: "Renovierung meint bei RENODEX ausschließlich Oberflächenarbeiten: Wände und Decken streichen oder tapezieren, Bodenbeläge verlegen oder austauschen, Türen erneuern oder anpassen. Sobald Leitungen, Wände, Estrich oder Dämmung betroffen sind, handelt es sich um eine Sanierung mit anderem Aufwand und anderer Gewerkeplanung. Diese Trennung entscheidet über Bauzeit, Kosten und ob eine Wohnung während der Arbeiten bewohnbar bleibt." },
      { titel: "Warum ist eine Renovierung deutlich schneller als eine Sanierung?", text: "Da bei der Renovierung keine Wände geöffnet, keine Leitungen verlegt und keine Bausubstanz verändert werden, entfallen Stemmarbeiten, Trocknungszeiten und die meisten Genehmigungsschritte. Anstrich, Bodenbelag und Türen lassen sich in aufeinanderfolgenden Arbeitsschritten planen, oft raumweise, sodass ein Teil der Wohnung nutzbar bleibt, während im anderen gearbeitet wird. Das unterscheidet den Aufwand klar von einer Bad- oder Komplettsanierung." },
      { titel: "Wie läuft die Abstimmung bei mehreren betroffenen Räumen ab?", text: "Farbe, Boden und Türen werden bei RENODEX als ein zusammenhängendes Paket geplant, damit Übergänge zwischen Räumen und Materialien stimmig wirken – etwa Sockelleisten, Bodenniveau an Türschwellen oder Anstrichfarbe im Verhältnis zum Bodenton. Sind zusätzlich Elektro-, Sanitär- oder Trockenbauarbeiten gewünscht, wird das als separates Gewerk mit dem zuständigen Team abgestimmt, nicht als Teil der Renovierungsleistung selbst." },
    ],
    boxTitel: "Renovierung ohne Substanzeingriff",
    ausEinerHandText: "Auch kleinere Renovierungen profitieren vom Prinzip aus einer Hand: Renodex bündelt die benötigten Gewerke, statt mehrere Einzelaufträge zu vergeben.",
    faqFrage: "Ab welchem Umfang lohnt sich eine Renovierung durch Renodex?",
    faqAntwort: "Renodex übernimmt sowohl einzelne Räume als auch mehrere Gewerke im Verbund. Ein kurzes Gespräch zum Vorhaben zeigt, ob sich eine gebündelte Beauftragung lohnt.",
    weitereFragen: [
      { frage: "Kann während einer Renovierung in der Wohnung gewohnt werden?", antwort: "In vielen Fällen ja, da keine Leitungen oder tragenden Bauteile betroffen sind. Die Arbeiten lassen sich raumweise oder in Etappen einteilen, sodass zumindest ein Teil der Wohnung nutzbar bleibt. Bei starker Geruchsbelastung durch Anstriche oder bei größerem Bodenaustausch über mehrere Räume kann eine kurzzeitige Ausweichlösung sinnvoller sein – das wird im Einzelfall besprochen." },
      { frage: "Welche Bodenbeläge kommen bei einer reinen Renovierung infrage?", antwort: "Je nach Untergrund und vorhandenem Aufbau eignen sich Laminat, Vinyl, Parkett oder Fliesen, sofern keine Anpassung des Estrichs nötig ist. Ist der vorhandene Unterboden uneben oder beschädigt, kann ein Ausgleich vor der Verlegung notwendig werden – das wird vor Beginn geprüft und ist Teil der Bodenverlegung als eigenständiges Gewerk, nicht der reinen Anstrich- oder Türenarbeit." },
      { frage: "Müssen alte Türen komplett ausgetauscht oder können sie angepasst werden?", antwort: "Beides ist möglich. Passt die Zarge noch, lässt sich oft nur das Türblatt tauschen, was Aufwand und Kosten reduziert. Ist die Zarge beschädigt, verzogen oder passt nicht mehr zum neuen Bodenaufbau, wird die komplette Einheit erneuert. Welche Variante infrage kommt, zeigt sich beim Aufmaß anhand von Zustand und Maßhaltigkeit der vorhandenen Tür." },
    ],

  },
  {
    slug: "badsanierung",
    title: "Badsanierung",
    metaTitle: "Badsanierung München – Bad komplett erneuern | Renodex",
    metaDescription: "Badsanierung in München und Umgebung: Sanitär, Fliesen und Elektro aus einer Hand – mit Renodex.",
    heroFrage: "Was macht eine Badsanierung aufwendig?",
    heroLead: "Ein Bad vereint mehrere Gewerke auf kleinem Raum: Sanitärinstallation, Elektrik, Fliesen und oft auch Bodenaufbau. Renodex plant und koordiniert diese Gewerke gemeinsam, damit die Arbeiten ineinandergreifen statt sich zu verzögern.",
    heroImage: "/images/optimized/leistung-badsanierung.webp",
    problemUeberschrift: "Viele Gewerke auf engem Raum, hohe Feuchtigkeitsanforderungen",
    problemText: "Beim Bad treffen Sanitär, Elektrik und Fliesenarbeiten auf engstem Raum aufeinander – wird ein Gewerk falsch terminiert, verzögert das die anderen unmittelbar. Zusätzlich verlangen Feuchträume eine fachgerechte Abdichtung, die im Nachhinein kaum korrigierbar ist.",
    loesungUeberschrift: "Sanitär, Elektro und Fliesen in einem Bauablauf",
    loesungPunkte: [
      "Abgestimmte Reihenfolge von Rohbau, Sanitär und Elektro",
      "Fachgerechte Abdichtung nach aktuellem Stand der Technik",
      "Ein Ansprechpartner für den gesamten Bauablauf im Bad",
      "Planung barrierearmer Lösungen auf Wunsch",
    ],
    vertiefungUeberschrift: "Wie lange dauert eine Badsanierung in München?",
    vertiefungAbschnitte: [
      { titel: "Wie lange dauert eine Badsanierung?", text: "Die Dauer hängt von der Grundrissänderung ab: Wird nur Sanitär und Fliesen erneuert, ohne Wände zu versetzen, ist ein Standardbad in wenigen Wochen fertig. Verlegt sich der Abfluss, muss der Estrich geöffnet und neu verlegt werden, was Trocknungszeiten mit sich bringt und den Zeitraum verlängert. Der genaue Ablauf wird nach der digital eingereichten Bestandsaufnahme (Fotos, Grundriss, Maße) verbindlich festgelegt, ohne dass vorab ein Vor-Ort-Termin nötig ist." },
      { titel: "Welche Abdichtung braucht ein Bad nach aktueller Norm?", text: "Bodenablauf, Wanne und Duschbereich benötigen eine Verbundabdichtung nach DIN 18534, bevor die Fliesen verlegt werden — bei bodengleichen Duschen zusätzlich ein Gefälleestrich zum Ablauf. Wird die Abdichtung übersehen oder zu knapp bemessen, zeigt sich das oft erst Jahre später an der Wohnung darunter. Deshalb wird die Abdichtungsebene vor dem Verfliesen fotografisch dokumentiert und Teil der Bauakte." },
      { titel: "Was passiert mit Elektrik im Nassbereich?", text: "Steckdosen, Lichtschalter und Beleuchtung im Bad unterscheiden sich nach Schutzzonen (0 bis 2) gemäß DIN VDE 0100-701 — je näher an Wanne oder Dusche, desto strenger die Anforderung an Schutzart und Abstand. Bei einer Badsanierung wird die vorhandene Elektrik gegen diese Zonen geprüft und, wo nötig, mit der Elektroinstallation abgestimmt und angepasst." },
    ],
    boxTitel: "Bad-Sanierung ohne Wasserschaden-Risiko",
    ausEinerHandText: "Eine Badsanierung ist häufig Teil einer größeren Wohnungs- oder Haussanierung – Renodex bindet sie nahtlos in das Gesamtvorhaben ein.",
    faqFrage: "Wie lange dauert eine Badsanierung?",
    faqAntwort: "Je nach Größe und Umfang der Arbeiten dauert eine Badsanierung typischerweise mehrere Wochen. Der genaue Zeitrahmen wird nach der Besichtigung festgelegt.",
    weitereFragen: [
      { frage: "Kann ein barrierefreies Bad nachträglich eingebaut werden?", antwort: "Ja, eine bodengleiche Dusche mit Gefälleestrich und rutschhemmenden Fliesen lässt sich in ein bestehendes Bad einbauen, sofern die Aufbauhöhe zum Bodenablauf ausreicht oder der Estrich entsprechend abgesenkt wird. Das wird anhand der eingereichten Maße vorab geprüft." },
      { frage: "Wird beim Rückbau auf Altlasten wie Asbest geachtet?", antwort: "Bei Bädern aus älteren Baujahren werden Fliesenkleber, Spachtelmasse und Bodenbeläge vor dem Rückbau auf Verdachtsmomente gesichtet. Bei Hinweisen auf Asbest oder andere Schadstoffe wird die Sanierung mit der Asbestsanierung abgestimmt, bevor die eigentliche Bad-Sanierung fortgesetzt wird." },
      { frage: "Wie wird die Belüftung im fensterlosen Bad gelöst?", antwort: "Ein Bad ohne Fenster benötigt eine Entlüftung nach DIN 18017-3, meist über einen Ventilator mit Nachlaufsteuerung, der die Feuchtigkeit nach dem Duschen abführt. Ob eine vorhandene Leitung genutzt oder neu verlegt werden kann, zeigt sich beim Blick auf den eingereichten Grundriss." },
    ],

  },
  {
    slug: "bodenverlegung",
    title: "Bodenverlegung",
    metaTitle: "Bodenverlegung München | Renodex",
    metaDescription: "Bodenverlegung in München und Umgebung: fachgerechte Verlegung als Teil von Sanierung und Renovierung – mit Renodex.",
    heroFrage: "Worauf kommt es bei der Bodenverlegung an?",
    heroLead: "Ein neuer Boden ist mehr als nur die sichtbare Oberfläche – der Unterbau entscheidet über Langlebigkeit und Wohnqualität. Renodex verlegt Böden fachgerecht, abgestimmt auf Raum, Nutzung und vorhandenen Unterbau.",
    heroImage: "/images/optimized/leistung-bodenverlegung.webp",
    problemUeberschrift: "Unebener Unterbau, falsche Feuchtigkeitswerte, sichtbare Mängel später",
    problemText: "Wird ein Boden ohne fachgerechte Vorbereitung des Unterbaus verlegt, zeigen sich Mängel oft erst Monate später – Fugen öffnen sich, der Boden arbeitet, oder es bildet sich Feuchtigkeit unter dem Belag.",
    loesungUeberschrift: "Verlegung mit geprüftem Unterbau",
    loesungPunkte: [
      "Prüfung von Estrich und Feuchtigkeit vor der Verlegung",
      "Fachgerechte Verlegung nach Herstellervorgaben",
      "Abstimmung mit Heizungs- und Elektroarbeiten im selben Raum",
      "Beratung zur passenden Bodenart je nach Nutzung",
    ],
    vertiefungUeberschrift: "Wie läuft eine professionelle Bodenverlegung ab und worauf kommt es beim Unterbau an?",
    vertiefungAbschnitte: [
      { titel: "Welche Rolle spielt die Estrich-Prüfung vor der Verlegung?", text: "Vor jeder Belagsverlegung wird die Restfeuchte im Estrich mit der CM-Messung (Calciumcarbid-Methode) geprüft. Nur so lässt sich belegen, ob der Untergrund tatsächlich belegreif ist – ein zu feuchter Estrich führt bei Parkett und Laminat zu Quellungen, bei Vinyl zu Blasenbildung und Ablösungen. Die Grenzwerte unterscheiden sich je nach Estrichart (Zementestrich, Anhydritestrich) und geplantem Bodenbelag, weshalb die Messung immer belagsspezifisch erfolgt und dokumentiert wird." },
      { titel: "Welche Vorarbeiten sind vor der eigentlichen Verlegung nötig?", text: "Vor der Verlegung wird der Untergrund auf Ebenheit, Tragfähigkeit und Risse geprüft. Unebenheiten werden mit Spachtelmasse ausgeglichen, lose oder schadhafte Altbeläge entfernt. Bei Bedarf kommt eine Dampfsperre oder Trittschalldämmung zum Einsatz, abgestimmt auf Belagsart und Nutzung des Raums. Erst nach abgeschlossener Untergrundvorbereitung folgt die eigentliche Verlegung – dieser Schritt entscheidet maßgeblich über die spätere Haltbarkeit des Bodens." },
      { titel: "Welche Bodenbeläge werden verlegt und wie unterscheiden sie sich in der Verarbeitung?", text: "Parkett wird schwimmend verlegt oder vollflächig verklebt, je nach Holzart und Raumgröße unter Beachtung der Dehnungsfugen an Wänden und Übergängen. Vinylböden werden meist schwimmend geklickt oder vollflächig verklebt und eignen sich wegen ihrer Feuchtigkeitsbeständigkeit auch für Küchen und Bäder. Fliesen erfordern einen tragfähigen, ebenen Untergrund sowie eine fachgerechte Verlegung im Dünn- oder Mittelbettverfahren inklusive Verfugung. Laminat wird schwimmend auf einer Trittschalldämmung verlegt und ist eine wirtschaftliche Lösung für kurzfristig nutzbare Räume." },
    ],
    boxTitel: "Böden aus einer Hand: Aufmaß, Unterbau, Verlegung",
    ausEinerHandText: "Bodenverlegung wird bei Renodex meist gemeinsam mit Sanitär-, Heizungs- oder Malerarbeiten im selben Bauabschnitt koordiniert.",
    faqFrage: "Welche Bodenarten verlegt Renodex?",
    faqAntwort: "Renodex berät zur passenden Bodenart abhängig von Raum, Nutzung und Budget und übernimmt die fachgerechte Verlegung als Teil der Sanierung.",
    weitereFragen: [
      { frage: "Kann ein neuer Bodenbelag auf den alten Boden verlegt werden?", antwort: "Das hängt vom Zustand des Altbelags und der gewünschten Aufbauhöhe ab. Ein tragfähiger, ebener Altbelag kann bei manchen Belagsarten (z.B. Vinyl auf Fliesen) als Untergrund dienen, sofern die Fugen unproblematisch sind. Bei Parkett oder größeren Unebenheiten ist meist ein Rückbau bis auf den Estrich sinnvoller, damit die Feuchtigkeitswerte korrekt geprüft und ein sauberer Unterbau hergestellt werden kann." },
      { frage: "Wie wird der Boden an Türübergängen und Anschlüssen fachgerecht gelöst?", antwort: "An Türübergängen zwischen unterschiedlichen Belägen oder Räumen kommen Übergangsprofile zum Einsatz, die Höhenunterschiede ausgleichen und die Dehnungsfuge des schwimmenden Bodens kaschieren. An Wandanschlüssen sorgt eine Randfuge dafür, dass sich der Boden bei Temperatur- und Feuchteschwankungen ausdehnen kann, ohne sich zu wölben. Sockelleisten schließen die Fuge anschließend optisch ab." },
      { frage: "Warum ist eine schwimmende Verlegung nicht immer die richtige Wahl?", antwort: "Schwimmende Verlegung ist schnell und kostengünstig, hat aber Grenzen: In stark beanspruchten oder sehr großen Räumen kann sich der Belag durch fehlende Fixierung stärker bewegen. Bei Fußbodenheizung ist eine vollflächige Verklebung oft die bessere Wärmeleitung, und bei Feuchträumen mit Abdichtungspflicht ist eine verklebte Lösung meist die sicherere Variante. Die Entscheidung wird immer anhand von Raumnutzung, Untergrund und Belagsart getroffen." },
    ],

  },
  {
    slug: "malerarbeiten-fassade",
    title: "Malerarbeiten und Fassade",
    metaTitle: "Malerarbeiten & Fassade München | Renodex",
    metaDescription: "Malerarbeiten und Fassadenanstrich in München und Umgebung: innen und außen aus einer Hand – mit Renodex.",
    heroFrage: "Was ist bei Malerarbeiten und Fassadenanstrich zu beachten?",
    heroLead: "Ob Innenräume oder Fassade – ein sauberes Ergebnis hängt an der Vorbereitung des Untergrunds mindestens so sehr wie am Anstrich selbst. Renodex übernimmt Malerarbeiten innen und außen als eigenständiges Vorhaben oder im Rahmen einer Sanierung.",
    heroImage: "/images/optimized/leistung-malerarbeiten-fassade.webp",
    problemUeberschrift: "Untergrund, Witterung und Termine passen selten von allein zusammen",
    problemText: "Innenanstriche müssen sich in den Bauablauf anderer Gewerke einfügen, Fassadenarbeiten hängen zusätzlich vom Wetter ab. Ohne Abstimmung verzögert sich am Ende der gesamte Zeitplan der Sanierung.",
    loesungUeberschrift: "Malerarbeiten im Bauablauf mitgeplant",
    loesungPunkte: [
      "Untergrundvorbereitung nach Zustand der Wände",
      "Terminierung im Zusammenspiel mit anderen Gewerken",
      "Fassadenanstrich mit Blick auf Witterung und Dämmung",
      "Farbberatung auf Wunsch",
    ],
    vertiefungUeberschrift: "Wie oft muss eine Fassade neu gestrichen werden?",
    vertiefungAbschnitte: [
      { titel: "Wie oft muss eine Fassade neu gestrichen werden?", text: "Ein mineralischer oder Silikatanstrich haelt je nach Witterungslage, Ausrichtung und Vorschaden zwischen zehn und fünfzehn Jahren, bevor die Deckkraft nachlaesst und Risse im Putz sichtbar werden. Wetterseiten (West/Suedwest) altern durch Schlagregen schneller als geschuetzte Fassadenteile. Vor jedem Neuanstrich wird der Untergrund geprueft: kreidende, abblaetternde oder von Algen befallene Flaechen brauchen eine Grundreinigung und ggf. einen Fungizid-Grundanstrich, sonst haelt die neue Farbschicht nicht." },
      { titel: "Welche Farbe passt zu welchem Untergrund?", text: "Silikatfarbe verbindet sich mineralisch mit mineralischem Putz und ist diffusionsoffen – Standard bei Altbau-Fassaden mit Kalk- oder Zementputz. Silikonharzfarbe ist wasserabweisender und flexibler, geeignet fuer WDVS-Fassaden und Untergruende mit feinen Rissen. Dispersionsfarbe ist guenstiger, aber weniger diffusionsoffen und für Feuchtprobleme ungeeignet. Die Farbwahl richtet sich nach dem vorhandenen Putzsystem, nicht nach Optik allein." },
      { titel: "Was gehoert zur Vorbereitung vor dem Streichen?", text: "Vor jedem Außenanstrich stehen Hochdruckreinigung des Untergrunds, Ausbesserung von Rissen und Abplatzungen im Putz sowie das Abkleben von Fenstern und Rollladenkaesten. Innen betrifft die Vorbereitung Spachtelarbeiten an Wandunebenheiten, Grundierung bei saugenden Untergruenden und Abdecken von Boeden und Einrichtung. Erst nach vollstaendiger Trocknung der Vorarbeiten wird der eigentliche Anstrich aufgetragen." },
    ],
    boxTitel: "Fassade und Anstrich: Material nach Untergrund",
    ausEinerHandText: "Malerarbeiten sind oft der letzte Schritt einer Sanierung – Renodex terminiert sie so, dass sie nahtlos an die vorherigen Gewerke anschließen.",
    faqFrage: "Übernimmt Renodex auch reine Fassadenarbeiten ohne Innensanierung?",
    faqAntwort: "Ja, Fassadenanstrich und Malerarbeiten sind auch als eigenständiger Auftrag möglich, unabhängig von einer größeren Sanierung.",
    weitereFragen: [
      { frage: "Kann bei laufendem Betrieb oder bewohntem Haus gestrichen werden?", antwort: "Innenanstriche werden raumweise abgestimmt, sodass Kueche und Bad nutzbar bleiben, waehrend andere Zimmer bearbeitet werden. Aussenfassaden sind während der Trocknungszeit witterungsabhaengig, der Zugang zu Haus und Grundstueck bleibt dabei bestehen." },
      { frage: "Was kostet ein Fassadenanstrich?", antwort: "Der Preis haengt von Fassadenflaeche, Geruestbedarf, Zustand des Untergrunds (Reparaturaufwand) und gewaehltem Farbsystem ab. Eine verlaessliche Zahl setzt eine Begutachtung der Fassade voraus – ueber den digitalen Erstkontakt mit Fotos ist eine erste Einschaetzung ohne Vor-Ort-Termin moeglich." },
      { frage: "Wird bei einer Fassadensanierung auch die Daemmung mitgemacht?", antwort: "Ein reiner Anstrich daemmt nicht zusaetzlich. Soll die Fassade zugleich energetisch ertuechtigt werden, wird das als eigener Schritt (WDVS) mit dem Anstrich abgestimmt und geplant." },
    ],

  },
  {
    slug: "mauerwerksabdichtung",
    title: "Mauerwerksabdichtung",
    metaTitle: "Mauerwerksabdichtung München | Renodex",
    metaDescription: "Mauerwerksabdichtung in München und Umgebung: gegen aufsteigende und seitliche Feuchtigkeit – mit Renodex.",
    heroFrage: "Woran erkennt man feuchtes Mauerwerk?",
    heroLead: "Feuchtigkeit im Mauerwerk zeigt sich häufig durch Salzausblühungen, abplatzenden Putz oder muffigen Geruch im Keller. Renodex prüft die Ursache und führt eine fachgerechte Abdichtung durch.",
    heroImage: "/images/optimized/leistung-mauerwerksabdichtung.webp",
    problemUeberschrift: "Feuchtigkeit im Mauerwerk bleibt lange unbemerkt",
    problemText: "Aufsteigende oder seitlich eindringende Feuchtigkeit schädigt das Mauerwerk oft über Jahre, bevor sichtbare Schäden entstehen. Wird die Ursache nicht behoben, wirkt jede oberflächliche Reparatur nur kurzfristig.",
    loesungUeberschrift: "Ursachenanalyse vor der Abdichtung",
    loesungPunkte: [
      "Prüfung der Feuchtigkeitsursache vor Beginn der Arbeiten",
      "Fachgerechte Horizontal- und Vertikalabdichtung",
      "Abstimmung mit Kellersanierung, falls betroffen",
      "Langfristige Lösung statt oberflächlicher Reparatur",
    ],
    vertiefungUeberschrift: "Wie erkennt man aufsteigende Feuchtigkeit im Mauerwerk?",
    vertiefungAbschnitte: [
      { titel: "Welche Anzeichen deuten auf feuchtes Mauerwerk hin?", text: "Typische Warnzeichen sind abblätternder Putz, Salzausblühungen (weiße Kristallschichten) im Sockelbereich, muffiger Geruch in Keller- oder Erdgeschossräumen sowie dunkle Verfärbungen an der Wandunterseite. Diese Symptome treten meist dort auf, wo die Horizontalsperre fehlt, beschädigt oder durch nachträgliche bauliche Eingriffe unterbrochen wurde. Eine Feuchtemessung mit Datenerfassung an mehreren Wandpunkten zeigt, ob es sich um aufsteigende Feuchte, seitlich eindringendes Wasser oder Kondensation handelt – die Ursache entscheidet über das passende Abdichtungsverfahren." },
      { titel: "Horizontalsperre oder Vertikalabdichtung – was wird wann eingesetzt?", text: "Die Horizontalsperre unterbindet den kapillaren Feuchtetransport von unten nach oben im Mauerwerk, etwa durch Injektionsverfahren mit Spezialharzen oder mechanisches Einbringen einer Sperrschicht. Die Vertikalabdichtung schützt erdberührte Kelleraußenwände vor seitlich drückendem oder nicht drückendem Wasser und wird von außen als Bitumen-, Dickbeschichtungs- oder Folienabdichtung aufgebracht. Bei Bestandsgebäuden kommen häufig beide Verfahren kombiniert zum Einsatz, weil aufsteigende und seitliche Feuchte oft gleichzeitig auftreten." },
      { titel: "Was passiert bei einer Injektionsabdichtung im Detail?", text: "Bei der Injektionsabdichtung werden in einer definierten Bohrlochreihe entlang der Wand Spezialharze oder Cremes eingebracht, die im Mauerwerk aushärten und eine wasserabweisende Sperrschicht bilden. Das Verfahren funktioniert bei den meisten Mauerwerksarten (Ziegel, Naturstein, Mischmauerwerk) und kommt ohne größere Aufgrabung aus, wenn nur die aufsteigende Feuchte betroffen ist. Bei zusätzlich vorhandener seitlicher Durchfeuchtung ist ergänzend eine Freilegung der Kelleraußenwand für die Vertikalabdichtung notwendig." },
    ],
    boxTitel: "Feuchteschutz mit System",
    ausEinerHandText: "Mauerwerksabdichtung ist oft der erste Schritt vor einer Kellersanierung oder Innenraumrenovierung – Renodex plant sie entsprechend in die Gesamtsanierung ein.",
    faqFrage: "Wie erkennt man, ob eine Mauerwerksabdichtung nötig ist?",
    faqAntwort: "Typische Anzeichen sind Feuchtigkeitsflecken, abblätternder Putz oder Salzausblühungen an Kellerwänden. Eine Besichtigung vor Ort klärt die genaue Ursache.",
    weitereFragen: [
      { frage: "Kann Mauerwerksabdichtung von innen erfolgen, wenn die Außenwand nicht freigelegt werden kann?", antwort: "Ja, bei angrenzender Bebauung oder befestigten Flächen wird häufig eine Innenabdichtung mit mineralischen Dichtschlämmen oder Sanierputz eingesetzt. Sie verhindert das Eindringen der Feuchtigkeit in den Innenraum, beseitigt aber nicht die Ursache in der Wand selbst – deshalb wird sie meist mit einer Horizontalsperre kombiniert." },
      { frage: "Wie lange hält eine fachgerecht ausgeführte Horizontalsperre?", antwort: "Bei korrekter Ausführung und passendem Injektionsmittel für die jeweilige Mauerwerksart ist die Sperrschicht dauerhaft wirksam und muss im Regelfall nicht erneuert werden. Voraussetzung ist eine vorherige Bauteilöffnung bzw. Materialanalyse, damit das Harz auf den tatsächlichen Feuchtegehalt und die Porenstruktur des Mauerwerks abgestimmt wird." },
      { frage: "Muss bei einer Vertikalabdichtung auch die Drainage erneuert werden?", antwort: "Das hängt vom Zustand der vorhandenen Dränung ab und wird bei der Freilegung der Kelleraußenwand mitgeprüft. Eine funktionierende Ringdrainage entlastet die neue Abdichtungsschicht, indem sie drückendes Wasser vom Fundament ableitet – ob sie erneuert werden muss, zeigt sich erst nach Öffnung der Baugrube." },
    ],

  },
  {
    slug: "asbestsanierung",
    title: "Asbestsanierung",
    metaTitle: "Asbestsanierung München – fachgerechte Entfernung | Renodex",
    metaDescription: "Asbestsanierung in München und Umgebung: fachgerechte und vorschriftsgemäße Entfernung – mit Renodex.",
    heroFrage: "Wann ist eine Asbestsanierung notwendig?",
    heroLead: "In Gebäuden aus der Bauzeit vor 1993 können asbesthaltige Materialien verbaut sein, etwa in Bodenbelägen, Dachplatten oder Rohrisolierungen. Renodex führt die Entfernung fachgerecht und nach den geltenden Vorschriften durch.",
    heroImage: "/images/optimized/leistung-asbestsanierung.webp",
    problemUeberschrift: "Ungeprüfte Sanierung bei Verdacht auf Asbest ist ein Risiko",
    problemText: "Wird bei Sanierungsarbeiten in älteren Gebäuden asbesthaltiges Material unsachgemäß entfernt oder beschädigt, können Fasern freigesetzt werden. Das betrifft nicht nur die Baustelle selbst, sondern auch angrenzende Bereiche.",
    loesungUeberschrift: "Fachgerechte Entfernung nach Vorschrift",
    loesungPunkte: [
      "Prüfung auf asbesthaltige Materialien vor Sanierungsbeginn",
      "Fachgerechte, vorschriftsgemäße Entfernung",
      "Sichere Entsorgung nach geltenden Bestimmungen",
      "Einbindung in den Gesamtablauf der Sanierung",
    ],
    vertiefungUeberschrift: "Wie läuft eine Asbestsanierung fachgerecht ab?",
    vertiefungAbschnitte: [
      { titel: "Welche Materialien sind im Altbau oft asbesthaltig?", text: "In Gebäuden vor dem Baujahr 1993 finden sich asbesthaltige Baustoffe häufig in Fassadenplatten, Bodenbelägen (Vinyl-Fliesen samt Kleber), Dachplatten aus Well-Eternit, Rohrisolierungen und Spachtelmassen unter Fliesen. Ein Verdacht lässt sich nicht durch bloße Optik klären - erst eine Materialprobe im akkreditierten Labor gibt Gewissheit, ob und in welcher Bindungsform (fest oder schwach gebunden) Asbest vorliegt." },
      { titel: "Was schreibt die TRGS 519 für die Ausführung vor?", text: "Die Technische Regel für Gefahrstoffe 519 regelt Abbruch-, Sanierungs- und Instandhaltungsarbeiten mit Asbest verbindlich. Je nach Bindungsform sind Schwarz-Weiß-Bereiche mit Personenschleuse, Unterdruckhaltung und H-Klasse-Absaugung, staubdichte Verpackung des Abbruchmaterials sowie eine Freimessung durch unabhängige Messstellen vor Freigabe des Bereichs vorgeschrieben. Vor Beginn ist eine Anzeige bei der zuständigen Behörde (Gewerbeaufsicht) einzureichen." },
      { titel: "Wie wird belastetes Material entsorgt?", text: "Asbesthaltige Abfälle gelten als gefährlicher Abfall und dürfen nur luftdicht verpackt (Folie, gekennzeichnete Big Bags) über zugelassene Entsorgungsbetriebe auf dafür vorgesehenen Deponien abgegeben werden. Für den Transport gilt Nachweispflicht - der Entsorgungsweg wird dokumentiert und der Auftraggeber erhält die entsprechenden Belege zur Vorlage bei Behörden oder Versicherung." },
    ],
    boxTitel: "Sicher entfernt nach TRGS 519",
    ausEinerHandText: "Eine Asbestsanierung geht bei älteren Gebäuden häufig einer größeren Sanierung voraus – Renodex koordiniert sie im Vorfeld der weiteren Gewerke.",
    faqFrage: "Woran erkennt man, ob Asbest verbaut ist?",
    faqAntwort: "Eine sichere Einschätzung ist ohne fachliche Prüfung meist nicht möglich, insbesondere bei Gebäuden aus der Bauzeit vor 1993. Renodex berät zum weiteren Vorgehen.",
    weitereFragen: [
      { frage: "Muss eine Asbestsanierung immer behördlich angezeigt werden?", antwort: "Ja, Arbeiten mit Asbest sind vor Beginn bei der zuständigen Gewerbeaufsicht anzuzeigen - unabhängig von der Menge des betroffenen Materials. Die Anzeige umfasst Art und Umfang der Arbeiten sowie die vorgesehenen Schutzmaßnahmen." },
      { frage: "Kann ich asbesthaltige Platten selbst entfernen?", antwort: "Bei schwach gebundenem Asbest (z. B. Spritzasbest, manche Isolierungen) ist die Entfernung fachbetriebspflichtig und darf nicht in Eigenregie erfolgen. Bei fest gebundenem Material (z. B. Well-Eternit-Platten) gelten reduzierte, aber weiterhin verbindliche Schutzauflagen nach TRGS 519 - eine fachgerechte Einschätzung vor Beginn ist in jedem Fall sinnvoll." },
      { frage: "Wie erkenne ich, ob Sanierungsbedarf wirklich besteht?", antwort: "Sichtbare Beschädigung, Rissbildung oder Bohr-/Sägearbeiten an verdächtigen Bauteilen erhöhen die Faserfreisetzung und damit den Handlungsbedarf. Eine Materialprobe mit Laboranalyse schafft Klarheit, bevor überhaupt eine Sanierung geplant wird - so lässt sich unnötiger Aufwand vermeiden, wenn kein Asbest vorliegt." },
    ],

  },
  {
    slug: "tueren",
    title: "Türen",
    metaTitle: "Türen München – Einbau und Austausch | Renodex",
    metaDescription: "Türen einbauen und austauschen in München und Umgebung: als Teil von Sanierung und Renovierung – mit Renodex.",
    heroFrage: "Wann lohnt sich der Austausch von Türen?",
    heroLead: "Alte Türen beeinträchtigen oft Dämmung, Schallschutz und Optik gleichermaßen. Renodex tauscht Innen- und Haustüren fachgerecht aus, passend zum jeweiligen Sanierungsvorhaben.",
    heroImage: "/images/optimized/leistung-tueren.webp",
    problemUeberschrift: "Alte Türen schließen schlecht, isolieren kaum",
    problemText: "Verzogene Zargen, undichte Dichtungen oder veraltete Beschläge sorgen dafür, dass Türen weder gut schließen noch ausreichend dämmen – ein Detail, das bei einer Sanierung leicht übersehen wird.",
    loesungUeberschrift: "Türeinbau abgestimmt auf die Sanierung",
    loesungPunkte: [
      "Fachgerechter Einbau von Innen- und Haustüren",
      "Abstimmung mit Boden- und Malerarbeiten",
      "Beratung zu Schall- und Wärmedämmung",
      "Passgenauer Einbau bei unregelmäßigen Bestandsmaßen",
    ],
    vertiefungUeberschrift: "Was kostet ein Türaustausch inklusive Zarge?",
    vertiefungAbschnitte: [
      { titel: "Was kostet ein Türaustausch inklusive Zarge?", text: "Der Preis für Innentür samt Zarge hängt von Wandaufbau, Türgröße und Ausführung (Zimmertür, Schallschutztür, Wohnungseingangstür) ab. Bei tragenden Wänden oder abweichendem Mauerwerk ist meist eine Anpassung der Zarge vor Ort nötig, was den Aufwand gegenüber einem reinen Blattwechsel erhöht. Eine verbindliche Kalkulation setzt Maße der vorhandenen Öffnung, Wandstärke und Fotos der aktuellen Situation voraus." },
      { titel: "Wie lange dauert der Austausch einer Zimmertür?", text: "Der reine Austausch von Türblatt und Zarge bei einer Standardöffnung ist in der Regel an einem Tag erledigt, sofern Maße passen und keine Anpassung des Mauerwerks nötig ist. Weicht die neue Zarge von der Wandstärke ab oder muss der Sturz nachgearbeitet werden, verlängert sich die Arbeit entsprechend. Putz- und Malerarbeiten rund um die neue Zarge werden mit dem jeweiligen Gewerk abgestimmt und separat terminiert." },
      { titel: "Welche Rolle spielt der Schallschutz bei Innentüren?", text: "Schallschutztüren unterscheiden sich von Standardtüren durch umlaufende Dichtungen, eine schwerere Türblattkonstruktion und eine passgenaue Zarge ohne Spalt zum Baukörper. Die erreichbare Schalldämmung hängt neben der Tür selbst auch vom Wandaufbau und der Ausführung des Bodenanschlusses ab. Bei Altbauten mit unebenen Laibungen ist häufig ein Anpassen der Zarge erforderlich, damit die Dichtungen vollflächig aufliegen." },
    ],
    boxTitel: "Türen und Zargen aus einer Hand",
    ausEinerHandText: "Der Türaustausch wird bei Renodex meist gemeinsam mit Boden- oder Malerarbeiten im selben Bauabschnitt eingeplant.",
    faqFrage: "Tauscht Renodex auch einzelne Türen ohne Gesamtsanierung aus?",
    faqAntwort: "Ja, der Austausch einzelner Türen ist auch unabhängig von einer größeren Sanierung möglich.",
    weitereFragen: [
      { frage: "Können Türen ausgetauscht werden, ohne die Wand neu zu verputzen?", antwort: "Bei einer passgenauen neuen Zarge im vorhandenen Maß bleibt die umliegende Wand meist unberührt. Weicht die neue Zarge im Format ab oder ist der Altputz an der Laibung beschädigt, wird das mit dem Maler-/Putzgewerk abgestimmt und die betroffene Fläche nachgearbeitet." },
      { frage: "Was ist der Unterschied zwischen Umfassungszarge und Blockzarge?", antwort: "Die Umfassungszarge umschließt die Wand von beiden Seiten und ist die gängige Lösung im Wohnbau bei Wandstärken bis etwa 24 cm. Die Blockzarge sitzt nur auf einer Wandseite auf und kommt bei stärkeren Wänden oder besonderen Anschlusssituationen zum Einsatz. Welche Variante passt, ergibt sich aus Wandstärke und vorhandenem Laibungsaufbau." },
      { frage: "Werden auch Wohnungseingangstüren mit Einbruchschutz ausgetauscht?", antwort: "Ja, neben Zimmertüren gehören auch Wohnungseingangstüren mit einbruchhemmender Ausstattung (Mehrfachverriegelung, verstärkte Zarge) zum Leistungsbild. Die passende Widerstandsklasse richtet sich nach der bestehenden Bausituation und wird anhand der eingereichten Fotos und Maße eingeschätzt." },
    ],

  },
  {
    slug: "elektroinstallation",
    title: "Elektroinstallation",
    metaTitle: "Elektroinstallation München | Renodex",
    metaDescription: "Elektroinstallation in München und Umgebung: Sanierung veralteter Elektrik als Teil der Komplettsanierung – mit Renodex.",
    heroFrage: "Wann muss die Elektroinstallation erneuert werden?",
    heroLead: "Veraltete Elektroinstallationen erfüllen oft weder aktuelle Sicherheitsanforderungen noch den Strombedarf moderner Haushalte. Renodex erneuert die Elektrik als eigenständiges Vorhaben oder im Rahmen einer Komplettsanierung.",
    heroImage: "/images/optimized/leistung-elektroinstallation.webp",
    problemUeberschrift: "Veraltete Elektrik trifft auf gestiegenen Strombedarf",
    problemText: "Viele Bestandsgebäude verfügen noch über Elektroinstallationen, die für den heutigen Bedarf an Steckdosen, Beleuchtung und Haushaltsgeräten nicht ausgelegt sind – ein Sicherheitsrisiko und ein Komfortproblem zugleich.",
    loesungUeberschrift: "Elektroinstallation nach aktuellem Bedarf",
    loesungPunkte: [
      "Prüfung der bestehenden Elektroinstallation",
      "Erneuerung nach aktuellem Sicherheitsstandard",
      "Planung ausreichender Steckdosen und Anschlüsse",
      "Abstimmung mit Wärmepumpe und Photovoltaik, falls geplant",
    ],
    vertiefungUeberschrift: "Wann muss der Sicherungskasten in einer Altbauwohnung erneuert werden?",
    vertiefungAbschnitte: [
      { titel: "Wann muss der Sicherungskasten in einer Altbauwohnung erneuert werden?", text: "Ein Sicherungskasten mit klassischen Schraubsicherungen oder ohne Fehlerstromschutzschalter (FI/RCD) entspricht nicht mehr dem heutigen Stand der Technik. Sobald Feuchträume wie Bad oder Küche neu verkabelt werden, schreibt die DIN VDE 0100-410 einen FI-Schutzschalter für diese Stromkreise vor. Bei einer Komplettsanierung wird der Sicherungskasten deshalb in der Regel komplett auf Leitungsschutzschalter mit FI-Absicherung umgestellt, getrennt nach Stromkreisen für Beleuchtung, Steckdosen und Großgeräte." },
      { titel: "Wie viele Steckdosen sind in einer sanierten Wohnung sinnvoll?", text: "Die Anzahl richtet sich nach Raumnutzung und Möblierung, nicht nach einer festen Vorgabe. In Wohn- und Arbeitszimmern hat sich eine Steckdose pro Wandabschnitt bewährt, in der Küche eine höhere Dichte entlang der Arbeitsplatte für Kleingeräte. Bei der Elektroplanung im Rahmen einer Sanierung wird die Steckdosenverteilung deshalb vor dem Verputzen gemeinsam mit dem Möblierungsplan festgelegt, damit keine Leitung nachträglich auf Putz verlegt werden muss." },
      { titel: "Welche Kabel und Leitungen kommen bei einer Sanierung neu ins Haus?", text: "Bei einer Kernsanierung werden alte Aluminium- oder zweiadrige Leitungen ohne Schutzleiter grundsätzlich durch NYM-Kabel mit Schutzleiter ersetzt, da ältere Installationen häufig weder den heutigen Querschnitt- noch den Sicherheitsanforderungen entsprechen. Leitungen werden dabei in Wand oder Estrich verlegt und die Verlegewege dokumentiert, bevor Fliesen oder Putz die Trasse verdecken." },
    ],
    boxTitel: "Elektrik nach aktueller Norm",
    ausEinerHandText: "Elektroarbeiten sind bei nahezu jeder Sanierung beteiligt – Renodex plant sie von Anfang an mit den übrigen Gewerken zusammen.",
    faqFrage: "Wird bei jeder Sanierung die komplette Elektrik erneuert?",
    faqAntwort: "Nicht zwingend – der Umfang hängt vom Zustand der bestehenden Installation ab. Eine Prüfung vor Ort zeigt, ob eine Teil- oder Komplett­erneuerung sinnvoll ist.",
    weitereFragen: [
      { frage: "Braucht jeder Raum einen eigenen Stromkreis?", antwort: "Nicht jeder Raum einzeln, aber Küche, Bad und Räume mit hoher Geräteleistung erhalten üblicherweise eigene abgesicherte Stromkreise, damit ein Fehler oder eine Überlastung nicht die gesamte Wohnung lahmlegt. Die genaue Aufteilung legt die Elektrofachkraft anhand der geplanten Nutzung fest." },
      { frage: "Wird bei der Elektroinstallation auch die Netzwerkverkabelung mitgeplant?", antwort: "Ja, LAN-Leitungen und Leerrohre für spätere Datenkabel werden bei einer Sanierung sinnvollerweise im selben Zug wie die Stromleitungen verlegt, da beides in denselben Wand- und Bodenschlitzen liegt. So entfällt ein zweites Öffnen frisch verputzter Wände." },
      { frage: "Wer prüft die neue Elektroinstallation nach dem Einbau?", antwort: "Eine neu errichtete oder wesentlich veränderte Elektroanlage wird von einer Elektrofachkraft gemäß DIN VDE 0100-600 auf Schutzleiterwiderstand, Isolationswiderstand und Funktion der FI-Schutzschalter geprüft, bevor sie in Betrieb geht. Das Ergebnis wird in einem Prüfprotokoll festgehalten." },
    ],

  },
  {
    slug: "sanitaer",
    title: "Sanitär",
    metaTitle: "Sanitärinstallation München | Renodex",
    metaDescription: "Sanitär und Wasserinstallation in München und Umgebung: als Teil von Badsanierung und Komplettsanierung – mit Renodex.",
    heroFrage: "Was umfasst eine Sanitärinstallation bei der Sanierung?",
    heroLead: "Zur Sanitärinstallation gehören Wasserleitungen, Abwasserführung und die Anschlüsse für Bad und Küche. Renodex erneuert Sanitärinstallationen fachgerecht, meist im Zusammenhang mit einer Badsanierung.",
    heroImage: "/images/optimized/leistung-sanitaer.webp",
    problemUeberschrift: "Alte Leitungen bergen Risiken, die man nicht sieht",
    problemText: "Veraltete Wasserleitungen können korrodieren oder undicht werden, ohne dass es von außen erkennbar ist – bis ein Wasserschaden entsteht. Bei einer Sanierung ist das ein Punkt, der leicht übersehen wird, wenn nur die sichtbare Ausstattung erneuert wird.",
    loesungUeberschrift: "Sanitärinstallation als Teil der Gesamtplanung",
    loesungPunkte: [
      "Prüfung des Zustands vorhandener Leitungen",
      "Fachgerechte Erneuerung von Wasser- und Abwasserleitungen",
      "Abstimmung mit Badsanierung und Bodenverlegung",
      "Anschluss neuer Sanitärobjekte nach aktuellem Standard",
    ],
    vertiefungUeberschrift: "Wie erkennt man, ob Rohrleitungen erneuert werden müssen?",
    vertiefungAbschnitte: [
      { titel: "Woran erkennt man alte Rohrleitungen mit Sanierungsbedarf?", text: "Verzinkte Stahlrohre aus den Baujahren vor etwa 1970 verengen sich im Lauf der Jahrzehnte durch Kalk- und Rostablagerungen von innen, was sich als sinkender Wasserdruck bemerkbar macht. Verfärbtes Wasser nach längerem Stillstand, etwa nach dem Urlaub, deutet auf Korrosion im Leitungssystem hin. Bei Mischinstallationen aus unterschiedlichen Metallen kann zudem Kontaktkorrosion an den Übergängen entstehen, die von außen oft unsichtbar bleibt." },
      { titel: "Welche Rohrmaterialien kommen bei einer Erneuerung zum Einsatz?", text: "Für Trinkwasserleitungen sind heute Verbundrohre und Edelstahlrohre Standard, beide sind nach den einschlägigen DIN-Normen für Trinkwasserinstallationen zugelassen. Verbundrohre lassen sich formstabil verlegen und dämmen Schall gut, Edelstahl punktet bei sehr langen Leitungswegen durch hohe Beständigkeit. Welches Material passt, hängt von der Verlegeart (Auf- oder Unterputz) und der vorhandenen Bausubstanz ab." },
      { titel: "Was ist bei Armaturen und Wasseranschlüssen zu beachten?", text: "Armaturen und Absperrventile unterliegen mechanischem Verschleiß und sollten bei einer Rohrsanierung im selben Zug mit erneuert werden, da nachträgliches Nacharbeiten an bereits verputzten Leitungen deutlich aufwendiger ist. Bei Wasseranschlüssen für Küche und Waschmaschine ist auf ausreichend dimensionierte Zuleitungen und funktionierende Rückflussverhinderer zu achten, wie es die Trinkwasserverordnung vorschreibt." },
    ],
    boxTitel: "Sanitärinstallation mit Bestandsschutz",
    ausEinerHandText: "Sanitärarbeiten sind bei Renodex eng mit Badsanierung, Heizung und Bodenverlegung verzahnt – alles aus einer Planung.",
    faqFrage: "Muss bei einer Badsanierung immer die komplette Sanitärinstallation erneuert werden?",
    faqAntwort: "Das hängt vom Alter und Zustand der vorhandenen Leitungen ab. Eine Prüfung vor Ort zeigt, was tatsächlich erneuert werden muss.",
    weitereFragen: [
      { frage: "Kann man einzelne Rohrabschnitte sanieren oder muss immer die ganze Leitung erneuert werden?", antwort: "Bei punktuellen Schäden ist ein Teilaustausch möglich, sofern das übrige Leitungsnetz noch in ordnungsgemäßem Zustand ist. Bei durchgehender Verzinkung mit erkennbarer Korrosion über mehrere Stränge ist eine komplette Erneuerung sinnvoller, damit keine Altlast im System verbleibt, die die neuen Abschnitte belastet." },
      { frage: "Wird bei einer Sanitärsanierung auch die Heizung mit angefasst?", antwort: "Nein, die wasserführende Trinkwasserinstallation und die Heizungsanlage sind getrennte Gewerke mit eigenen Leitungsnetzen. Berührungspunkte wie gemeinsame Steigschächte oder ein Heizungstausch im selben Bauabschnitt werden bei Bedarf mit dem Heizungsgewerk abgestimmt." },
      { frage: "Muss für neue Rohrleitungen die Wand aufgestemmt werden?", antwort: "Bei Unterputzverlegung ja, hier werden Schlitze in Wand oder Boden gefräst und nach der Verlegung wieder verschlossen. Bei zugänglichen Bereichen wie Kellern oder Vorwandinstallationen lassen sich Leitungen dagegen oft ohne Stemmarbeiten verlegen." },
    ],

  },
  {
    slug: "heizung",
    title: "Heizung",
    metaTitle: "Heizungsinstallation München | Renodex",
    metaDescription: "Heizungsinstallation in München und Umgebung: Austausch und Modernisierung als Teil der Sanierung – mit Renodex.",
    heroFrage: "Wann lohnt sich der Austausch der Heizung?",
    heroLead: "Eine veraltete Heizung arbeitet meist weniger effizient als moderne Systeme und verursacht dadurch höhere laufende Kosten. Renodex prüft den Zustand der bestehenden Heizung und plant den Austausch oder die Modernisierung.",
    heroImage: "/images/optimized/leistung-heizung.webp",
    problemUeberschrift: "Alte Heizung, steigende Kosten, unklare Alternativen",
    problemText: "Viele Eigentümer wissen, dass ihre Heizung nicht mehr zeitgemäß ist, aber nicht, welche Alternative – etwa eine Wärmepumpe oder eine moderne Gasheizung – für ihr Gebäude sinnvoll ist.",
    loesungUeberschrift: "Heizungsmodernisierung mit fachlicher Beratung",
    loesungPunkte: [
      "Prüfung der bestehenden Heizungsanlage",
      "Beratung zu passenden Alternativen für das jeweilige Gebäude",
      "Fachgerechte Installation und Anschluss",
      "Abstimmung mit Sanitär- und Elektroarbeiten",
    ],
    vertiefungUeberschrift: "Wann lohnt sich der Austausch des Heizkessels statt Reparatur?",
    vertiefungAbschnitte: [
      { titel: "Ab welchem Alter wird ein Heizkessel unwirtschaftlich?", text: "Heizkessel mit Konstanttemperatur-Technik, die noch mit hohen Vorlauftemperaturen arbeiten, verbrauchen deutlich mehr Brennstoff als Brennwertgeräte. Bei Bauteilausfällen an älteren Anlagen (Wärmetauscher, Steuerung) ist ein Austausch oft wirtschaftlicher als die Reparatur, weil Ersatzteile für auslaufende Baureihen knapp und teuer werden. Die Entscheidung hängt vom Zustand der Anlage, dem Heizsystem im Haus und den Anschlussmöglichkeiten vor Ort ab und wird nach Sichtung der Bestandsunterlagen bzw. Fotos der Heizungsanlage eingeschätzt." },
      { titel: "Welche Rolle spielen die Heizkörper bei einer Heizungssanierung?", text: "Ein neuer Kessel allein bringt wenig, wenn die Heizkörper nicht zur Anlage passen. Alte Radiatoren mit hohem Wasserinhalt sind für niedrige Vorlauftemperaturen oft unterdimensioniert und müssen bei der Umstellung neu berechnet werden. Auch der hydraulische Abgleich der einzelnen Heizkreise gehört zu einer fachgerechten Heizungssanierung dazu, damit alle Räume gleichmäßig warm werden und die Anlage nicht überdimensioniert läuft." },
      { titel: "Was ist bei der Heizungsanlage in Altbauten zu beachten?", text: "In München stehen viele Altbauten mit historisch gewachsenen Heizsystemen: Etagenheizungen, alte Verteilerleitungen oder nachträglich eingebaute Einzelöfen. Vor einem Kesseltausch wird geprüft, ob die vorhandenen Leitungen und der Schornstein für das neue System geeignet sind. Bei denkmalgeschützten Gebäuden sind zusätzlich Auflagen zur Leitungsführung und zu sichtbaren Bauteilen zu klären, bevor die Heizungsanlage erneuert wird." },
    ],
    boxTitel: "Heizungstechnik nach Bestand und Bedarf",
    ausEinerHandText: "Ein Heizungstausch wird bei Renodex oft gemeinsam mit Sanitär- und Elektroarbeiten geplant, insbesondere wenn eine Wärmepumpe vorgesehen ist.",
    faqFrage: "Berät Renodex auch zur Wärmepumpe als Alternative?",
    faqAntwort: "Ja, Renodex prüft, ob eine Wärmepumpe für das jeweilige Gebäude eine sinnvolle Alternative zur bestehenden Heizung ist.",
    weitereFragen: [
      { frage: "Kann die Heizung während der Sanierung weiterlaufen?", antwort: "Bei einem reinen Kesseltausch ist die Ausfallzeit meist kurz, da die vorhandenen Heizkörper und Leitungen weitergenutzt werden. Wird zusätzlich das Verteilnetz erneuert, muss die Heizung für den betroffenen Zeitraum abgestellt werden - der Ablauf wird vorab mit dem Bewohner abgestimmt, besonders in der Heizperiode." },
      { frage: "Welche Unterlagen werden für ein Angebot zur Heizungsanlage benötigt?", antwort: "Hilfreich sind Fotos des bestehenden Kessels und der Heizkörper, Angaben zur Wohn-/Nutzfläche und, falls vorhanden, alte Wartungsprotokolle oder der Energieausweis. Diese Unterlagen können direkt über den digitalen Kontaktweg hochgeladen werden, eine Vorab-Besichtigung ist dafür nicht zwingend nötig." },
      { frage: "Wird bei der Heizungssanierung auch die Warmwasserbereitung mit einbezogen?", antwort: "Wenn der Kessel auch die Warmwasserbereitung übernimmt, wird das bei der Planung berücksichtigt, damit die neue Anlage beide Aufgaben zuverlässig abdeckt. Reine Sanitärleitungen und Armaturen sind kein Bestandteil der Heizungsarbeiten und werden bei Bedarf mit dem Sanitärgewerk abgestimmt." },
    ],

  },
  {
    slug: "waermepumpe",
    title: "Wärmepumpe",
    metaTitle: "Wärmepumpe München – Installation & Beratung | Renodex",
    metaDescription: "Wärmepumpe in München und Umgebung: Beratung und Installation als Teil der Heizungsmodernisierung – mit Renodex.",
    heroFrage: "Für welche Gebäude eignet sich eine Wärmepumpe?",
    heroLead: "Eine Wärmepumpe eignet sich nicht für jedes Gebäude gleichermaßen – Dämmstandard, vorhandene Heizflächen und die bauliche Situation spielen eine Rolle. Renodex prüft die Eignung vor Ort und berät ehrlich, auch wenn eine Alternative sinnvoller ist.",
    heroImage: "/images/optimized/leistung-waermepumpe.webp",
    problemUeberschrift: "Viele Informationen, wenig Klarheit für das eigene Gebäude",
    problemText: "Zur Wärmepumpe kursieren viele allgemeine Aussagen, die nicht auf jedes Gebäude zutreffen. Ob sich eine Wärmepumpe im konkreten Fall lohnt, hängt von individuellen Faktoren ab, die eine pauschale Aussage nicht beantworten kann.",
    loesungUeberschrift: "Individuelle Prüfung statt pauschaler Empfehlung",
    loesungPunkte: [
      "Prüfung von Dämmstandard und vorhandenen Heizflächen",
      "Ehrliche Einschätzung, ob eine Wärmepumpe sinnvoll ist",
      "Fachgerechte Installation bei geeigneten Gebäuden",
      "Abstimmung mit Elektro- und Sanitärarbeiten",
    ],
    vertiefungUeberschrift: "Ist mein Haus für eine Wärmepumpe geeignet?",
    vertiefungAbschnitte: [
      { titel: "Welche Voraussetzungen muss das Gebäude erfüllen?", text: "Entscheidend sind die Vorlauftemperatur des bestehenden Heizsystems und der Dämmstandard der Gebäudehülle. Flächenheizungen (Fußboden-, Wandheizung) arbeiten mit niedrigen Vorlauftemperaturen und passen gut zur Wärmepumpe, klassische Heizkörper brauchen dafür oft eine Prüfung oder einen Teiltausch gegen größere Flächen. Bei unsaniertem Altbau mit hohem Wärmebedarf wird die Eignung anhand der tatsächlichen Heizlast geprüft, nicht nach Wohnfläche geschätzt." },
      { titel: "Welche Wärmepumpen-Arten kommen für ein Grundstück in Frage?", text: "Luft-Wasser-Wärmepumpen sind ohne Erdarbeiten installierbar und in München am häufigsten verbaut, benötigen aber einen Aufstellort mit ausreichend Abstand zur Nachbarbebauung wegen der Schallemission. Erdwärmepumpen mit Sonde erreichen eine gleichmäßigere Effizienz übers Jahr, erfordern aber eine Bohrgenehmigung und mehr Platz bzw. Grundstückstiefe. Welche Variante technisch und rechtlich möglich ist, hängt vom Grundstück, dem Bebauungsplan und dem Bohrprofil des Untergrunds ab." },
      { titel: "Was gehört zu einer Wärmepumpen-Installation dazu?", text: "Neben dem Außen- und Innengerät gehören Pufferspeicher, hydraulischer Abgleich der bestehenden Heizkreise und die Anbindung an eine vorhandene oder neue Warmwasserbereitung zur Installation. Bei Bedarf wird die Elektroinstallation für den zusätzlichen Stromanschluss der Wärmepumpe mit einem Elektriker abgestimmt. Förderfähige Maßnahmen (BAFA/KfW) setzen in der Regel einen Fachbetrieb als Antragsteller bzw. Nachweisgeber voraus." },
    ],
    boxTitel: "Wärmepumpe: Eignung vor Angebot",
    ausEinerHandText: "Die Installation einer Wärmepumpe wird bei Renodex mit den Elektro- und Sanitärarbeiten der Sanierung zusammen geplant.",
    faqFrage: "Ist eine Wärmepumpe auch in einem Altbau sinnvoll?",
    faqAntwort: "Das hängt vom Dämmstandard und den vorhandenen Heizflächen ab. Eine Prüfung vor Ort zeigt, ob eine Wärmepumpe im konkreten Gebäude sinnvoll ist oder eine andere Lösung passender ist.",
    weitereFragen: [
      { frage: "Kann eine Wärmepumpe auch im Altbau ohne Dämmung nachgerüstet werden?", antwort: "Grundsätzlich ja, die Wirtschaftlichkeit hängt aber vom erreichbaren Vorlauftemperaturniveau ab. Bei sehr hohem Wärmebedarf wird häufig eine Kombination aus punktueller Dämmmaßnahme und Wärmepumpe geprüft, damit die Anlage im wirtschaftlichen Betriebsbereich läuft." },
      { frage: "Muss die alte Heizung komplett raus, wenn eine Wärmepumpe eingebaut wird?", antwort: "Nicht zwingend. In einer Übergangsphase ist ein bivalenter Betrieb mit der bestehenden Heizquelle möglich, etwa an sehr kalten Tagen. Ob das sinnvoll ist oder ein vollständiger Ersatz angestrebt wird, hängt vom Zustand der Altanlage und der Heizlastberechnung ab." },
      { frage: "Wie laut ist eine Luft-Wasser-Wärmepumpe im Betrieb?", antwort: "Die Schallemission hängt vom Gerätetyp und der Aufstellung ab und unterliegt an der Grundstücksgrenze den Grenzwerten der TA Lärm. Der Aufstellort wird deshalb so gewählt und ausgerichtet, dass diese Werte eingehalten werden, insbesondere bei geringem Abstand zur Nachbarbebauung." },
    ],

  },
  {
    slug: "photovoltaik",
    title: "Photovoltaik",
    metaTitle: "Photovoltaik München – Installation & Beratung | Renodex",
    metaDescription: "Photovoltaik in München und Umgebung: Beratung und Installation als Teil der Sanierung – mit Renodex.",
    heroFrage: "Lohnt sich eine Photovoltaikanlage für jedes Haus?",
    heroLead: "Die Eignung eines Dachs für Photovoltaik hängt von Ausrichtung, Neigung, Verschattung und Zustand der Dachfläche ab. Renodex prüft diese Faktoren vor Ort, bevor eine Empfehlung ausgesprochen wird.",
    heroImage: "/images/optimized/leistung-photovoltaik.webp",
    problemUeberschrift: "Nicht jedes Gebäude ist gleich gut geeignet",
    problemText: "Photovoltaik wird oft pauschal empfohlen, ohne die konkrete Gebäudesituation zu berücksichtigen – Ausrichtung und Verschattung durch Bäume oder Nachbargebäude entscheiden aber über den tatsächlichen Ertrag.",
    loesungUeberschrift: "Prüfung vor Empfehlung",
    loesungPunkte: [
      "Prüfung von Ausrichtung, Neigung und Verschattung",
      "Einschätzung der Eignung von Ausrichtung und Verschattung vor Installation",
      "Abstimmung mit Elektroinstallation und Wärmepumpe",
    ],
    vertiefungUeberschrift: "Wie wird geprüft, ob ein Gebäude für eine PV-Anlage geeignet ist?",
    vertiefungAbschnitte: [
      { titel: "Welche Kriterien entscheiden über die Eignung?", text: "Ausschlaggebend sind Dachausrichtung, Neigung, Verschattung durch Nachbargebäude oder Bäume sowie der bauliche Zustand der Dachhaut und der Unterkonstruktion. Auch das Alter der Eindeckung spielt eine Rolle: Ist in absehbarer Zeit ohnehin eine Erneuerung fällig, wird das bei der Planung der Anlage mitgedacht. Erst wenn diese Punkte geklärt sind, lässt sich seriös sagen, ob und wie eine Belegung sinnvoll ist." },
      { titel: "Wie läuft die Prüfung ohne Vor-Ort-Termin ab?", text: "Hochgeladene Fotos, ein kurzes Video oder vorhandene Baupläne genügen für eine erste fachliche Einschätzung von Ausrichtung, Verschattung und Belegungsfläche. Diese Einschätzung ersetzt den ersten Besichtigungstermin und bildet die Grundlage für den Kostenvoranschlag." },
      { titel: "Was gehört zur Montage einer Photovoltaikanlage?", text: "Zur Ausführung zählen die Montage der Unterkonstruktion, die fachgerechte Befestigung sowie die Verlegung der Modulverkabelung bis zum Übergabepunkt. Die eigentliche Montage- und Dacharbeit liegt außerhalb unseres Leistungsspektrums und wird bei Bedarf mit einem entsprechenden Fachbetrieb abgestimmt." },
    ],
    boxTitel: "Eignung Ihres Gebäudes im Blick",
    ausEinerHandText: "Photovoltaik wird bei Renodex im Zusammenhang mit Elektro und Wärmepumpe geplant – nicht isoliert von der übrigen Sanierung.",
    faqFrage: "Muss das Gebäude vor einer Photovoltaikanlage vorbereitet werden?",
    faqAntwort: "Das hängt vom Zustand des Gebäudes ab. Sind vor der Installation Arbeiten außerhalb unseres Leistungsspektrums nötig, klären wir das im Rahmen der Erstberatung mit Ihnen ab.",
    weitereFragen: [
      { frage: "Sind bauliche Vorarbeiten vor der Montage nötig?", antwort: "Das wird bei der Eignungsprüfung mitbeurteilt. Falls nötig, wird mit dem zuständigen Fachbetrieb abgestimmt, bevor die Modulmontage geplant wird – diese Arbeiten liegen außerhalb unseres eigenen Leistungsspektrums." },
      { frage: "Wird die Elektroanbindung der Anlage mit übernommen?", antwort: "Die Verkabelung bis zum Übergabepunkt gehört zur Montageleistung des ausführenden Partnerbetriebs. Der Anschluss an die Hausinstallation und den Zählerplatz wird mit dem Elektro-Gewerk abgestimmt, damit beide Arbeitsschritte ineinandergreifen." },
      { frage: "Welche Unterlagen werden für den Kostenvoranschlag gebraucht?", antwort: "Fotos oder ein Video der Dachfläche aus mehreren Blickwinkeln, nach Möglichkeit mit erkennbaren Maßen oder einem vorhandenen Dachplan. Angaben zu Baujahr und letzter Dachsanierung helfen zusätzlich bei der Einschätzung der Unterkonstruktion." },
    ],

  },
  {
    slug: "innenausbau",
    title: "Innenausbau",
    metaTitle: "Innenausbau koordinieren München – Gewerke im Takt | Renodex",
    metaDescription: "Innenausbau-Koordination in München und Umgebung: Gewerke im richtigen Bauablauf abgestimmt, ein Ansprechpartner – mit Renodex.",
    heroFrage: "Warum entscheidet die Reihenfolge der Gewerke über das Ergebnis?",
    heroLead: "Beim Innenausbau hängt jedes Gewerk vom vorherigen ab – wird ein Schritt zu früh oder zu spät beauftragt, entstehen Wartezeiten oder bereits fertige Arbeit muss wieder geöffnet werden. Renodex übernimmt genau diese Koordination: die Abstimmung der beteiligten Partnerbetriebe zu einem funktionierenden Bauablauf.",
    heroImage: "/images/optimized/leistung-innenausbau.webp",
    problemUeberschrift: "Ohne Ablaufplan entstehen Wartezeiten und doppelte Arbeit",
    problemText: "Wer mehrere Gewerke einzeln beauftragt, trägt selbst die Verantwortung für die richtige Reihenfolge und die Übergabe zwischen den Handwerkern. Fehlt eine verbindliche Abstimmung, stehen Gewerke ungenutzt auf der Baustelle, während andere auf ihre Vorleistung warten – oder ein Gewerk beginnt, bevor die Voraussetzung dafür überhaupt geschaffen ist.",
    loesungUeberschrift: "Ein Ablaufplan mit klaren Übergaben zwischen den Gewerken",
    loesungPunkte: [
      "Ein Bauablaufplan mit Reihenfolge und Zeitfenstern je Gewerk",
      "Freigabe der Vorleistung, bevor das nächste Gewerk beginnt",
      "Ein Ansprechpartner für alle beteiligten Partnerbetriebe",
      "Regelmäßige Abstimmung statt einmaliger Terminzusage",
    ],
    vertiefungUeberschrift: "Wie koordiniert RENODEX mehrere Gewerke beim Innenausbau?",
    vertiefungAbschnitte: [
      { titel: "Was gehört zu einem belastbaren Bauablaufplan?", text: "Ein belastbarer Bauablaufplan legt nicht nur Kalenderdaten fest, sondern die Bedingungen, unter denen ein Gewerk mit seiner Arbeit beginnen darf – etwa dass die Vorleistung geprüft und freigegeben ist, bevor das nächste Gewerk anrückt. Reine Terminlisten ohne diese Abhängigkeiten sind fehleranfällig, sobald sich ein Schritt verschiebt." },
      { titel: "Wie werden Verzögerungen bei einem Gewerk aufgefangen?", text: "Verschiebt sich ein Gewerk, wirkt sich das auf alle nachfolgenden Schritte aus, wenn der Ablaufplan keine Pufferzeiten an den kritischen Übergängen vorsieht. RENODEX plant diese Puffer ein und stimmt sich bei Verzögerungen mit den betroffenen Partnerbetrieben ab, damit sich die Verschiebung nicht ungebremst durch den gesamten Bauablauf zieht." },
      { titel: "Wer prüft, ob ein Gewerk seine Arbeit ordnungsgemäß übergeben hat?", text: "An jeder Schnittstelle zwischen zwei Gewerken steht eine Übergabe: das vorangegangene Gewerk muss seine Leistung in einem Zustand hinterlassen, auf dem der nächste Schritt sauber aufsetzen kann. RENODEX koordiniert diese Übergaben zwischen den beteiligten Partnerbetrieben, statt sie den Kunden selbst nachhalten zu lassen." },
    ],
    boxTitel: "Koordination statt Einzelabsprachen mit jedem Gewerk",
    ausEinerHandText: "Innenausbau-Koordination wird bei Renodex häufig im Rahmen einer Komplettsanierung beauftragt, kann aber auch für ein einzelnes Vorhaben mit mehreren Gewerken gebucht werden – die Einzelleistungen selbst finden Sie auf den jeweiligen Gewerke-Seiten.",
    faqFrage: "Ab wie vielen Gewerken lohnt sich eine koordinierte Ablaufplanung?",
    faqAntwort: "Schon ab zwei aufeinander aufbauenden Gewerken lohnt sich eine abgestimmte Reihenfolge, weil sonst Wartezeiten oder Doppelarbeit entstehen können. Renodex bespricht im Erstgespräch, welche Gewerke im konkreten Vorhaben beteiligt sind und wie die Reihenfolge sinnvoll aussieht.",
    weitereFragen: [
      { frage: "Übernimmt Renodex auch die einzelnen Gewerke selbst?", antwort: "Nein, die handwerkliche Ausführung der einzelnen Gewerke übernehmen die jeweiligen Partnerbetriebe aus unserem geprüften Netzwerk, mit denen Sie einen eigenen Vertrag schließen. Renodex koordiniert die Abstimmung zwischen den Gewerken." },
      { frage: "Was passiert, wenn während der Arbeiten ein weiteres Gewerk nötig wird?", antwort: "Stellt sich während des laufenden Innenausbaus heraus, dass ein zusätzliches Gewerk gebraucht wird, wird das in den bestehenden Ablaufplan eingeordnet und mit den bereits beauftragten Partnerbetrieben zeitlich abgestimmt." },
      { frage: "Wie oft findet eine Abstimmung zwischen den Gewerken statt?", antwort: "Das hängt vom Umfang des Vorhabens ab – bei mehreren parallel laufenden Gewerken sind regelmäßige, meist wöchentliche Abstimmungen üblich, damit Verzögerungen frühzeitig auffallen und nicht erst am geplanten Übergabetermin." },
    ],

  },
  {
    slug: "trockenbau",
    title: "Trockenbau",
    metaTitle: "Trockenbau München – Wände, Decken, Ständerwerk | Renodex",
    metaDescription: "Trockenbau in München und Umgebung: Wände, Decken und Raumaufteilung mit Ständerwerk und Gipskarton – mit Renodex.",
    heroFrage: "Wofür wird Trockenbau eingesetzt?",
    heroLead: "Trockenbau schafft mit Ständerwerk und Gipskarton neue Wände, abgehängte Decken oder eine veränderte Raumaufteilung – ohne die aufwendigen Trocknungszeiten einer massiven Bauweise. Renodex setzt Trockenbau als eigenständiges Gewerk oder als ersten Schritt eines Innenausbaus um.",
    heroImage: "/images/optimized/leistung-trockenbau.webp",
    problemUeberschrift: "Der erste Schritt, der alle folgenden Gewerke beeinflusst",
    problemText: "Trockenbauwände legen fest, wo später Steckdosen, Leitungen und Anschlüsse liegen können. Wird der Trockenbau ohne Abstimmung mit Elektro und Sanitär geplant, müssen Wände nachträglich wieder geöffnet werden.",
    loesungUeberschrift: "Trockenbau abgestimmt mit den Folgegewerken",
    loesungPunkte: [
      "Ständerwerk und Beplankung für Wände und Decken",
      "Planung der Wanddurchbrüche für Elektro und Sanitär vorab",
      "Schall- und Brandschutzanforderungen je nach Raum berücksichtigt",
      "Nahtlose Übergabe an Elektro, Maler und Fliesenleger",
    ],
    vertiefungUeberschrift: "Wie läuft eine Trockenbau-Maßnahme bei einer Sanierung ab?",
    vertiefungAbschnitte: [
      { titel: "Welche Schritte umfasst der Trockenbau vor den Folgegewerken?", text: "Der Trockenbau beginnt mit der Planung des Ständerwerks aus Metallprofilen, gefolgt von der Beplankung mit Gipskarton- oder Gipsfaserplatten. Bei tragenden Anschlüssen und Deckenabhängungen wird die Statik berücksichtigt, bei Bädern und Feuchträumen kommen feuchtraumbeständige Platten zum Einsatz. Leitungsführungen für Elektro und Sanitär werden vorab mit den jeweiligen Gewerken abgestimmt, damit die Wand erst nach Fertigstellung der Installationsebene geschlossen wird." },
      { titel: "Welche Bauteile werden im Trockenbau unterschieden?", text: "Man unterscheidet nichttragende Trennwände, Vorsatzschalen zur Wandverkleidung, abgehängte Decken zur Verlegung von Leitungen oder zur Raumakustik sowie Dachschrägenverkleidungen im ausgebauten Dachgeschoss. Jede Bauteilart hat eigene Anforderungen an Profiltiefe, Dämmung und Beplankungsstärke, abhängig von Schall- und Brandschutzvorgaben laut DIN 4109 bzw. DIN 4102." },
      { titel: "Wie wird der Schallschutz im Trockenbau sichergestellt?", text: "Der Schallschutz einer Trockenbauwand hängt von der Anzahl der Beplankungslagen, der Dämmstoffeinlage im Ständerwerk und der Entkopplung von der Rohbaukonstruktion ab. Doppelständerwände mit getrennten Profilschienen reduzieren die Schallübertragung stärker als einfache Ständerwände. Die Ausführung richtet sich nach der Nutzung der angrenzenden Räume, etwa bei Schlafzimmern oder Mehrfamilienhäusern." },
    ],
    boxTitel: "Trockenbau als Grundlage für den Innenausbau",
    ausEinerHandText: "Trockenbau ist bei Renodex häufig der erste Schritt eines Innenausbaus, kann aber auch als eigenständiges Vorhaben beauftragt werden – etwa für eine neue Raumaufteilung ohne größere Sanierung.",
    faqFrage: "Ist Trockenbau eine Alternative zu einer massiven Wand?",
    faqAntwort: "Für nichttragende Innenwände ja – Trockenbau ist schneller umgesetzt und ohne lange Trocknungszeiten. Tragende Wände lassen sich damit nicht ersetzen, hier bleibt die massive Bauweise erforderlich.",
    weitereFragen: [
      { frage: "Kann Trockenbau auch nachträglich in bewohnten Räumen erfolgen?", antwort: "Trockenbauarbeiten sind grundsätzlich auch im bewohnten Zustand möglich, da sie im Vergleich zu Maurerarbeiten staub- und lärmärmer ablaufen. Angrenzende Räume werden während der Bauphase mit Staubschutzwänden abgetrennt, eine vollständige Freiräumung ist meist nur im direkt betroffenen Raum nötig." },
      { frage: "Welche Vorarbeiten sind vor dem Trockenbau nötig?", antwort: "Vor dem Aufbau des Ständerwerks müssen Boden und Decke tragfähig und eben sein, alte Putz- oder Tapetenreste im Anschlussbereich entfernt werden. Bestehende Leitungen im Wandbereich werden erfasst, damit die neue Trennwand nicht in bestehende Elektro- oder Sanitärführungen einbindet." },
      { frage: "Wie wird die Oberfläche einer Trockenbauwand für den Anstrich vorbereitet?", antwort: "Nach der Beplankung werden die Plattenstöße gespachtelt, mit Fugenband armiert und geschliffen, üblich sind hierfür die Qualitätsstufen Q2 bis Q4 je nach Anforderung an die Oberfläche. Erst nach vollständiger Trocknung und Grundierung ist die Wand bereit für Maler- oder Tapezierarbeiten, die als eigenes Gewerk folgen." },
    ],

  },
];
