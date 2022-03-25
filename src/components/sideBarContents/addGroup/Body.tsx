import React,{useRef, useState} from 'react'
import SearchHints from 'components/shared/hintsPanel'
import Checkbox from 'components/shared/checkbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon  from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import useListStyles from '../../shared/List/liststyle'
import useContainer from 'customHooks/useContainer'
import {getIcon, getItem, MainMenuItem, selectMainMenuItems, setActiveTab} from 'store/mainMenuSlice'
import { addPrevSearchItem, SearchItem, selectPrevSearches } from 'store/moreSlice'
import {useAppDispatch, useAppSelector} from 'store/storeHooks'
import { push } from 'connected-react-router/immutable'
import { Typography } from '@material-ui/core'

type BodyProps = {
    showSearch: boolean,
    selectedList: SearchItem[],
    setSelectedList: (e:any) => void,
    searchText:string,
    searchResults: SearchItem[],
    searchItems: SearchItem[],
    onClickSearchHints: (s:string) => void
}


function Body(props: BodyProps) {
    const listClasses = useListStyles();
    const headerRef = useRef(null);
    const dispatch = useAppDispatch();
    // eslint-disable-next-line
    const [headerWidth, headerHeight] = useContainer(headerRef,[]);
    const containerRef = useRef(null);
    // eslint-disable-next-line
    const [containerWidth, containerHeight] = useContainer(containerRef,[]);

    const isChecked = (item: SearchItem) => {
      let r = props.selectedList.find(e => e.id === item.id);
      return r ? true : false;
    }

    const handleResultsClick = (e) => {
      let checked = isChecked(e);
      if(checked){
        let itemIdx = props.selectedList.findIndex(l => e.id === l.id);
        let t = [...props.selectedList];
        t.splice(itemIdx,1);
        props.setSelectedList(t);
      }
      else{
        props.setSelectedList([...props.selectedList, e]);
      }
    }

    const handleHintsClick = (s:string) => {
      dispatch(addPrevSearchItem(props.searchText));
      props.onClickSearchHints(s);
    }

  return (
    <div ref = {containerRef} style={{height:'100%', overflow:'hidden'}} >
          <div ref = {headerRef} >
        
          <List dense style={{maxHeight: '250px', overflowY:'scroll'}}
          className={listClasses.Scrollbar}
          component='div' aria-label="search hints list" >
         {props.selectedList.map(e => {
         return(<ListItem  button onClick={() => handleResultsClick(e)}>
        <ListItemIcon style={{minWidth:'50px'}}>
          <Checkbox checked={isChecked(e)}/>
        </ListItemIcon>
        <ListItemIcon>
          {e.icon ? <e.icon/>: null}
        </ListItemIcon>
        <ListItemText>{
            e.name
        }</ListItemText>
        </ListItem>)
        })}
        </List>
        </div>
       { props.selectedList.length > 0 ? <Divider/>: null}
    <div style={{height: containerHeight? containerHeight - headerHeight : 0}}>
    <Typography style={{padding: '1rem', textAlign: 'left'}}>
      {!props.showSearch ? "All Menu Items" : "Search Matches"}
    </Typography>
    <List
    dense
    className={listClasses.Scrollbar}
    >
       { (props.searchResults.length === 0 ? props.searchItems : props.searchResults).map(e => {
                return <ListItem  button onClick={() => handleResultsClick(e)}>
                <ListItemIcon style={{minWidth:'50px'}}>
                  <Checkbox checked={isChecked(e)}/>
                </ListItemIcon>
                <ListItemIcon>
                  {React.createElement(getIcon(e.type))}
                </ListItemIcon>
                <ListItemText>{
                    e.name
                }</ListItemText>
                </ListItem>
            })
        }
    </List>
    </div>
    </div>
    
  )
}

export default Body