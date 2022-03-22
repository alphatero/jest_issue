module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
  theme: {
    themeVariants: ["kemp", "hr", "lucent"],
    extend: {
      colors: {
        kemp: {
          DEFAULT: "#FFC700",
          dark: "#FFAE00",
          light: "#fdedbf",
        },
        lucent: {
          DEFAULT: "#F4B839",
          dark: "#F09400",
          light: "#fbe3b0",
        },
        highright: {
          DEFAULT: "#497578",
          dark: "#37585a",
          light: "#b6c8c9",
        },
        orange: "#DC771A",
      },
      backgroundImage: {
        "logo-kemp": "url('./src/assets/KempLogo.png')",
        "logo-lucent": "url('./src/assets/LOGO_dark.png')",
        "logo-lucent-md": "url('./src/assets/LOGO_light.png')",
        "logo-highright": "url('./src/assets/hrLogo.png')",
      },
      boxShadow: {
        dark: "0 2px 2px 0 rgba(0, 0, 0, .7)",
        solid: "inset 0px -4px 0px rgba(0, 0, 0, 0.1)",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(-100px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeOut: {
          "0%": {
            opacity: "1",
            transform: "translateY(0)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(-100px)",
          },
        },
        fadeRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(-100px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0px)",
          },
        },
        fadeLeft: {
          "0%": {
            opacity: "1",
            transform: "translateX(0px)",
          },
          "100%": {
            opacity: "0",
            transform: "translateX(-100px)",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-out",
        fadeOut: "fadeOut 0.4s ease-out",
        fadeRight: "fadeRight 0.3s ease-out",
        fadeLeft: "fadeLeft 0.3s ease-out",
      },
    },
    variants: {
      extend: {},
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require("tailwindcss-multi-theme")],
};
