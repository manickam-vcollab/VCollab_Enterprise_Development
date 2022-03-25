import React,{useRef} from 'react'
import SearchHints from 'components/shared/hintsPanel'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon  from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import useListStyles from '../../shared/List/liststyle'
import useContainer from 'customHooks/useContainer'
import {getIcon, getItem, selectMainMenuItems, setActiveTab} from 'store/mainMenuSlice'
import { addPrevSearchItem, SearchItem, selectPrevSearches } from 'store/moreSlice'
import {useAppDispatch, useAppSelector} from 'store/storeHooks'
import { push } from 'connected-react-router/immutable'

type BodyProps = {
    showSearch: boolean,
    searchText:string,
    searchHintsData: string[],
    searchResults: SearchItem[],
    searchItems: SearchItem[],
    onClickSearchHints: (s:string) => void
}
function Body(props: BodyProps) {
    const listClasses = useListStyles();
    const headerRef = useRef(null);
    const dispatch = useAppDispatch();
    const mainMenuItems = useAppSelector(selectMainMenuItems);
    // eslint-disable-next-line
    const [headerWidth, headerHeight] = useContainer(headerRef,[]);
    const containerRef = useRef(null);
    // eslint-disable-next-line
    const [containerWidth, containerHeight] = useContainer(containerRef,[]);

    const handleResultsClick = (e) => {
      dispatch(setActiveTab({menuItem:getItem(e.id,mainMenuItems)}));
      dispatch(push(e.path));
      dispatch(addPrevSearchItem(props.searchText));
    }

    const handleHintsClick = (s:string) => {
      dispatch(addPrevSearchItem(props.searchText));
      props.onClickSearchHints(s);
    }

  return (
    <div ref = {containerRef} style={{height:'100%', overflow:'hidden'}} >
          <div ref = {headerRef} >
        <SearchHints
        data={props.searchHintsData}
        onClick={handleHintsClick}
        onDelete={() => {}}
        showDelete={false}
        />
        </div>
       
    <List
    style={{height: containerHeight? containerHeight - headerHeight : 0}}
    className={listClasses.Scrollbar}
    >
       { (props.searchResults.length === 0 ? props.searchItems : props.searchResults).map(e => {
                return <ListItem button onClick={() => handleResultsClick(e)}>
                <ListItemIcon >
                  { React.createElement(getIcon(e.type))}
                </ListItemIcon>
                <ListItemText>{
                    e.name
                }</ListItemText>
                </ListItem>
            })
        }
    </List>
    </div>
    
  )
}

export default Body