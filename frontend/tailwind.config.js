/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Quicksand', 'system-ui', 'sans-serif'],
          display: ['Poppins', 'sans-serif'],
          serif: ['Lora', 'serif'],
        },
        colors: {
          primary: {
            DEFAULT: "#15803d", // green-700 equivalente
            dark: "#166534",    // green-800 equivalente  
            light: "#16a34a",   // green-600 equivalente
            50: "#f0fdf4",      // green-50 equivalente
            100: "#dcfce7",     // green-100 equivalente
          },
          secondary: {
            DEFAULT: "#22223b", // Gris oscuro
            light: "#f7fafc",   // Gris claro
          },
          accent: "#fbbf24",    // Amarillo/acento
        },
      },
    },
    plugins: [],
  }