import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { injectSEOTags } from "./seo-tags";
import compression from "compression";
import { crawlerMiddleware } from "./crawler";

const app = express();
// www -> ohne www, dauerhaft (301). Steht bewusst hier im Repo und nicht in den
// Traefik-Labels: Coolify erzeugt die Weiterleitung nur als 302 (permanent=false),
// und eigene Labels fuehrten am 12.08.2026 zu HTTP 502. Hier ueberlebt die
// Kanonisierung jeden Serverumzug und gilt fuer alle Marken gleich.
app.use((req, res, next) => {
  const host = (req.get("host") || "").toLowerCase();
  if (host.startsWith("www.")) {
    res.setHeader("Cache-Control", "no-store, max-age=0");
    return res.redirect(301, `https://${host.slice(4)}${req.originalUrl}`);
  }
  next();
});
  // google-site-verification-bypass
  
// soft-404-middleware: Unbekannte Routen mit 404 Status beantworten
const VALID_SITEMAP_ROUTES = new Set(['/', '/barrierefreiheit', '/datenschutz', '/faq', '/impressum', '/kontakt', '/leistungen', '/leistungen/komplettsanierung', '/leistungen/haussanierung', '/leistungen/wohnungssanierung', '/leistungen/renovierung', '/leistungen/badsanierung', '/leistungen/bodenverlegung', '/leistungen/malerarbeiten-fassade', '/leistungen/dachdecker', '/leistungen/spengler', '/leistungen/mauerwerksabdichtung', '/leistungen/asbestsanierung', '/leistungen/tueren', '/leistungen/elektroinstallation', '/leistungen/sanitaer', '/leistungen/heizung', '/leistungen/waermepumpe', '/leistungen/photovoltaik', '/leistungen/innenausbau', '/leistungen/trockenbau', '/preise']);

app.get("/google0be2e6794bc5fd0e.html", (_req, res) => {
    res.type("html").send("google-site-verification: google0be2e6794bc5fd0e.html");
  });
  app.get("/googleLFNavZx3bSGpLmNUSuV5QIR2M0VQT3svYAz2zKCCfS8.html", (_req, res) => {
    res.type("html").send("google-site-verification: googleLFNavZx3bSGpLmNUSuV5QIR2M0VQT3svYAz2zKCCfS8.html");
  });

const httpServer = createServer(app);

// Gzip/Brotli Kompression für bessere Core Web Vitals

// 301 Redirects ZUERST (vor Prerender/Bot-Middleware) - sonst greifen Redirects nicht fuer Crawler
// 'redirects'-Map ist weiter unten definiert; Closure laeuft erst zur Request-Zeit -> verfuegbar.
app.use((req, res, next) => {
  const path = req.path.toLowerCase();
  if (redirects[path]) {
    return res.redirect(301, redirects[path]);
  }
  if (path.startsWith('/muenchen/') || path.startsWith('/district/') || path.startsWith('/stadtteil/')) {
    const slug = path.split('/').pop();
    if (slug) {
      return res.redirect(301, `/bezirk/${slug}`);
    }
  }
  next();
});

// Prerender-Middleware: Vollstaendig gerendertes HTML fuer Suchmaschinen-Crawler
const PRERENDER_BOTS = ["googlebot","bingbot","yandex","baiduspider","duckduckbot","facebot","twitterbot","linkedinbot","slackbot","applebot","gptbot","claudebot","anthropic","oai-searchbot","chatgpt-user","perplexitybot","semrushbot","ahrefsbot","lighthouse","screaming frog"];
app.use(async (req, res, next) => {
  const ua = (req.headers["user-agent"] || "").toLowerCase();
  const isBot = PRERENDER_BOTS.some(b => ua.includes(b));
  if (isBot && !req.path.startsWith("/api") && !req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|map|json|xml|txt)$/)) {
    try {
      // M6 2026-08-04: Prerender-Dienst vom Altsystem (187.124.15.103) auf einen eigenen VPS
      // umgezogen (Code jetzt in Git: github.com/tsbausangmbh-ops/prerender-v2).
      const prerenderUrl = "http://" + (process.env.PRERENDER_HOST || "187.127.70.129:3033") + "/render?url=https://renodex.de" + req.originalUrl;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      const prerenderRes = await fetch(prerenderUrl, { signal: controller.signal });
      clearTimeout(timeout);
      if (prerenderRes.ok) {
        const html = await prerenderRes.text();
        if (html.length > 1000) {
          res.setHeader("X-SSR-Source", "prerender");
          // Bot-Pfad: Security-Header identisch zum Normal-Pfad mitsetzen (2026-07-06 bug-killer)
          res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://nominatim.openstreetmap.org https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://www.googletagmanager.com https://www.google.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com; frame-src 'self' https://www.google.com https://www.youtube.com; object-src 'none'; base-uri 'self';");
          res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()');
          res.setHeader('X-Frame-Options', 'SAMEORIGIN');
          res.setHeader('X-Content-Type-Options', 'nosniff');
          res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
          res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          // Soft-404-Fix: NotFound-Seite (canonical "/404") echtes HTTP 404 geben
          const isNotFound = html.includes('href="/404"') || html.includes("Seite nicht gefunden");
          if (isNotFound) {
            res.status(404);
            console.log("[Prerender] 404: " + req.path + " (NotFound erkannt)");
          } else {
            console.log("[Prerender] OK: " + req.path + " (" + html.length + "B)");
          }
          return res.send(html);
        }
      }
    } catch (e) {}
  }
  next();
});

