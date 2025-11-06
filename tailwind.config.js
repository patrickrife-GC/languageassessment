/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'convey-blue': '#0066CC',
        'convey-dark': '#1a1a1a',
        'convey-gray': '#f5f5f5',
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
}
