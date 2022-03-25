import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
//import { colors } from '../../../config/index';

const useStyles = makeStyles((theme) => ({
    group: {

    },
    heading: {
        justifySelf: 'start',
        width: '100%',
        marginBottom: '2px'
      }
}));


function Title(props:{text:string, group?:string}) {
    const classes = useStyles();
    return (
        <Grid container spacing={0} direction='column' alignContent='center'>
        {/* <Grid item>
        <Typography classes={{caption: classes.group}} variant='caption' noWrap>
          {props.group}
        </Typography>
        </Grid> */}
        <Grid item>
        <Typography className={classes.heading} variant='h1' noWrap>
          {props.text}
        </Typography>
        </Grid>
        </Grid>
    )
}

export default Title
