
import SvgIcon from '@material-ui/core/SvgIcon';

function GridView(props:any) {
  return (
    <SvgIcon  {...props}>
        <path d="M13.4 7H7V13.4H13.4V7Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <path d="M22.9999 7H16.5999V13.4H22.9999V7Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <path d="M13.4 16.5996H7V22.9996H13.4V16.5996Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <path d="M22.9999 16.5996H16.5999V22.9996H22.9999V16.5996Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </SvgIcon>
  );
}

export default function GridViewIcon() {

  return (
      <GridView viewBox="0 0 30 30" fill="none"/>
  );
}