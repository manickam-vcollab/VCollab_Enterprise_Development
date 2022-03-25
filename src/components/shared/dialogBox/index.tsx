import MuiTypography from '@material-ui/core/Typography';
import MuiButton from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogContentText from '@material-ui/core/DialogContentText';

import MuiSnackbar from '@material-ui/core/Snackbar';

import MuiIcon from '@material-ui/core/Icon';

import MuiAlert from '@material-ui/lab/Alert';

export default function DialogBox (props : any) {


return (
    <div>

    <MuiDialog
    open={props.openDialog}
    disablePortal={ true }
    aria-labelledby="draggable-dialog-title"
  >
    <MuiDialogContent className={props.dialogBox}>
      <MuiDialogContentText >
        <MuiIcon style={{marginLeft: "40%"}}>
            {props.confirmationIcon}
        </MuiIcon>
        
        <MuiTypography color="inherit">
         {props.confirmationMessage}
         
        </MuiTypography>
      </MuiDialogContentText>
    </MuiDialogContent>
    <MuiDialogActions >
      <div>
      <MuiButton style={{backgroundColor:"#8C8BFF", marginLeft:"-50%"}} 
        autoFocus 
        onClick={props.onHandleDelete} 
        color="primary"
      >
        Confirm
      </MuiButton>
      <MuiButton style={{color: "#8C8BFF"}}
        onClick={props.handleCloseDialog} 
        color="primary"
      >
        Cancel
      </MuiButton>
      </div>
    </MuiDialogActions>
  </MuiDialog>
  <div>
    <MuiSnackbar className={props.snackBar}
      anchorOrigin={{vertical:"top", horizontal:'center'}}
      autoHideDuration={2000}
      open={props.openDeleteConfirm}
      onClose={props.handleCloseAlert} >
        <MuiAlert icon={false}>
        <div style={{display: "flex",
          alignItems: "center",
          justifyContent: "space-between",}}
        >
          <MuiIcon>{props.confirmedIcon}</MuiIcon>
          <MuiTypography color="inherit">{props.confirmedMessage}</MuiTypography>
        </div>
        </MuiAlert>
      </MuiSnackbar>
  </div>  
  </div>
)
}