import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react(),
    VitePWA({
      manifest: {
        name: "Spiral v2",
        short_name: "Spiral",
        description: "Pick'em App",
        theme_color: "#ffffff",
        icons: [
          {
            src: "assets/icons/spiral-v2-logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
