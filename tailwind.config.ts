/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark base palette
        void: "#060608",
        abyss: "#0a0a0f",
        depths: "#0f0f18",
        surface: "#13131f",
        elevated: "#1a1a2e",
        border: "#ffffff0f",
        "border-subtle": "#ffffff08",

        // Accent colors — electric indigo/violet system
        arc: {
          50: "#ede9ff",
          100: "#cfc7ff",
          200: "#b0a0ff",
          300: "#9278ff",
          400: "#7c5bff",
          500: "#6741ff",
          600: "#5933e8",
          700: "#4825cc",
          800: "#3919a8",
          900: "#2a1180",
        },
        glow: {
          cyan: "#00e5ff",
          violet: "#9747ff",
          pink: "#ff47b3",
          amber: "#ffb347",
          emerald: "#47ffb3",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "noise": "url('/noise.svg')",
        "grid-lines":
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid": "40px 40px",
      },
      boxShadow: {
        "glow-violet": "0 0 20px rgba(151, 71, 255, 0.3)",
        "glow-cyan": "0 0 20px rgba(0, 229, 255, 0.3)",
        "glow-sm": "0 0 12px rgba(103, 65, 255, 0.25)",
        "inner-top": "inset 0 1px 0 rgba(255,255,255,0.06)",
        "card": "0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
        "streak": "streak 2s ease-in-out infinite",
        "orbit": "orbit 8s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        streak: {
          "0%, 100%": { opacity: "0.4", transform: "scaleX(0.8)" },
          "50%": { opacity: "1", transform: "scaleX(1)" },
        },
        orbit: {
          from: { transform: "rotate(0deg) translateX(20px) rotate(0deg)" },
          to: { transform: "rotate(360deg) translateX(20px) rotate(-360deg)" },
        },
      },
    },
  },
  plugins: [],
};