app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req: Request, res: Response) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  }
}));

// Security Headers für Google Ranking-Signale
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Alt-Svc', 'clear');  // Disable QUIC/HTTP3 — fixes ERR_QUIC_PROTOCOL_ERROR on Hostinger
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()');
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("X-DNS-Prefetch-Control", "on");
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://nominatim.openstreetmap.org https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://www.googletagmanager.com https://www.google.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com; frame-src 'self' https://www.google.com https://www.youtube.com; object-src 'none'; base-uri 'self';");
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }
  next();
});

app.use(crawlerMiddleware);
console.log('Crawler-Middleware aktiv: SSR');

// 301 Redirects - SEO wichtig für alte/falsche URLs
const redirects: Record<string, string> = {
  // Alte URL-Strukturen
  '/index.html': '/',
  '/home': '/',
  '/startseite': '/',
  '/start': '/',
  
  // Leistungen Varianten
  '/services': '/leistungen',
  '/dienstleistungen': '/leistungen',
  '/angebote': '/leistungen',
  '/service': '/leistungen',
  
  // Kontakt Varianten
  '/contact': '/kontakt',
  '/anfrage': '/kontakt',
  '/termin': '/kontakt',
  '/anfragen': '/kontakt',
  
  // Sofort-Hilfe Varianten
  '/notfall': '/sofort-hilfe',
  '/emergency': '/sofort-hilfe',
  '/24h': '/sofort-hilfe',
  '/soforthilfe': '/sofort-hilfe',
  '/notdienst': '/sofort-hilfe',
  '/leistungen/notdienst': '/sofort-hilfe',

  // Umbenannte Themenseiten (18.08.2026, Dachdecker- auf Sanierungs-/Sanitaer-/Elektro-
  // Leistungsspektrum umgestellt) -- alte URLs bleiben als 301 erreichbar.
  '/dach-reparieren': '/sanierung-reparatur',
  '/dachsanierung-kosten': '/komplettsanierung-kosten',
  '/dach-undicht': '/heizung-ausfall',
  '/sturmschaden': '/wasserschaden',
  
  // Über uns Varianten
  '/about': '/ueber-uns',
  '/about-us': '/ueber-uns',
  '/unternehmen': '/ueber-uns',
  '/firma': '/ueber-uns',
  '/team': '/ueber-uns',
  
  // FAQ Varianten
  '/fragen': '/faq',
  '/hilfe': '/faq',
  '/help': '/faq',
  
  // Impressum Varianten
  '/imprint': '/impressum',
  '/legal': '/impressum',
  
  // Datenschutz Varianten
  '/privacy': '/datenschutz',
  '/privacy-policy': '/datenschutz',
  '/dsgvo': '/datenschutz',
  
  // Bezirk-Weiterleitungen (alte Patterns)
  '/muenchen/schwabing': '/bezirk/schwabing',
  '/muenchen/bogenhausen': '/bezirk/bogenhausen',
  '/muenchen/sendling': '/bezirk/sendling',
  '/muenchen/pasing': '/bezirk/pasing',
  '/muenchen/laim': '/bezirk/laim',
  '/district/schwabing': '/bezirk/schwabing',
  '/district/bogenhausen': '/bezirk/bogenhausen',
  '/stadtteil/schwabing': '/bezirk/schwabing',
  '/stadtteil/bogenhausen': '/bezirk/bogenhausen',
  
  // Bezirk-Namenskorrekturen (häufige Suchvarianten)
  '/bezirk/giesing': '/bezirk/obergiesing',
  '/bezirk/au': '/bezirk/haidhausen',
  '/bezirk/schwabing-west': '/bezirk/schwabing',
  '/bezirk/schwabing-freimann': '/bezirk/schwabing',
  '/bezirk/sendling-westpark': '/bezirk/sendling',
  '/bezirk/obersendling': '/bezirk/thalkirchen',

  // Dachdecker-Stadtteil-URLs -> Bezirk-Seiten (404-Fix 2026-06-07)
  '/dachdecker/milbertshofen': '/bezirk/milbertshofen',
  '/dachdecker/solln': '/bezirk/solln',
  '/dachdecker/trudering': '/bezirk/trudering',
  '/dachdecker/aubing': '/bezirk/aubing',
  '/dachdecker/feldmoching': '/bezirk/feldmoching',
  '/dachdecker/hadern': '/bezirk/hadern',
  '/dachdecker/maxvorstadt': '/bezirk/maxvorstadt',
  '/dachdecker/neuhausen': '/bezirk/neuhausen',
  '/dachdecker/obermenzing': '/bezirk/obermenzing',
  '/dachdecker/ramersdorf': '/bezirk/ramersdorf',
  '/dachdecker/riem': '/bezirk/riem',
  '/dachdecker/schwabing': '/bezirk/schwabing',

  // Dachdecker-Stadtteile ohne eigene Bezirk-Seite -> Leistungen
  '/dachdecker/fuerstenried': '/leistungen',
  '/dachdecker/langwied': '/leistungen',
  '/dachdecker/lochhausen': '/leistungen',
  '/dachdecker/thalkirchen': '/leistungen',

  // Nicht-existente Leistungs-Unterseiten -> Leistungen
  '/leistungen/dachreparatur': '/leistungen',
  '/leistungen/dachfenster': '/leistungen',

  // Cookies -> Datenschutz
  '/cookies': '/datenschutz',

  // Blog (entfernt) -> Startseite
  '/blog': '/',
  '/blog/dachfenster-einbau-tipps': '/',
  '/blog/dach-versicherung-richtig-waehlen': '/',
  '/blog/dachsanierung-richtiger-zeitpunkt': '/',
  '/blog/flachdach-wartung-checkliste': '/',
  '/blog/marder-im-dach-vertreiben': '/',
  '/blog/schneefanggitter-montage': '/',
};

