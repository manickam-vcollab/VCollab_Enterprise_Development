import SvgIcon from '@material-ui/core/SvgIcon';

function Views(props:any) {
  return (
    <SvgIcon  {...props}>
    <path d="M18 1.5H23.5V7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.00001 23.5H1.5V18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23.5 18V23.5H18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.5 7V1.5H7.00001" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.7222 12.5C18.7222 15.9365 15.9364 18.7222 12.5 18.7222C9.06356 18.7222 6.27777 15.9365 6.27777 12.5C6.27777 9.06357 9.06356 6.27779 12.5 6.27779C15.9364 6.27779 18.7222 9.06357 18.7222 12.5Z" fill="none" stroke="currentColor" strokeWidth="2"/>
  
    </SvgIcon>
  );
}

export default function ViewsIcon() {

  return (
      <Views viewBox="0 0 25 25"/>
  );
}