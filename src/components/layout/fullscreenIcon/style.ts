import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    divFullscreen :{
        position : 'fixed',
        top : 0,
        right : 0,
        width: 48,
        height:48,
        backgroundColor:theme.palette.background.default,
        borderRadius:25,
        color:theme.palette.text.primary,
        zIndex:5000
     }
}));
