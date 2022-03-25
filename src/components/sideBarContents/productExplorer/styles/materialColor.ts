import { makeStyles } from '@material-ui/core/styles';
//import { colors } from '../../../config/index';

export default makeStyles((theme) => ({
    backIcon : {
        width : 48,
        height: 48,
    },
    heading: {
        justifySelf: 'start',
        width: '100%',
       // color:colors.secondaryText,
      },

    
      active : {
        border:"2px solid",
        borderColor:theme.palette.text.primary,
        borderRadius:"5px"
    },

    scrollBar: {
        position:"relative",
        overflowY: "auto",
        overflowX:"hidden",
        // margin: 0,
        // padding: 0,
        listStyle: "none",
        height: "89%",
        width:"100%",
        '&::-webkit-scrollbar': {
          width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
          outline: '1px solid slategrey'
        },
      },

}));