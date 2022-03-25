import {useState} from "react";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import CenterFocusWeakSharpIcon from '@material-ui/icons/CenterFocusWeakSharp';
import IconButton  from '@material-ui/core/IconButton';
import Grid from "@material-ui/core/Grid"
import ToolTip from '@material-ui/core/Tooltip'
import Typography from "@material-ui/core/Typography";

import AddTagDialog from "./Dialogs/AddTagDialog";
import AddTagNoModal from "./Dialogs/AddTagNoModal";
import VisibilityOptions from './VisibilityOptions'
import OptionContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import Option from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks';
import {selectActiveViewerID} from '../../../../store/appSlice';
import {groupSelectedNodes,focusSelectedNodes, updatePrevSearches} from '../../../../store/sideBar/productTreeSlice'
import { makeStyles,createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => createStyles({
    iconText: {
        height:'50px'
    }
}))


function FooterOptions(props:any) {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const [showDialog, setShowDialog] = useState(false);
    const activeViewerId = useAppSelector(selectActiveViewerID)
    const handleDialogOpen = () => {
        setShowDialog(true);
    }
    const handleDialogClose = () => {
        setShowDialog(false);
    }  
    const handleDialogSave = (name:string) => {
        dispatch(groupSelectedNodes({tagName:name}))
        dispatch(updatePrevSearches(name));
        setShowDialog(false);
    }
    const handleFocus = () => {
        dispatch(focusSelectedNodes({viewerId:activeViewerId}));
    }
    return (

        showDialog ?
        <AddTagNoModal message=" Enter a tag name to the selected Nodes. 
        This tag name can be used in search to filter nodes" 
        onAdd = {handleDialogSave}
        onCancel = {handleDialogClose}
        />
        :
        <OptionContainer>
            <Option label="Visibility" icon={<VisibilityOptions disabled={props.disabled}></VisibilityOptions>}/>
            <Option label="Label Parts" icon = {
            <IconButton disabled={props.disabled} onClick={() => handleDialogOpen()}>
                <LocalOfferIcon/>
            </IconButton>  
           }/>
            <Option 
            label = "Fit To Screen"
            icon = {<IconButton disabled={props.disabled} onClick={() => handleFocus()}>
            <CenterFocusWeakSharpIcon/>
            </IconButton>  }
            />
            <AddTagDialog open={showDialog} handleSave={handleDialogSave} handleClose={handleDialogClose}></AddTagDialog>
        </OptionContainer>
        
    )
}

export default FooterOptions
