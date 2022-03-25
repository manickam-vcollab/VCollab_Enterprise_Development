import SvgIcon from '@material-ui/core/SvgIcon';

function FullScreenClose(props:any) {
  return (
    <SvgIcon  {...props}>
        <path d="M25 7L19 7V1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1 19H7L7 25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 25V19H25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 1L7 7L1 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}

export default function FullScreenCloseIcon() {

  return (
      <FullScreenClose viewBox="0 0 26 26"/>
  );
}