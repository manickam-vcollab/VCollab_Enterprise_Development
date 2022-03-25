import { makeStyles } from '@material-ui/core/styles';
import { topbarHeight, drawerWidth, leftbarWidth } from '../../../config';

export default makeStyles((theme) => ({
    appBar : {
        boxShadow: 'none',
        width: `calc(100% - ${leftbarWidth}px)`,
        marginLeft: 0,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeIn,
            duration: 0,
          }),
        backgroundColor:theme.palette.background.default,
    },
    appBarwithSideBar : {
        [theme.breakpoints.up('md')]: {
          width: `calc(100% - ${drawerWidth + leftbarWidth}px)`,
          //marginLeft: drawerWidth,
        },
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: 250,
        }),
    },
    toolBar : {
        minHeight: topbarHeight,
        height: topbarHeight,
        boxShadow: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '0px',
        paddingRight: '0px',
    },
    toolBarLeftContent : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    toolBarRightContent : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftTitle : {
        display: 'block',
        padding : 10,
        color: theme.palette.text.primary,
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    leftTitleHidden : {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    hamburgerIcon : {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    hamburgerIconHidden: {
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
    },
    divIcon : {
        textAlign: 'center'
    },
}));
