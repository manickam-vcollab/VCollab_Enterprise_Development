import SvgIcon from '@material-ui/core/SvgIcon';

export default function ValueSettings(props:any) {
  return (
    <SvgIcon viewBox='0 0 18 20' { ...props}>
     <path d="M5 10.14V0H3V10.14C1.28 10.59 0 12.14 0 14C0 15.86 1.28 17.41 3 17.86V20H5V17.86C6.72 17.41 8 15.86 8 14C8 12.14 6.72 10.59 5 10.14ZM4 12C5.1 12 6 12.9 6 14C6 15.1 5.1 16 4 16C2.9 16 2 15.1 2 14C2 12.9 2.9 12 4 12ZM15 0H13V2.14C11.28 2.59 10 4.14 10 6C10 7.86 11.28 9.41 13 9.86V20H15V9.86C16.72 9.41 18 7.86 18 6C18 4.14 16.72 2.59 15 2.14V0ZM14 4C15.1 4 16 4.9 16 6C16 7.1 15.1 8 14 8C12.9 8 12 7.1 12 6C12 4.9 12.9 4 14 4Z" fill="currentColor"/>
    </SvgIcon>
  );
}