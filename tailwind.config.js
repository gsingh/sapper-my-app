module.exports = {
  plugins: [
    require('@tailwindcss/custom-forms'),
  ],
  variants: {
  tableLayout: ['responsive', 'hover', 'focus'],
  },

  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontFamily: {
      display: ['Gilroy', 'sans-serif'],
      body: ['Graphik', 'sans-serif'],
      '4': '4px',
    },
    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
    },
    extend: {
      colors: {
        cyan: '#9cdbff',
      },
      spacing: {
        '96': '24rem',
        '128': '32rem',
      }
    }
   
  }
  
  }