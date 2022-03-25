import {createStyles, makeStyles} from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => (
    createStyles({
        actionShow: {
            color: theme.palette.text.primary
        },
        actionHide: {
            color: theme.palette.text.disabled
        },
        hightlight: {
            padding: theme.spacing(0.5),
            background: theme.palette.type === 'dark' ? theme.palette.warning.dark : theme.palette.warning.light,
        },
        hideText: {
            background: theme.palette.background.default,
            [theme.breakpoints.down("sm")]: {
              backgroundColor: theme.palette.background.default,
            },
        },

        selectedHideText:{
            background: theme.palette.primary.main
        }
    })
));