/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6", // Bright Blue
        secondary: "#10b981", // Emerald Green
        dark: "#1f2937",
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
      }
    },
  },
  plugins: [],
}