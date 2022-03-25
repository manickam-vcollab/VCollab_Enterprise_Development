import { makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme)=>({

    rootDiv:{
    marginTop:'20px'

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