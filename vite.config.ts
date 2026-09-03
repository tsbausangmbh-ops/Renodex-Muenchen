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
                    // 03.09.2026: Funktionsform statt Objekt -- das Objekt erfasst nur das Einstiegsmodul eines
                    // Pakets (react-dom/index.js, nicht react-dom/client.js mit 524 KB, das im Index blieb).
                    // Zwei Gruppen fuer den ersten Seitenaufbau (Framework, UI), Rest nur bei Bedarf.
                    manualChunks(id) {
                      if (/node_modules[\\/](react-dom|react|scheduler|wouter|react-helmet-async|@tanstack[\\/]react-query)[\\/]/.test(id)) return "vendor";
                      if (/node_modules[\\/](@radix-ui|lucide-react|react-icons|class-variance-authority|clsx|tailwind-merge)[\\/]/.test(id)) return "ui";
                      if (/node_modules[\\/](@hookform|zod|react-hook-form)[\\/]/.test(id)) return "forms";
                      if (/node_modules[\\/]recharts[\\/]/.test(id)) return "charts";
                      if (/node_modules[\\/]framer-motion[\\/]/.test(id)) return "motion";
                      if (/node_modules[\\/]embla-carousel/.test(id)) return "carousel";
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
