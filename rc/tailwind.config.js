/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#080b12",
        foreground: "#ffffff",
        card: "#111827",
        border: "#293244",
        positive: "#22c55e",
        electric: "#38bdf8",
        obsidian: "#080b12",
        "muted-foreground": "#94a3b8"
      },
      fontFamily: {
        display: ["Inter", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};
