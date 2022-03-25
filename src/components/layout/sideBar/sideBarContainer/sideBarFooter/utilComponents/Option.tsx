import React from 'react'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import {makeStyles, createStyles} from '@material-ui/core/styles'

interface IOptionProp {
    label: string,
    icon: any
}

const useStyles = makeStyles(theme => createStyles({
    iconText: {
        marginBottom: 2
    }
}))

function Option(props:IOptionProp) {
    const classes = useStyles();
    return (
        <Grid item xs={3}>
        <Grid container item direction='column'>
        <Grid item>
                    {props.icon}
            </Grid>
            <Grid item className={classes.iconText}>
                <Typography  variant='caption'>{props.label}</Typography>    
            </Grid>
        </Grid>
    </Grid>
    )
}

export default Option
