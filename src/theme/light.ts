import { PaletteType } from '@material-ui/core';
import appTheme from './index';

const lightMode = {
    ...appTheme,
    palette: {
      type: 'light' as PaletteType,
      primary: {
        main: '#4882c9',
      },
      action: {
        selected: "#4882c9"
      },
      scrollbar:{
        main:"#808080"
      }
    },
  } 

 export default lightMode;