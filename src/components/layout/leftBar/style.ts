import { makeStyles } from '@material-ui/core/styles';
import { topbarHeight, drawerWidth, leftbarWidth } from '../../../config';

export default makeStyles((theme) => ({
    root: {
        width: leftbarWidth,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
    }
}));
