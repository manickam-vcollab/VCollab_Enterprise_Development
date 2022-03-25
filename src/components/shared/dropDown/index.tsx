import MuiMenuItem from "@material-ui/core/MenuItem";
import MuiMenuList from "@material-ui/core/MenuList";
import MuiPopper from "@material-ui/core/Popper";
import MuiTypography from '@material-ui/core/Typography';
import MuiSnackbar from '@material-ui/core/Snackbar';

import MuiAlert from '@material-ui/lab/Alert';

import MuiIcon from '@material-ui/core/Icon';

import styles from './style';

import { useState} from "react";

export default function DropDown (props : any) {
  const [openAlert, setOpenAlert] = useState<any>(false);
  // const [itemImage, setItemImage] = useState<any>(null)
  const [itemMessage, setItemMessage] = useState<any>(null);

  const classes = styles();

  const showAlert = (item: any) => {
    // setItemImage(item.icon);
    setItemMessage(`${item.title} is applied`)
    setOpenAlert(true);     
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  return (
    <div>
      <MuiPopper className={classes.popper} disablePortal id="display-menu" open={props.open} anchorEl={props.anchorEl} >
        <MuiMenuList id="simple-menu"  >
          {props.items.map((item :any,index : any)=>(
              <MuiMenuItem className={classes.icon}  key={index} onClick={() => showAlert(item)} disabled = {item.disabled === true}>
                {item.icon && <MuiIcon><item.icon/></MuiIcon>}
                <MuiTypography  className={classes.listItem} variant="h2">{item.title} </MuiTypography>
                {props.size ?  <MuiTypography  className={classes.listItemSize} variant="subtitle1">0 B</MuiTypography> : null}
              </MuiMenuItem>
          ))}
        </MuiMenuList>
      </MuiPopper>   
      
      <MuiSnackbar className={classes.snackBar}
        anchorOrigin={{vertical:"top", horizontal:'center'}}
        autoHideDuration={2000}
        open={openAlert}
        onClose={handleCloseAlert} >
          <MuiAlert icon={false}>
          <span>
          {/* <MuiIcon>{itemImage}</MuiIcon> */}
            <span>{itemMessage} </span>
          </span>
          </MuiAlert>
        </MuiSnackbar>
    </div>
  )
}