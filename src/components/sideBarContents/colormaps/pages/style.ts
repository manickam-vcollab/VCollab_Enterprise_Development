import { makeStyles } from '@material-ui/core/styles';
// import { colors } from '../../../config/index';

export default makeStyles((theme) => (
  {
  scrollBar: {
    position:"relative",
    overflowY: "auto",
    overflowX:"hidden",
    // margin: 0,
    // padding: 0,
    listStyle: "none",
    height: "99%",
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

  scrollBarValueSetting: {
    position:"relative",
    overflowY: "auto",
    overflowX:"hidden",
    // margin: 0,
    // padding: 0,
    listStyle: "none",
    height: "60%",
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

  listBlock : {
    marginLeft:"5px", 
    marginTop:"15px",
  },

  active : {
    outline:"2px solid",
    outlineColor:theme.palette.text.primary,
  },
  
  colorPicker:{
    zIndex: 10,
  },

  invalid: {
    color: theme.palette.error.main
  },

  textBox: {
    width:"100%",border: "0.5px solid",
 },

 saveResetButtonContainer:{
  marginBottom:"5px", 
  marginTop:"50px", 
  marginLeft:"65px", 
  marginRight:"75px"
},

legendSelection: {
  marginTop:"30px",
  marginLeft:"10px",
  width:"90%"
},


}));
