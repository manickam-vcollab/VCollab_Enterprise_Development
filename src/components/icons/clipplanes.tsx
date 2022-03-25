import SvgIcon from '@material-ui/core/SvgIcon';

function Clip(props:any) {
  return (
    <SvgIcon  {...props}>
<path d="M4.5707 4.57141H1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.57153 1V17.4287H21.0001" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.4287 14.5715V4.57141H7.42798" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.4287 21.0001V17.4287" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

    </SvgIcon>
  );
}

export default function ClipIcon() {

  return (
      <Clip viewBox="0 0 22 22"/>
  );
}