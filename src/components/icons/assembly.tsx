import SvgIcon from '@material-ui/core/SvgIcon';

export default function Assembly(props:any) {
  return (
    <SvgIcon viewBox='0 0 18 18' { ...props}>
      <path stroke="none" d="M9 9.9H4.5V14.4H9V16.2H2.7V7.2H4.5V8.1H9V9.9ZM5.4 1.8V3.6H1.8V1.8H5.4ZM7.2 0H0V5.4H7.2V0ZM16.2 8.1V9.9H12.6V8.1H16.2ZM18 6.3H10.8V11.7H18V6.3ZM16.2 14.4V16.2H12.6V14.4H16.2ZM18 12.6H10.8V18H18V12.6Z" fill="currentColor"/>
    </SvgIcon>
  );
}