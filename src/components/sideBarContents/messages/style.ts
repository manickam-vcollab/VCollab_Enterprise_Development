import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    backIcon : {
        width : 48,
        height: 48,
    },
    heading: {
        justifySelf: 'start',
        width: '100%',
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

      card:{
        marginTop:"20px",
        paddingBottom:"15px",
        borderBottom: "1px solid "
      },

      cardTopPadding:{
        paddingTop:"10px",
      },

      simpleIcon:{
        marginLeft:"34px",
        marginRight:"15px",
        marginTop:"-7px",
      },

      transferIcon:{
        marginLeft:"20px",
        marginRight:"10px"
      },

      buttonStyle:{
        width:"20%",
        fontSize:"12px",
      },

      simpleCard:{
        marginLeft:"15px",
      },

      timeDisplay:{
        marginLeft:"23px"
      },
      transferCard: {
        marginLeft:"0px",
      },
      notification:{
        marginLeft:"15px"
      },

      arrowButton:{
        marginTop:"-5px"
      }

}));
