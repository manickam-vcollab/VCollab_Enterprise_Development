import MUICheckBox from '@material-ui/core/Checkbox';

function Checkbox(props:any) {
  
  return (
    <>
      <MUICheckBox 
            color='default'
            size='small'
            {...props}
            ></MUICheckBox>
    </>
  )
}

export default Checkbox
