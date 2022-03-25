import { makeStyles } from '@material-ui/core/styles';
import { topbarHeight, drawerWidth, colors, leftbarWidth } from '../config';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
  }, 
  content: {
    flexGrow : 1,
    marginTop : 0,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeIn,
      duration: 0,
    }),
    marginLeft : 0,
    width : '100%',
    [theme.breakpoints.up('md')]: {
      marginLeft : -drawerWidth,
    }  
  },
  contentWithSideBar : {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: 250,
    }),
    [theme.breakpoints.up('md')]: {
     //width: `calc(100% - ${drawerWidth}px)`,
     marginLeft: 0,
    }
  },
  contentWithTopBar: {
    marginTop : topbarHeight,
  },
  viewerContainer: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    zIndex: 1000,
    // background: `linear-gradient(${colors.vcollabColor}, white)`,
    position: 'relative',
    //backgroundColor : 'blue'
  },
  viewerContainerWithTopBar: {
    height: `calc(100vh - ${topbarHeight}px)`,
  },
}));
