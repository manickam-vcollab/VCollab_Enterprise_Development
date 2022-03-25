import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => (
    {

    inputEquation :{
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

    scrollBar: {
      position:"relative",
      overflowY: "auto",
      overflowX:"hidden",
      // margin: 0,
      // padding: 0,
      listStyle: "none",
      height: "96%",
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

    cameraEditPageContainer:{
      marginTop:"20px", 
      marginLeft:"10px",
    },

    cameraEditCategoryContainer:{
      marginBottom:"40px"
    },

    cameraEditCategoryHeader:{
      textAlign:"left",
      marginBottom:"10px"
    },

    colorPicker:{
      zIndex: 10,
  },

  buttonComponent:{
    color:theme.palette.text.primary,
    fontSize:"20px", 
},

buttonContainer:{
  marginLeft:"-225px", 
  marginBottom:"-20px",
  marginTop:"5px",
},

saveResetButtonContainer:{
  marginBottom:"5px", 
  marginTop:"50px", 
  marginLeft:"75px", 
  marginRight:"75px"
},


active : {
  outline:"2px solid",
  outlineColor:theme.palette.text.primary,
},

}
));