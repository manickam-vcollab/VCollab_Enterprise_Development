import SvgIcon from '@material-ui/core/SvgIcon';

function Back(props:any) {
  return (
    <SvgIcon  {...props}>
     <path d="M17 7.54492H1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    <path fill="none" d="M7.54545 1L1 7.54545L7.54545 14.0909" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}

export default function BackButton() {

  return (
      <Back viewBox="0 0 18 15"/>
  );
}
