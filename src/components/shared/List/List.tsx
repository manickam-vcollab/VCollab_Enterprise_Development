import MuiList from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Input from '@material-ui/core/Input';
import CheckIcon from '@material-ui/icons/Check';

import Scrollbar from '../Scrollbar'

import style from './liststyle';


interface IListProps {

    items:ListItem[],
    onSelectMenuList:(id:string,isSelected:boolean)=> void
    onClickSetListEditable:(id:string,edit:boolean)=> void
    onClickUpdateListName:(id:string,value:string)=> void

}

type ListItem = {

    id:any
    text:string,
    selected:boolean,
    applied:boolean,
    edit:boolean,
    readonly:boolean,
    type:Source

}

export enum Source {

   SYSTEM,
   USER

}

export default function List(props:IListProps) {

  const classes = style();

  return (

    <Scrollbar >
         <div >   
                <MuiList >
                  <MuiListItem > 
                    
                    <MuiListItemText  primary="System Provided" ></MuiListItemText>

                 </MuiListItem> 
                      {

                        props.items.map((item:ListItem)=>(

                          item.type === Source.SYSTEM ?(
                       
                          <MuiListItem button  onClick={(event)=>props.onSelectMenuList(item.id,!item.selected)} selected={item.selected}>
                           
                             <MuiListItemText classes={{primary:classes.MuiListItemText}} primary={item.text} ></MuiListItemText>
                             { item.applied == true  ? <MuiListItemSecondaryAction><CheckIcon/></MuiListItemSecondaryAction>:null}

                          </MuiListItem>):null

                        ))}

                 <MuiListItem > 
                   
                     <MuiListItemText  primary="User Provided" ></MuiListItemText>

                </MuiListItem> 

                <div >

                  {

                    props.items.map((item:ListItem)=>(

                      item.type === Source.USER ?(

                        (item.edit ?(<Input type="text" defaultValue={item.text}
                        onChange={event => props.onClickUpdateListName(item.id,event.target.value)}
                        onMouseLeave={(event)=>{
  
                         props.onClickSetListEditable(item.id,false);
                        }}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === 'Escape') {
                            props.onClickSetListEditable(item.id,false);
                            event.preventDefault()
                            event.stopPropagation()
                          }
                        }}
                        />): (<MuiListItem button 
                        onClick={(event) => props.onSelectMenuList(item.id,!item.selected)}
                        selected={ item.selected }>
                        <MuiListItemText classes={{primary:classes.MuiListItemText}} primary={item.text} 
                        onDoubleClick={() => {
  
                          props.onClickSetListEditable(item.id,true);
  
                        }}/>
                        { item.applied == true  ? <MuiListItemSecondaryAction><CheckIcon/></MuiListItemSecondaryAction>:null}
                        </MuiListItem>))):null

                    ))}

                   </div>    

                </MuiList>

         </div>

         </Scrollbar >
  )

}