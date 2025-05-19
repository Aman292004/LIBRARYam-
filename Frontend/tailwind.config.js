/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#002366',
        'navText&i': '#FFFFFF',
        'bgmaioffwhite': '#F5F5F5',
        'sbgmainlightgray': '#E9ECEF',
        'textcgray': '#333333',
        'muted textsoftgray': '#6C757D',
        'PbtnGold': '#FFD700',
        'pbtntextblue': '#002366',
        'Sbtnt': '#FFFFFF',
        'Sbtntext': '#002366',
        
      },
      fontFamily: {
        'primary': ["Playfair Display", "serif"],
        'mon': ["Montserrat", "serif"],
        'secondary': ["Nunito Sans", "serif"],
        'subheading': ["Lora", "serif"],
        'bodyText': ["Roboto", "serif"],
        'Accent': ["Great Vibes", "serif"]

      }
    },
  },
  plugins: [require('daisyui')],
}