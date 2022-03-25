import IconButton from '@material-ui/core/IconButton';
import styles from './style';

export default function Icon(props : any) {

  const classes = styles();

  return (
    <IconButton      
      color='inherit'
      aria-label='open drawer'
      onClick={props.onClick}
      edge={ props.edge !== undefined ? props.edge : 'start' }
      {...props}
      className = {classes.btn}
      // className={clsx(classes.menuButton, open && classes.hide)}
    >
      <img src={props.src} alt={props.alt} />
    </IconButton>
  );
}
