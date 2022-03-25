import { makeStyles } from '@material-ui/core/styles';
import { sideBarHeaderHeight } from '../../../../../config';

export default makeStyles((theme) => ({
    header: {
        height: sideBarHeaderHeight,
    },
    rightContent: {
        marginLeft: 'auto !important'
    },
    leftIcon : {
        width : 48,
        height : 48
    },
    rightIcon : {
        width : 48,
        height : 48
    },
    content : {
        paddingLeft: '1rem'
    },
    action: {
        
    }
}));