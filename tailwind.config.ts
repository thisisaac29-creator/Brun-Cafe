import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          DEFAULT: "#34251F",
          dark: "#241914",
          deep: "#1C130F",
          muted: "#4A3B34",
          soft: "#5E4D45",
        },
        cream: {
          DEFAULT: "#F5F0E8",
          light: "#FFFDF8",
          dark: "#ECE5DA",
          muted: "#E4DCD0",
        },
        porcelain: "#FFFDF8",
        caramel: {
          DEFAULT: "#B77A57",
          hover: "#9C6343",
          light: "#D8A383",
          subtle: "#F2E3DA",
        },
        taupe: {
          DEFAULT: "#A99583",
          light: "#C5B6A7",
          dark: "#776454",
          border: "#D5CBC0",
        },
        olive: {
          DEFAULT: "#526153",
          dark: "#3B473C",
          light: "#6E8170",
          subtle: "#E5EBE6",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Didot", "Georgia", "serif"],
        sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        display: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
      },
      letterSpacing: {
        widest: "0.22em",
        tighter: "-0.04em",
      },
      maxWidth: {
        editorial: "1360px",
        reading: "680px",
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

