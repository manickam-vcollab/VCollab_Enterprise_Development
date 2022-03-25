import SvgIcon from '@material-ui/core/SvgIcon';

function Hamburger(props:any) {
    return (
      <SvgIcon  {...props}>
  
          <path d="M1 9.72656H25" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          <path d="M1 1H25" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          <path d="M1 18.4551H25" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      </SvgIcon>
    );
  }

export default function HamburgerIcon() {

  return (
      <Hamburger viewBox="0 0 26 19"/>
  );
}