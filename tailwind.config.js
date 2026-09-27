/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Modern Civic-Tech Palette
        civic: {
          bg: '#F4F8FC',
          card: '#FFFFFF',
          primary: '#3157A4',
          'primary-hover': '#264585',
          'primary-light': '#EBF1FA',
          'primary-subtle': '#F0F5FD',
          cta: '#FACC15', // Lemon CTA
          'cta-hover': '#EAB308',
          'cta-light': '#FEF9C3',
          'cta-text': '#172B4D',
          success: '#22A982',
          'success-hover': '#1B8768',
          'success-light': '#E8F7F2',
          text: '#172B4D',
          muted: '#718096',
          border: '#DCE6F0',
        },
        saffron: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#facc15', // Lemon CTA
          600: '#eab308',
          700: '#ca8a04',
          800: '#a16207',
          900: '#713f12',
        },
        lemon: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#facc15',
          600: '#eab308',
          700: '#ca8a04',
          800: '#a16207',
          900: '#713f12',
        },
        chakra: {
          50: '#f0f5fd',
          100: '#ebf1fa',
          200: '#dce6f0',
          300: '#b8cde6',
          400: '#6d92cc',
          500: '#3157a4', // Primary
          600: '#2a4a8c',
          700: '#223c72',
          800: '#1c315c',
          900: '#172b4d', // Text
          950: '#0f1d35',
        },
        tirangaGreen: {
          50: '#e8f7f2',
          100: '#d1efe5',
          200: '#a3dfcc',
          300: '#64c7a9',
          400: '#38b792',
          500: '#22a982', // Success
          600: '#1b8768',
          700: '#176c54',
          800: '#155644',
          900: '#134739',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(23, 43, 77, 0.04), 0 1px 2px 0 rgba(23, 43, 77, 0.02)',
        'card': '0 2px 8px -1px rgba(23, 43, 77, 0.05), 0 1px 3px -1px rgba(23, 43, 77, 0.03)',
        'card-hover': '0 8px 20px -3px rgba(23, 43, 77, 0.08), 0 3px 6px -2px rgba(23, 43, 77, 0.04)',
      },
    },
  },
  plugins: [],
}
