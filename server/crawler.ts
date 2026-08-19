import { Request, Response, NextFunction } from "express";
import { getSEOForPath, generateAllSchemas, injectSEOTags } from "./seo-tags";
import fs from "fs";
import path from "path";

const SITE_HOST = "renodex.de";

const crawlerUserAgents = [
  'googlebot', 'googlebot-image', 'googlebot-news', 'googlebot-video',
  'google-inspectiontool', 'adsbot-google', 'adsbot-google-mobile', 'apis-google',
  'mediapartners-google', 'storebot-google', 'google-extended', 'googleother',
  'bingbot', 'bingpreview', 'msnbot', 'adidxbot',
  'duckduckbot', 'baiduspider', 'yandexbot', 'sogou',
  'seznambot', 'petalbot', 'coccocbot', 'gptbot',
  'chatgpt-user', 'oai-searchbot', 'claudebot', 'claude-web',
  'anthropic-ai', 'perplexitybot', 'perplexity-user', 'cohere-ai',
  'ccbot', 'bytespider', 'meta-externalagent', 'amazonbot',
  'applebot-extended', 'youbot', 'diffbot', 'ai2bot',
  'facebookexternalhit', 'twitterbot', 'linkedinbot', 'whatsapp',
  'telegrambot', 'discordbot', 'pinterestbot', 'redditbot',
  'slackbot', 'applebot',
];

export function isCrawler(req: Request): boolean {
  const userAgent = req.headers['user-agent']?.toLowerCase() || '';
  const bufferAgent = req.headers['x-bufferbot'];

  if (!userAgent) return false;
  if (bufferAgent) return true;
  if (req.method !== 'GET' && req.method !== 'HEAD') return false;

  return crawlerUserAgents.some(bot => userAgent.includes(bot));
}

function isStaticResource(path: string): boolean {
  return /\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp|json|xml|txt|map|mp4|webm)$/i.test(path);
}

function stripAllJsonLd(html: string): string {
  let result = html;
  let safety = 0;
  while (safety < 50) {
    const marker = 'application/ld+json';
    const idx = result.indexOf(marker);
    if (idx === -1) break;
    const scriptStart = result.lastIndexOf('<script', idx);
    if (scriptStart === -1) break;
    const scriptEnd = result.indexOf('</script>', idx);
    if (scriptEnd === -1) break;
    result = result.substring(0, scriptStart) + result.substring(scriptEnd + 9);
    safety++;
  }
  return result;
}

function injectFreshMetaTags(html: string, path: string): string {
  const seo = getSEOForPath(path);
  if (!seo) return html;

  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${seo.title}</title>`);
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${seo.description}">`);
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${seo.canonical}">`);
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${seo.title}">`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${seo.description}">`);
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${seo.canonical}">`);
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${seo.title}">`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${seo.description}">`);
  html = html.replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i, `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`);
  html = html.replace(/<meta\s+name="googlebot"\s+content="[^"]*"\s*\/?>/i, `<meta name="googlebot" content="index, follow, max-image-preview:large">`);
  html = html.replace(/<meta\s+name="bingbot"\s+content="[^"]*"\s*\/?>/i, `<meta name="bingbot" content="index, follow">`);

  if (seo.geoPlacename) {
    html = html.replace(/<meta\s+name="geo.placename"\s+content="[^"]*"\s*\/?>/i, `<meta name="geo.placename" content="${seo.geoPlacename}">`);
  }
  if (seo.geoRegion) {
    html = html.replace(/<meta\s+name="geo.region"\s+content="[^"]*"\s*\/?>/i, `<meta name="geo.region" content="${seo.geoRegion}">`);
  }
  if (seo.geoPosition) {
    html = html.replace(/<meta\s+name="geo.position"\s+content="[^"]*"\s*\/?>/i, `<meta name="geo.position" content="${seo.geoPosition}">`);
    const [lat, lng] = seo.geoPosition.split(";");
    html = html.replace(/<meta\s+name="ICBM"\s+content="[^"]*"\s*\/?>/i, `<meta name="ICBM" content="${lat}, ${lng}">`);
  }
  if (seo.geoCity) {
    html = html.replace(/<meta\s+name="city"\s+content="[^"]*"\s*\/?>/i, `<meta name="city" content="${seo.geoCity}">`);
  }
  if (seo.geoTarget) {
    html = html.replace(/<meta\s+name="target"\s+content="[^"]*"\s*\/?>/i, `<meta name="target" content="${seo.geoTarget}">`);
  }
  if (seo.geoCoverage) {
    html = html.replace(/<meta\s+name="coverage"\s+content="[^"]*"\s*\/?>/i, `<meta name="coverage" content="${seo.geoCoverage}">`);
  }

  const botsToIndex = ['GPTBot', 'Google-Extended', 'anthropic-ai', 'CCBot', 'cohere-training-data-crawler', 'AI2Bot', 'AI2Bot-Dolma', 'img2dataset', 'Bytespider'];
  for (const bot of botsToIndex) {
    html = html.replace(
      new RegExp(`<meta\\s+name="${bot}"\\s+content="[^"]*"\\s*/?>`, 'i'),
      `<meta name="${bot}" content="index, follow">`
    );
  }

  return html;
}

function injectFreshGraph(html: string, path: string): string {
  const schemaMarkup = generateAllSchemas(path);
  return html.replace(/<\/head>/i, `${schemaMarkup}\n</head>`);
}

function buildSSRFallbackHtml(requestPath: string): string | null {
  let baseHtml: string | null = null;

  try {
    const distIndexPath = path.join(process.cwd(), 'dist', 'public', 'index.html');
    if (fs.existsSync(distIndexPath)) {
      baseHtml = fs.readFileSync(distIndexPath, 'utf-8');
    }
  } catch (e) {}

  if (!baseHtml) {
    try {
      const clientIndexPath = path.join(process.cwd(), 'client', 'index.html');
      if (fs.existsSync(clientIndexPath)) {
        baseHtml = fs.readFileSync(clientIndexPath, 'utf-8');
      }
    } catch (e) {}
  }

  if (!baseHtml) return null;

  return injectSEOTags(baseHtml, requestPath);
}

export function crawlerMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!isCrawler(req)) return next();
  if (req.path.startsWith('/api')) return next();
  if (isStaticResource(req.path)) return next();

  const requestPath = req.originalUrl || req.path || "/";
  const userAgent = req.headers['user-agent']?.toLowerCase() || '';
  const botName = crawlerUserAgents.find(b => userAgent.includes(b)) || 'unknown';

  const fallbackHtml = buildSSRFallbackHtml(requestPath);
  if (fallbackHtml) {
    res.setHeader('X-SSR-Source', 'ssr-direct');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // Soft-404-Fix: kein SEO-Eintrag (echte Seite) => NotFound => HTTP 404
    const statusCode = getSEOForPath(requestPath.split('?')[0]) ? 200 : 404;
    res.status(statusCode).send(fallbackHtml);
    console.log(`[Crawler] SSR direkt (${statusCode}): ${requestPath} (${fallbackHtml.length} Bytes) an ${botName}`);
  } else {
    console.log(`[Crawler] Kein Base-HTML fuer SSR verfuegbar: ${requestPath} -> next()`);
    next();
  }
}
