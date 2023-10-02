/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
        
primary: "#3abff8",
        
secondary: "#36d399",
        
accent: "#1dcdbc",
        
neutral: "#2b3440",
        
base_100: "#ffffff",
            
warning: "#fbbd23",
        
error: "#f87272",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

}

