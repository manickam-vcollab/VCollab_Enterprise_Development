import React from 'react'
import Grid from '@material-ui/core/Grid'
import MuiButton from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import {makeStyles, createStyles} from '@material-ui/core/styles'

interface IDeleteProps {

   onClickConfirm:()=> void
   onClickCancel:()=> void 

}

const useStyles = makeStyles(theme => createStyles({

root:{
	
	height:"100px",
}
}))

function Delete(props:IDeleteProps) {

    const classes = useStyles();
	
    return (
         <Grid container  className={classes.root}>

            <Grid item xs={12}>
          
              <Typography variant="body1" gutterBottom >Are you sure to delete ?</Typography>

            </Grid>

		
				<Grid item xs={6}>
				
				   <div><MuiButton  variant="contained" color="primary" onClick={()=> props.onClickConfirm()}>confirm</MuiButton></div>
							
				</Grid>
				
				<Grid item xs={6}>
				
				   <div><MuiButton  variant="contained" color="primary" onClick={()=> props.onClickCancel()}>cancel</MuiButton></div>
							
				</Grid>

        </Grid>

    )
}

export default Delete


 