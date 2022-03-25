import MuiPopper from "@material-ui/core/Popper";
import MuiPaper from '@material-ui/core/Paper';



export default function popper (props : any) {

  return (

    <div>        
      <MuiPopper {...props}  >
      <MuiPaper elevation={10}>
            {props.children}
        </MuiPaper>
      </MuiPopper>   
     
    </div>
            
  )
}
