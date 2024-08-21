import type { Config } from "tailwindcss";
import daisyui from "daisyui"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes : {
        refine : {
          "0%": {
            bottom: "0%",
          },
          "25%": {
            bottom: "25%",
          },
          "50%": {
            bottom: "50%",
          },
          "75%": {
            bottom: "75%",
          },
         
        }
      },
      animation: {
        "refine-slide": "refine 2s ease-in",
      },
      dropShadow : {
        "blue-shadow" : "0 3px 3px rgba(31, 180, 220, 1)"
      },
      boxShadow : {
        "background" : " 0 0 250px 120px #1A8DDD"
      }
    },
  },
  plugins: [
    daisyui
  ],
};
export default config;
