import { responsiveFontSizes, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider} from '@material-ui/core/styles';

//Custom theme 
import darkMode from '../../../theme/dark';
import lightMode from  '../../../theme/light';
import lightModePlus from  '../../../theme/lightplus';

// Redux Selector
import {  selectActiveTheme } from '../../../store/sideBar/settings';
import { useAppSelector } from '../../../store/storeHooks';


//Enabling darkmode and light mode
export default function CustomThemeProvider(props : any) {

  const getTheme=(id:string)=>{

          switch(id) {

            case '1' :

              return darkMode

            case '2' :
              
              return lightMode

            case '3' :
              
              return lightModePlus

             default :
             
              return darkMode

          }

  }

   const activeThemeId    = useAppSelector(selectActiveTheme);
   const selectedTheme    = createMuiTheme( getTheme(activeThemeId) );
   const responsiveTheme  = responsiveFontSizes(selectedTheme);



  return (
      <ThemeProvider theme={ responsiveTheme }> 
        { props.children }
      </ThemeProvider>
  )
}