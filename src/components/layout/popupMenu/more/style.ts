import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

    menuItem : {
        '&:hover': {
            background: theme.palette.action.hover,
        },
        color:theme.palette.text.primary,
    },

    listItem:{
        color: theme.palette.text.primary, 
        flex: 1, 
        minWidth: "148px", 
        fontSize:"18px",
        marginLeft: "5px",
    },

    listItemSize: {
        color: theme.palette.text.primary,
        fontSize:"12px", 
        textDecoration: "underline",
    },

    popper:
    {
        backgroundColor: theme.palette.background.default ,
        opacity:"70%", 
        marginTop : 5,       
    },

    icon :{
        width: 26,
        height: 26,
    }
}));
