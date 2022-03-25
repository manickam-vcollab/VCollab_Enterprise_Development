import { PaletteType } from '@material-ui/core';
import appTheme from './index';

const darMode = {
  ...appTheme,
  palette: {
    type: 'dark' as PaletteType,
    primary: {
      main: '#4882c9',
    },
    action: {
      selected: "#4882c9"
    },
    scrollbar:{
      main:"white"
    }

  },
} 

export default darMode; 



