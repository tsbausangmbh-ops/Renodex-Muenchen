import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
      rollupOptions: {
        output: {
                    // 03.09.2026 (Leistungstest: 6-14 JS-Dateien vor dem ersten Rendern, jede ein eigener
                    // Roundtrip). Vorher neun Vendor-Chunks (router, ui, radix, forms, query, icons, charts,
                    // carousel, vendor) plus Rollups geteilte Mini-Chunks. Jetzt zwei Gruppen -- Framework und
                    // UI --, beide unter 400 KB; forms/charts/motion/carousel bleiben getrennt, weil sie nicht
                    // auf jeder Seite gebraucht werden. experimentalMinChunkSize haelt geteilte Module unter
                    // 50 KB bei ihrem Importeur statt sie als eigene Datei abzuspalten.
                    manualChunks: {
                      vendor: ["react", "react-dom", "wouter", "@tanstack/react-query"],
                      ui: ["class-variance-authority", "clsx", "tailwind-merge", "@radix-ui/react-dialog", "@radix-ui/react-accordion", "@radix-ui/react-tabs", "@radix-ui/react-tooltip", "@radix-ui/react-slot", "lucide-react", "react-icons"],
                      forms: ["@hookform/resolvers", "zod", "react-hook-form"],
                      charts: ["recharts"],
                      motion: ["framer-motion"],
                      carousel: ["embla-carousel-react"],
                    },
                    experimentalMinChunkSize: 50000,
        },
      },
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
