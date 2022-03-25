import { makeStyles } from '@material-ui/core/styles';
//import { Palette } from '@material-ui/icons';
//import { colors } from '../../../config';

export default makeStyles((theme) => ({
    btn:{
      '&:hover': {
        background: theme.palette.action.hover
      }
    }
}));