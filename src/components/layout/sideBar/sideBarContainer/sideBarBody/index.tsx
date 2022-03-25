import styles from './style';

export default function SideBarBody(props : any) {

  const classes = styles();
  return (
      <div className = { classes.sideBarBody } style={{ height: `calc(100vh - ${props.height}px)`}}> 
        { props.children }
      </div>
  );
}
