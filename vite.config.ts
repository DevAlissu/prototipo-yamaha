import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // Aceita conexões externas
    port: 3000, // Porta onde o Vite está rodando
    allowedHosts: ['inova-sistemas.ddns.net'], 
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), 
      "@styles": path.resolve(__dirname, "./src/styles"),
    },
  },
});