/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Shopify color palette
        primary: {
          50: '#F4F6F8',
          100: '#EDF0F5',
          200: '#DBE0EB',
          300: '#C4CCD6',
          400: '#95A7B7',
          500: '#5C6AC4', // Primary blue
          600: '#5261AC',
          700: '#3F4DA1',
          800: '#2C3990',
          900: '#202E78',
        },
        success: {
          50: '#F3F9F3',
          100: '#E7F3E7',
          200: '#D3E7D3',
          300: '#AECFAE',
          400: '#8AB68A',
          500: '#50B83C', // Success green
          600: '#47A534',
          700: '#3D932D',
          800: '#348026',
          900: '#2A6D1F',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F4F6F8',
          200: '#E4E7EB',
          300: '#CBD2D9',
          400: '#9AA5B1',
          500: '#7B8794',
          600: '#616E7C',
          700: '#52606D',
          800: '#3E4C59',
          900: '#323F4B',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'SF Pro Display',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'SF Mono',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      spacing: {
        // Shopify uses 4px base unit
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
      },
      borderRadius: {
        sm: '3px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
      },
    },
  },
  plugins: [],
};