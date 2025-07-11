import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

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
      "@": "/src",
      "@styles": "/src/styles",
    },
  },
});