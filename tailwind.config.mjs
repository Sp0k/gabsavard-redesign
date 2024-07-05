import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "Source Sans Pro", ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "ol li::marker": {
              color: "#D9D9D9",
            },
            "ul li::marker": {
              color: "#D9D9D9",
            },
            pre: {
              code: {
                display: "block",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                paddingTop: theme("spacing.4"),
                paddingBottom: theme("spacing.4"),
                paddingLeft: theme("spacing.4"),
                paddingRight: theme("spacing.4"),
              },
            },
            code: {
              display: "inline", // Default display for standalone <code> tags
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animated"),
  ],
};
