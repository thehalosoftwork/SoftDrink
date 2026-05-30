/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        // Extra-small breakpoint so the tiniest phones (e.g. iPhone SE 1st gen
        // at 320px) get their own tuned sizes instead of sharing the base
        // styles with mid-size phones up to the default `sm` (640px).
        xs: "375px",
      },
      fontFamily: {
        sans: ["var(--font-alpino)", "sans-serif"],
      },
      keyframes: {
        "slide-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "slide-left": "slide-left 3s linear infinite",
        "spin-slow": "spin 6s linear infinite",
      },
    },
  },
};
