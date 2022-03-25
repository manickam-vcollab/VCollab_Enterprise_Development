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

  pageCaption:{
    textAlign:"left",
    marginBottom:"15px",
    marginTop:"10px",
  },

  editPageFooter:{
    marginTop:"20px", 
    marginBottom:"20px",
  },

  saveButton:{
    backgroundColor:"#5958FF",
    width:"30%", 
    fontSize:"11px" , 
    marginRight:"5px"
  },

  resetButton:{
    width:"30%",
    fontSize:"11px"
  }


}));
