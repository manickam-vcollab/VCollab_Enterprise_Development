import SvgIcon from '@material-ui/core/SvgIcon';

export default function Pin(props:any) {
  return (
    <SvgIcon viewBox='0 0 12 20' { ...props}>
      <path d="M10 10V2H11V0H1V2H2V10L0 12V14H5.2V20H6.8V14H12V12L10 10ZM2.8 12L4 10.8V2H8V10.8L9.2 12H2.8Z" fill="currentColor"/>
    </SvgIcon>
  );
}