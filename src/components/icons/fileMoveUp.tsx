import SvgIcon from '@material-ui/core/SvgIcon';

function FileMoveUp(props:any) {
  return (
    <SvgIcon  {...props}>
        <path d="M16.8341 21H1.83333C1.61232 21 1.40036 20.9122 1.24408 20.7559C1.0878 20.5996 1 20.3877 1 20.1667V1.83333C1 1.61232 1.0878 1.40036 1.24408 1.24408C1.40036 1.0878 1.61232 1 1.83333 1H11.8341L17.6675 6.83333V20.1667C17.6675 20.2761 17.6459 20.3845 17.604 20.4856C17.5622 20.5867 17.5008 20.6785 17.4234 20.7559C17.346 20.8333 17.2542 20.8947 17.153 20.9366C17.0519 20.9784 16.9436 21 16.8341 21Z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11.834 1V6.83333H17.6681" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.251 12.834L9.33431 9.91732L6.41764 12.834" stroke-width="2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.33398 16.834V10.1673" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </SvgIcon>
  );
}

export default function FileMoveUpIcon() {

  return (
      <FileMoveUp viewBox="0 0 19 22" />
  );
}
