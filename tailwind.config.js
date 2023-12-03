/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT'
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bornkey: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        }, 
        deathkey: {
          '0%':{ transform: 'translateX(0px)'},
          '50%':{ transform: 'translateX(-200px) scale(1)'},
          '100%':{ transform: 'translateX(-200px) scale(0)' },
        },
        blinkkey: {
          '0%': {opacity : '1'},
          '50%': {opacity : '0'}, 
          '100%': {opacity : '1'}
        },
        
      },
      animation: {
        'born': 'bornkey 1s ease 1',
        'death' : 'deathkey 1s ease 1',
        'blink' : 'blinkkey 1s ease infinite',
      },

    },
  },
  plugins: [],
});
