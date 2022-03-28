export const appTheme = {
  overrides: {
    MuiAccordion: {
      root: {
        boxShadow: 'none',
        '&:before': {
          backgroundColor: 'none'
        }
      }
    },

    // MuiTabs: {
    //   indicator: {
    //     backgroundColor: 'green'
    //   }
    // },
  },

  palette: {
    type: 'dark',
  },
  typography: {
    fontFamily: ['Montserrat', 'san-serif'].join(','),
    h4: {
      fontWeight: 300,
      fontSize: 20,
    },
    h1: {
      fontWeight: 600,
      fontSize: '1.15rem',
    },
    h2: {
      fontWeight: 300,
      fontSize: 18,
    },
    h3: {
      fontWeight: 400,
      fontSize: 13,
    },

    h5: {
      fontWeight: 400,
      fontSize: 10,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
};

export default appTheme;


