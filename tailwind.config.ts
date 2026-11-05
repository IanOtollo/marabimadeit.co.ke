import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: "hsl(var(--accent))",
        danger: "hsl(var(--danger))",
        border: "hsl(var(--border))",
      },
      keyframes: {
        wiggle: { "0%,100%": { transform: "translateX(0) rotate(0)" }, "25%": { transform: "translateX(-3px) rotate(-6deg)" }, "75%": { transform: "translateX(3px) rotate(6deg)" } },
      },
      borderRadius: { xl: "var(--radius)", "2xl": "calc(var(--radius) + 0.5rem)" },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