app.use((req, res, next) => {
  const path = req.path.toLowerCase();

  // Exakte Weiterleitungen
  if (redirects[path]) {
    return res.redirect(301, redirects[path]);
  }
  
  // Pattern-basierte Weiterleitungen für /muenchen/* und /district/*
  if (path.startsWith('/muenchen/') || path.startsWith('/district/') || path.startsWith('/stadtteil/')) {
    const slug = path.split('/').pop();
    if (slug) {
      return res.redirect(301, `/bezirk/${slug}`);
    }
  }
  
  // Trailing Slash entfernen (außer für Root)
  if (path.length > 1 && path.endsWith('/')) {
    return res.redirect(301, path.slice(0, -1));
  }
  
  next();
});

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // SEO Pre-rendering middleware for Development mode
  // Intercepts HTML responses and injects SEO meta tags
  if (process.env.NODE_ENV !== "production") {
    app.use((req, res, next) => {
      // Only intercept non-API requests that might return HTML
      if (req.path.startsWith("/api") || req.path.startsWith("/vite-hmr")) {
        return next();
      }
      
      const originalEnd = res.end.bind(res) as Response["end"];
      (res.end as any) = (chunk?: any, encodingOrCb?: BufferEncoding | (() => void), cb?: () => void) => {
        const contentType = res.getHeader("Content-Type");
        const alreadyProcessed = res.getHeader("X-Prerender");
        if (!alreadyProcessed && typeof contentType === "string" && contentType.includes("text/html")) {
          const requestPath = req.originalUrl || req.path || "/";
          let htmlContent: string;
          if (typeof chunk === "string") {
            htmlContent = chunk;
          } else if (Buffer.isBuffer(chunk)) {
            htmlContent = chunk.toString("utf-8");
          } else {
            if (typeof encodingOrCb === "function") {
              return originalEnd(chunk, encodingOrCb);
            }
            return originalEnd(chunk, encodingOrCb as BufferEncoding, cb);
          }
          chunk = injectSEOTags(htmlContent, requestPath, false);
        }
        if (typeof encodingOrCb === "function") {
          return originalEnd(chunk, encodingOrCb);
        }
        return originalEnd(chunk, encodingOrCb as BufferEncoding, cb);
      };
      
      next();
    });
  }

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await   // 404-check: Unbekannte Routen markieren
  app.use((req, res, next) => {
    const reqPathClean = req.path.replace(/\/$/, '') || '/';
    if (!VALID_SITEMAP_ROUTES.has(reqPathClean) && !req.path.startsWith('/api') && !req.path.startsWith('/assets') && !req.path.includes('.')) {
      res.status(404);
    }
    next();
  });

  setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  
  // Server Timeout Settings - Replit proxy requires longer keep-alive
  httpServer.keepAliveTimeout = 120000; // 2 minutes - matches Replit proxy expectations
  httpServer.headersTimeout = 121000; // Must be slightly higher than keepAliveTimeout
  httpServer.timeout = 300000; // 5 minute overall request timeout
  
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    async () => {
      log(`serving on port ${port}`);

    },
  );
})();
