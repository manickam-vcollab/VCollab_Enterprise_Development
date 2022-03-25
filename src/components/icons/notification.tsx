import SvgIcon from '@material-ui/core/SvgIcon';

function Notification(props:any) {
  return (
    <SvgIcon  {...props}>
    <path d="M8 5V8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"/>
    <path d="M10.5981 9.5L8 8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"/>
    <path d="M11.5107 6.23242H14.0107V3.73242" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"/>
    <path d="M11.8891 11.8891C11.1199 12.6583 10.1399 13.1821 9.073 13.3943C8.0061 13.6065 6.90023 13.4976 5.89524 13.0813C4.89025 12.6651 4.03126 11.9601 3.42692 11.0556C2.82257 10.1512 2.5 9.0878 2.5 8C2.5 6.91221 2.82257 5.84884 3.42692 4.94437C4.03126 4.0399 4.89025 3.33495 5.89524 2.91867C6.90023 2.50238 8.0061 2.39346 9.073 2.60568C10.1399 2.8179 11.1199 3.34173 11.8891 4.11091L14.0104 6.23224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"/>
    </SvgIcon> 
  );
}

export default function NotificationIcon() {

  return (
      <Notification viewBox="0 0 16 16"/>
  );
}