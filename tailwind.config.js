/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'gc-primary': '#141718',
        'gc-secondary': '#0084ff',
        'gc-gray': '#3f4347',
        'gc-gray-light': '#3f4347',
      },
      fontFamily: {
        'open-sans': ['"Open Sans"', 'sans-serif'],
        'poppins': ['"Poppins"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}