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
        glass: {
          surface: "rgba(255, 255, 255, 0.07)",
          surfaceActive: "rgba(255, 255, 255, 0.12)",
          border: "rgba(255, 255, 255, 0.14)",
          hover: "rgba(255, 255, 255, 0.18)",
        },
      },
      backdropBlur: {
        acrylic: "24px",
      },
    },
  },
  plugins: [],
};

export default config;