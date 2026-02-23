import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/mpesa": "http://localhost:5000", // redirect frontend calls to backend
    },
  },
});