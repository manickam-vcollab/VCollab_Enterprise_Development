import styles from './style';
import Paper from '@material-ui/core/Paper';
export default function SideBarFooter(props : any) {

  const classes = styles();

  return (
      <>
      
      <Paper ref = { props.targetRef } className = { classes.sideBarFooter } square variant="outlined">
        { props.children }
      </Paper>
      </>
  );
}
