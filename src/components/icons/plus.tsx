
import SvgIcon from '@material-ui/core/SvgIcon';

function Plus(props:any) {
  return (
    <SvgIcon  {...props}>
        <path d="M9.23528 0.514718V17.4853" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.7206 9H0.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}

export default function AddIcon() {

  return (
      <Plus viewBox="0 0 19 18"/>
  );
}