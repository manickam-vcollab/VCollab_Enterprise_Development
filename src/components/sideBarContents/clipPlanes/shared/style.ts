import { makeStyles } from '@material-ui/core/styles';
// import { colors } from '../../../config/index';

export default makeStyles((theme) => (
  {

  circularSlider: {
    position:"absolute",
    left:"20%",
    right:"20%",
    top:"10%",
    zIndex: 10,
    
  },

  cicularSliderInput: {
    color:theme.palette.text.primary,
    background:"none",
    border: "1px solid",
    borderColor: theme.palette.text.primary ,
    marginTop:"-60%",
    textAlign:"center",
    width:"80%",
    fontSize:"14px",
    zIndex: 10,
    size: 4,
  },

  circularSliderButton:{
    color:theme.palette.text.primary,
    fontSize:"10px",
  },

  translateButton:{
    // marginLeft:"10px",
    // marginBottom:"-5px",
    color:theme.palette.text.primary,
    fontSize:"20px",
  },

inputTranslate :{
  color:theme.palette.text.primary,
   background:"none",
  border: "1px solid",
  borderColor: theme.palette.text.primary ,
  textAlign:"center",
  width:"70%",
  fontSize:"16px",
  zIndex: 10,
  size: 4,
  
  '&[type=number]': {
    '-moz-appearance': 'textfield',
  },
  '&::-webkit-outer-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
  '&::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
},

disabled: {
background: theme.palette.text.disabled,
},

disabledButton:{
color: theme.palette.text.disabled,
opacity:0.6,
},

  caption: {
    color: theme.palette.text.primary,
    opacity: 0.7,
  },

  translate:{
    color:theme.palette.text.primary,
    marginLeft:"10px",
    marginRight:"20px",
  },

  rotate: {
    color: theme.palette.text.secondary,
    secondaryColor: "red",
    
  },

}));
