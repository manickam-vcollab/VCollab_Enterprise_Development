import MuiList from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CheckIcon from '@material-ui/icons/Check';

import useStyles from './axistriadpositionstyle';

interface IAxisTriadPositionProps {

   items:ListItem[],
   onSelectMenuList:(id:string,isSelected:boolean, undoable?: boolean)=> void
    
}

type ListItem = {

    id:any
    text:string,
    selected:boolean,
    applied:boolean,

}

export default function AxisTriadPosition(props:IAxisTriadPositionProps) {

 const classes = useStyles();   

      
return (

    <div>

        <MuiList>
            <MuiListItem>
                <MuiListItemText primary={'Position'} ></MuiListItemText> 
            </MuiListItem>
           
            {props.items.map((listItems)=>{

            return(
                <MuiListItem button onClick={(event)=>props.onSelectMenuList(listItems.id ,!listItems.selected, true)} selected={listItems.selected}>

                    <MuiListItemText primary={listItems.text } classes={{primary:classes.MuiListItemText}}  ></MuiListItemText>
                    { listItems.applied == true  ? <MuiListItemSecondaryAction><CheckIcon/></MuiListItemSecondaryAction>:null}

                </MuiListItem>

            )})}

        </MuiList>
    </div>  
)}