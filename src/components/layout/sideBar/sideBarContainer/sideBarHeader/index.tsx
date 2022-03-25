import styles from './style';
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'

const HeaderFirstRow = (props:any) => {
    const classes = styles();
    return(
      <Grid container className={classes.header} alignItems='center'>
      {props.leftIcon ?
          <Grid item className = {classes.leftIcon}>
              {props.leftIcon}
          </Grid>
          :null
      }
      {props.content ?
      <Grid item className = {classes.content}>
              {props.content}
      </Grid>
          :null
      }
      {props.rightIcon ?
      <Grid item className={clsx(classes.rightContent,classes.rightIcon)}>
          {props.rightIcon}
      </Grid>
      :null
      }
     </Grid>
    )

}

const HeaderSecondRow = (props:any) => {
    const classes = styles();
    return(
  <Grid container alignItems='center' className={classes.action}>
  { props.action ?
        <Grid item style={{width:'90%', margin:'auto'}}>
            {props.action}
        </Grid>
        :null
  }
  </Grid>
  )
}


export default function SideBarHeader(props : any) {

  return (
      <Grid ref={props.targetRef} container direction='column' >
          <Grid item xs={12} alignItems='center' >
          <HeaderFirstRow {...props}/>
          </Grid>
          <Grid item xs={12}>
          <HeaderSecondRow {...props}/>
          </Grid>
      </Grid>
  );
}
