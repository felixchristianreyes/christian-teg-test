import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Let's add a proxy to the API
  // This is a temporary solution to get the API working
  // We should ideally use a proper API server (example: node express server)
  // but for now this is fine
  server: {
    proxy: {
      "/api": {
        target: "https://teg-coding-challenge.s3.ap-southeast-2.amazonaws.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
