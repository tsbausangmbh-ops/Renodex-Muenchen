import { writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { districts } from "../client/src/content/districts.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const DOMAIN = "https://089dach.gmbh";

// Feste Routen, 1:1 aus client/src/App.tsx uebernommen -- bei einer neuen Route dort
// IMMER auch hier ergaenzen (Regel "Sitemap immer aktuell", projekte/webseiten/CLAUDE.md).
const STATIC_ROUTES: { path: string; priority: string; changefreq: string }[] = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/leistungen", priority: "0.9", changefreq: "weekly" },
  { path: "/ratgeber", priority: "0.7", changefreq: "monthly" },
  { path: "/faq", priority: "0.7", changefreq: "monthly" },
  { path: "/preise", priority: "0.8", changefreq: "monthly" },
  { path: "/kontakt", priority: "0.9", changefreq: "weekly" },
  { path: "/ueber-uns", priority: "0.6", changefreq: "monthly" },
  { path: "/notdienst", priority: "0.9", changefreq: "weekly" },
  { path: "/sturmschaden", priority: "0.8", changefreq: "weekly" },
  { path: "/dach-undicht", priority: "0.8", changefreq: "weekly" },
  { path: "/dach-reparieren", priority: "0.8", changefreq: "weekly" },
  { path: "/dachsanierung-kosten", priority: "0.8", changefreq: "monthly" },
  { path: "/impressum", priority: "0.3", changefreq: "yearly" },
  { path: "/datenschutz", priority: "0.3", changefreq: "yearly" },
  { path: "/agb", priority: "0.3", changefreq: "yearly" },
  { path: "/cookie", priority: "0.3", changefreq: "yearly" },
  { path: "/barrierefreiheit", priority: "0.3", changefreq: "yearly" },
  { path: "/eu-ai-act", priority: "0.3", changefreq: "yearly" },
];

async function generateSitemap() {
  const today = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const route of STATIC_ROUTES) {
    xml += `  <url>\n    <loc>${DOMAIN}${route.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>\n`;
  }

  // Bezirksseiten dynamisch aus districts.ts -- nie hardcoded, damit ein neuer
  // Bezirkseintrag im Content automatisch in der Sitemap landet.
  for (const d of districts) {
    xml += `  <url>\n    <loc>${DOMAIN}/bezirk/${d.slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
  }

  xml += `</urlset>`;

  await writeFile(path.resolve(rootDir, "client/public/sitemap.xml"), xml);

  console.log(`Sitemap generated: ${STATIC_ROUTES.length} feste Routen + ${districts.length} Bezirksseiten`);
}

generateSitemap().catch((err) => {
  console.error("Sitemap generation failed:", err);
  process.exit(1);
});
