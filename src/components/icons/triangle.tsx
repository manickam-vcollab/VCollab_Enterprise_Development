import MuiSvgIcon from '@material-ui/core/SvgIcon';

function Triangle(props:any) {
  return (
    <MuiSvgIcon  {...props}>
      <svg width="30" height="30"  fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 10.118L20.191 20.5H9.80902L15 10.118Z" fill="currentColor" stroke="currentColor"/>
      </svg>
    </MuiSvgIcon>
  );
}

export default function triangleIcon() {

  return (
      <Triangle viewBox="0 0 30 30"/>
  );
}