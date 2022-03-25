import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    sideBarFooter : {
        position: 'absolute',
        background:'transparent',
        left: 0,
        bottom: 0,
        textAlign: 'center',
        height: 'auto',
        width : '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        boxShadow: theme.shadows[20]
    }
}));