import SvgIcon from '@material-ui/core/SvgIcon';

function CreateNewFolder(props:any) {
  return (
    <SvgIcon  {...props}>
        <path d="M15.5 3.52632V12.4386C15.5 12.5875 15.4415 12.7303 15.3373 12.8356C15.2331 12.9409 15.0918 13 14.9444 13H1.125C0.95924 13 0.800269 12.9335 0.683058 12.815C0.565848 12.6966 0.5 12.5359 0.5 12.3684V1.63158C0.5 1.46407 0.565848 1.30343 0.683058 1.18499C0.800269 1.06654 0.95924 1 1.125 1H5.29167C5.4269 1 5.55848 1.04432 5.66667 1.12632L7.83333 2.76842C7.94152 2.85041 8.0731 2.89474 8.20833 2.89474H14.875C15.0408 2.89474 15.1997 2.96128 15.3169 3.07972C15.4342 3.19817 15.5 3.35881 15.5 3.52632Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <path d="M6.125 7.94727H9.875" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 6.05273V9.84221" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
    </SvgIcon>
  );
}

export default function CreateNewFolderIcon() {

  return (
      <CreateNewFolder viewBox="0 0 16 14" fill="none"/>
  );
}

