const defaultTheme = require("tailwindcss/defaultTheme");
const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            screens: {
                mobile: { max: "639px" }, // => @media (max-width: 639px) { ... }
                tablet: { max: "1023px" }, // => @media (max-width: 1023px) { ... }
                laptop: { max: "1279px" }, // => @media (max-width: 1279px) { ... }
                desktop: { min: "1280px" }, // => @media (min-width: 1280px) { ... }
            },
            colors: {
                primary: "#7e4efb", // Add your primary color
                primaryHover: "#6838ee",
                secondary: "#E8E3E7", // Add your secondary color
                textColor: "#E8E3E7",
            },
        },
    },

    plugins: [require("@tailwindcss/forms")],
});
