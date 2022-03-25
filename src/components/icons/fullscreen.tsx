import SvgIcon from '@material-ui/core/SvgIcon';

function FullScreen(props:any) {
  return (
    <SvgIcon  {...props}>
        <path d="M19 1H25V7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 25H1V19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M25 19V25H19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1 7V1H7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}

export default function FullscreenIcon() {

  return (
      <FullScreen viewBox="0 0 26 26"/>
  );
}