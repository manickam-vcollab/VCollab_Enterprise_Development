import SvgIcon from '@material-ui/core/SvgIcon';

function Fitview(props:any) {
  return (
    <SvgIcon  {...props}>
       <path d="M19.9998 1.5H24.9998V6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 21.5H1V16.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24.9998 16.5V21.5H19.9998" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 6.5V1.5H6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.9108 11.9258L12.8547 17.3516" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.7103 14.4237V9.42784C17.7103 9.35307 17.6904 9.27965 17.6527 9.21507C17.6151 9.1505 17.5609 9.09708 17.4958 9.06029L13.0628 6.55465C12.9994 6.51883 12.9278 6.5 12.855 6.5C12.7822 6.5 12.7106 6.51883 12.6473 6.55465L8.21421 9.06029C8.14912 9.09708 8.09497 9.1505 8.05729 9.21507C8.01961 9.27965 7.99976 9.35307 7.99976 9.42784V14.4237C7.99976 14.4985 8.01961 14.5719 8.05729 14.6365C8.09497 14.7011 8.14912 14.7545 8.21421 14.7913L12.6473 17.2969C12.7106 17.3327 12.7822 17.3516 12.855 17.3516C12.9278 17.3516 12.9994 17.3327 13.0628 17.2969L17.4958 14.7913C17.5609 14.7545 17.6151 14.7011 17.6527 14.6365C17.6904 14.5719 17.7103 14.4985 17.7103 14.4237V14.4237Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.6518 9.21347L12.9105 11.9247L8.05737 9.21289" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}

export default function FitviewIcon() {

  return (
      <Fitview viewBox="0 0 26 23"/>
  );
}