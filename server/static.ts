import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { injectSEOTags, getSEOForPath } from "./seo-tags";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath, {
    maxAge: '1h',
    etag: true,
    lastModified: true,
    index: false,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=600');
      }
      else if (filePath.match(/-[A-Za-z0-9]{6,10}\.(js|css)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=3600');
      }
      else if (filePath.match(/\.(png|jpg|jpeg|webp|avif|svg|woff2?|ttf|eot)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=3600');
      }
      else if (filePath.endsWith('.md')) {
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      }
    }
  }));

  // fall through to index.html if the file doesn't exist
  // Inject SEO meta tags for Google and AI crawlers
  app.use("*", (req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    const requestPath = req.originalUrl || req.path || "/";
    
    fs.readFile(indexPath, "utf-8", (err, html) => {
      if (err) {
        res.status(500).send("Error loading page");
        return;
      }
      
      // Inject SEO meta tags based on the requested path
      const seoHtml = injectSEOTags(html, requestPath, true);
      
      // Soft-404-Fix: kein SEO-Eintrag (keine echte Seite) => NotFound => HTTP 404
      const statusCode = getSEOForPath(requestPath.split('?')[0]) ? 200 : 404;
      res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=600');
      res.setHeader('Content-Type', 'text/html');
      res.status(statusCode).send(seoHtml);
    });
  });
}
