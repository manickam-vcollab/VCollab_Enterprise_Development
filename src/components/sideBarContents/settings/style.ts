import { makeStyles } from '@material-ui/core/styles';

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
    switchContainer:{
        marginTop:10,
        marginLeft:10
    },
    dialogBox: {
        color: theme.palette.text.primary,
        fontSize: "50px",
      },
    snackBar: {
    background: theme.palette.background.paper,
    color: theme.palette.error.light,
    opacity:"50%",
    marginTop:'40px',
    },

}));
