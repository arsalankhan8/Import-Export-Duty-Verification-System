import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Bind to all IPs so LAN works
    port: 5173, // Optional: Keep port consistent
  },
});
