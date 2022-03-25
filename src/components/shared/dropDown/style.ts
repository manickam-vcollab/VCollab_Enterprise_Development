import { makeStyles } from '@material-ui/core/styles';
// import { ColorLensTwoTone, ControlPointDuplicateSharp } from '@material-ui/icons';
// import { colors } from '../../../config/index';

export default makeStyles((theme) => ({
  icon : {
   '&:hover': {
    background: theme.palette.action.hover,
    },
    color:theme.palette.text.primary,
  },

  iconStyle:{
    width : 16,
    height: 16,
  },

  listItem:{
    color: theme.palette.text.primary, 
    flex: 1, 
    minWidth: "148px", 
    fontSize:"18px"
  },

  listItemSize: {
    color: theme.palette.text.primary,
    fontSize:"12px", 
    textDecoration: "underline",
  },
  popper:
  {
    backgroundColor: theme.palette.background.default ,
  opacity:"70%", 
  marginTop:"58px",
  marginLeft:"83%",
  [theme.breakpoints.down(1200)]: {
    marginTop: "58px",
    marginLeft:"75%",
    boxShadow: "none",
  },
  [theme.breakpoints.down(879)]: {
    marginTop: "58px",
    marginLeft:"65%",
    boxShadow: "none",
  },
  [theme.breakpoints.down(700)]: {
    marginTop: "58px",
    marginLeft:"60%",
    boxShadow: "none",
  },
  
  [theme.breakpoints.down(602)]: {
    marginTop: "58px",
    marginLeft:"55%",
    boxShadow: "none",
},
},

snackBar:{ 
  opacity:"30%", 
  marginTop:'40px'
},
  
}));
