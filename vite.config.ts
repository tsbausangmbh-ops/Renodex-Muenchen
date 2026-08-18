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
                    manualChunks: {
            vendor: ["react", "react-dom"],
            router: ["wouter"],
            ui: ["class-variance-authority", "clsx", "tailwind-merge"],
            radix: ["@radix-ui/react-dialog", "@radix-ui/react-accordion", "@radix-ui/react-tabs", "@radix-ui/react-tooltip", "@radix-ui/react-slot"],
            forms: ["@hookform/resolvers", "zod", "react-hook-form"],
            query: ["@tanstack/react-query"],
            charts: ["recharts"],
            motion: ["framer-motion"],
            icons: ["lucide-react", "react-icons"],
            carousel: ["embla-carousel-react"],
          },
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
