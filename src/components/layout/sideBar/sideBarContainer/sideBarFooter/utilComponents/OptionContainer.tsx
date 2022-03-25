import React from 'react'
import Grid from '@material-ui/core/Grid'
function OptionContainer(props:any) {
    return (
        <Grid container justify="space-around">
            {props.children}
        </Grid>
    )
}

export default OptionContainer
