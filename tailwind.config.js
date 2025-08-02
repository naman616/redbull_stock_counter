/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sf': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'redbull': {
          'normal': '#1e3a8a',      // Very Strong Dark Blue
          'sugarfree': '#2563eb',   // Very Strong Light Blue
          'watermelon': '#b91c1c',  // Very Strong Red
          'tropical': '#d97706',    // Very Strong Yellow
          'curuba': '#047857',      // Very Strong Green
        },
        'apple': {
          'gray': '#f5f5f7',
          'dark': '#1d1d1f',
        }
      },
      boxShadow: {
        'apple': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'apple-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
} 