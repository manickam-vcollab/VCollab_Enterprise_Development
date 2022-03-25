import SvgIcon from '@material-ui/core/SvgIcon';

function Branch(props:any) {
  return (
    <SvgIcon  {...props}>
      <path d="M4.81738 8.63787V9.72882C4.8174 10.5968 5.16221 11.4292 5.77595 12.0429C6.3897 12.6567 7.2221 13.0015 8.09006 13.0015L17.9084 13.0017C18.7764 13.0017 19.6088 13.3464 20.2225 13.9602C20.8363 14.5739 21.1811 15.4063 21.1811 16.2743V17.3652" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      <path d="M4.81738 17.3652L4.81738 8.63787" fill="none" stroke="currentColor"strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      <path d="M4.8182 0.998327C6.92694 0.998327 8.63641 2.7078 8.63641 4.81655C8.63641 6.92529 6.92694 8.63477 4.8182 8.63477C2.70947 8.63477 1 6.92529 1 4.81655C1 2.7078 2.70947 0.998327 4.8182 0.998327Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      <path d="M21.1819 17.3636C23.2906 17.3636 25.0001 19.073 25.0001 21.1818C25.0001 23.2905 23.2906 25 21.1819 25C19.0731 25 17.3636 23.2905 17.3636 21.1818C17.3636 19.073 19.0731 17.3636 21.1819 17.3636Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      <path d="M4.8182 17.3636C6.92694 17.3636 8.63641 19.073 8.63641 21.1818C8.63641 23.2905 6.92694 25 4.8182 25C2.70947 25 1 23.2905 1 21.1818C1 19.073 2.70947 17.3636 4.8182 17.3636Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>  
 
    </SvgIcon>
  );
}

export default function BranchIcon() {

  return (
      <Branch viewBox="0 0 26 26"/>
  );
}