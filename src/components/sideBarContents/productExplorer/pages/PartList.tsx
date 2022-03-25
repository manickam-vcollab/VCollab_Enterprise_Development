import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

import {goBack, push} from 'connected-react-router/immutable';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import Search from '../search';
import {useAppSelector, useAppDispatch} from "../../../../store/storeHooks";
import {selectCheckedLeafNodes, selectProductTreeData, setSearchString} from "../../../../store/sideBar/productTreeSlice";
import Footer from '../Footer'
import { Routes } from '../../../../routes';
import SearchBox from '../search/SearchBox';
import { useState } from 'react';
import Title from 'components/layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import SearchIcon from '../shared/SearchIcon';
import { List, ListItem, ListItemText } from '@material-ui/core';
import ListStyles from 'components/shared/List/liststyle'

export default function PartsList(props:any){
    
    const listClasses = ListStyles();
    const checkedNodes = useAppSelector(selectCheckedLeafNodes);
    const treeData = useAppSelector(selectProductTreeData);
    const [isSearchMode, setIsSearchMode] = useState(false);
    const dispatch = useAppDispatch();  
    

    const onClickBackIcon = () =>{
      dispatch(goBack());
    }

    const handleNext = () => {
      dispatch(push(Routes.GEOMETRY_DISPLAY_MODES))
    }

    const getHeaderLeftIcon= () => {
      return (
        null
      )
    }

    const getHeaderContent = () => {
      return(
      isSearchMode ? 
      <SearchBox/>
      : <Title text="Parts List" />
      )
    }
    

    const getHeaderRightIcon = () => {
      return(
      isSearchMode?
      <IconButton aria-label="search" onClick={() => {dispatch(setSearchString("")); setIsSearchMode(false)}}>
      <ClearIcon />
    </IconButton>
    :
      <SearchIcon onClick={() => setIsSearchMode(true)}/>
    )
    }

    const getBody = () => {
      return (
            <Search isSearchMode = {isSearchMode}/>
      )
    }      

    const getFooter = () => {
        return checkedNodes.length > 0 ? (<Footer selectedCount={checkedNodes.length}
          handleNext = {handleNext}
        ></Footer>) : null
    }

    return (<SideBarContainer
      headerLeftIcon = { getHeaderLeftIcon() }
      headerContent={ getHeaderContent() }
      headerRightIcon = { getHeaderRightIcon() }
      body ={ getBody() }
      footer = { getFooter() }
      />)
}