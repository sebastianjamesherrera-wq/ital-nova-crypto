import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/ital-nova-crypto/",
  plugins: [react()],
});
