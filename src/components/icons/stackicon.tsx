import SvgIcon from '@material-ui/core/SvgIcon';

function Stack(props:any) {
  return (
    <SvgIcon  {...props}>
     <path d="M3 16.5L12 21.75L21 16.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
     <path d="M3 12L12 17.25L21 12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
     <path d="M3 7.5L12 12.75L21 7.5L12 2.25L3 7.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
 
    </SvgIcon>
  );
}

export default function StackIcon() {

  return (
      <Stack viewBox="0 0 24 24"/>
  );
}