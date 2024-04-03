/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js,ts,css}", "./*.html"],
  theme: {
    extend: {
      colors: {
        primaryColor: "hsl(var(--color-primary))",
        secondaryColor: "hsl(var(--color-secondary))",
        errorColor: "hsl(var(--color-error))",
        whiteColor: "hsl(var(--color-white))",
        offWhiteColor: "hsl(var(--color-off-white))",
        lightGreyColor: "hsl(var(--color-light-grey))",
        smokeyGreyColor: "hsl(var(--color-smokey-grey))",
      },
      fontSize: {
        primaryFontSize: "32px",
      },
      fontFamily: {
        primaryFontFamily: ["Poppins", "Arial", "sans-serif"],
      },
      fontWeight: {
        "400i": "400",
        700: "700",
        "800i": "800",
      },
      borderRadius: {
        big: "150px",
      },
      spacing: {
        0.5: "0.5px",
        0.6: "0.6px",
        0.7: "0.7px",
        0.8: "0.8px",
        largeContainerSize: "650px",
        buttonWidth: "80px",
        buttonHeight: "70px",
        fullScreenWidthWithSpace: "95vw",
      },
      screens: {
        lg: "850px",
        sm: "600px",
        xs: "450px",
        "2xs": "361px",
      },
    },
  },
};
