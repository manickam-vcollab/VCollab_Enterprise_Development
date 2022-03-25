import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

import {goBack, push} from 'connected-react-router/immutable';
import nextId from 'react-id-generator';
import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import {useAppSelector, useAppDispatch} from "../../../store/storeHooks";
import { Routes } from '../../../routes';
import SearchBox from '../../shared/searchBox';
import Body from './Body'
import { useEffect, useRef, useState } from 'react';
import Title from 'components/layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import { getSearchItems, SearchItem, selectList, selectPrevSearches} from '../../../store/moreSlice'
import OptionContainer from 'components/layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer';
import Option from 'components/layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PublishIcon from '@material-ui/icons/Publish';
import { Input } from '@material-ui/core';
import { addMenuItem, addTab, deleteMenuItem, getItem, MainMenuItem, MainMenuItems, removeTab, selectMainMenuItems, setActiveTab, updateMenuItem } from 'store/mainMenuSlice';
import { Edit } from '@material-ui/icons';
import { setSidebarVisibility } from 'store/appSlice';

type AddGroupProps = {
    disabled: boolean,
    onClickEdit: () => void,
    selectedGroup: MainMenuItem
}

export default function AddGroup(props:AddGroupProps){
    
    const dispatch = useAppDispatch();  
    const [groupName, setGroupName] = useState(props.selectedGroup.name);
    const [showSearch ,setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<SearchItem[]>(props.selectedGroup.children)
    const mainMenuItems = useAppSelector(selectMainMenuItems);
    const [searchList, setSearchList] = useState(getSearchItems(mainMenuItems,true));
    const selectedGroupRef = useRef<MainMenuItem | null>(null);

    useEffect(() => {
      
      return () => {
        let selectedMainMenuItems = selectedItems.map( e => getItem(e.id,mainMenuItems));
        console.log(selectedMainMenuItems);
        if(selectedGroupRef.current)
        dispatch(updateMenuItem({
          menuItem: {
            ...selectedGroupRef.current,
            isEditMode: false
          }
        }))
        else{
          handleAddGroupDelete();
        } 
      }
    },[])

    const getHeaderLeftIcon= () => {
      return null
    }

    const getHeaderContent = () => {
      return(
      showSearch? 
      <SearchBox 
        text={searchText} 
        onChange={(e:any,r:any[]) => {
          setSearchText(e);
          setSearchResults(r.map(e => e.item));
        }} 
        onClear={() => {}} 
        searchPool={searchList}
        placeholder='type here'
        getAttribKeys={(data: SearchItem) => {return ["name"]}}
        />
        :
        <Input style={
          {
            margin:5,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 5,
            height:40,
            width: 225
          }
        }
        value={groupName}
        onChange={e => setGroupName(e.target.value)} 
        defaultValue={groupName} inputProps={{ 'aria-label': 'description' }}/>
        )
    }
    

    const getHeaderRightIcon = () => {
      return(
    <>
    {
      !showSearch ?
    <IconButton aria-label="search" onClick={() => {setShowSearch(true)}}>
          <SearchIcon/>
        </IconButton>
      :
      <IconButton aria-label="go back to more options" onClick={() => {setShowSearch(false)}}>
      <ClearIcon />
    </IconButton>
    }
    </>
    )
    }

    const getBody = () => {
      return (
            <Body 
            showSearch={showSearch}
            searchItems={searchList}
            searchText={searchText}
            selectedList={selectedItems}
            setSelectedList={setSelectedItems}
            searchResults={ showSearch ? searchResults : searchList}
            onClickSearchHints={(s:string) => {
              setShowSearch(true);
              setTimeout(() => setSearchText(s),10)
            }}
            />
      )
    }      

    const handleSave = () => {
      let selectedMainMenuItems = selectedItems.map( e => getItem(e.id,mainMenuItems));
      let menuItem = {
        ...props.selectedGroup,
        isEditMode: false,
        name: groupName,
        children: selectedMainMenuItems
      };
      selectedGroupRef.current = menuItem;
      dispatch(updateMenuItem({
        menuItem
      }))
      setTimeout(() => dispatch(setActiveTab({menuItem})) , 10)
    }

    const handleAddGroupDelete = () =>  {
      dispatch(deleteMenuItem({
        menuItemId: props.selectedGroup.id
      }))
      dispatch(removeTab({menuItemId: props.selectedGroup.id}));
      dispatch(setSidebarVisibility(false));
      dispatch(setActiveTab({menuItem:null}));
    }

    const getFooter = () => {
        return  <OptionContainer>
        <Option label="Save" icon = {
        <IconButton disabled={props.disabled} onClick={handleSave}>
            <SaveAltIcon/>
        </IconButton>  
       }/>
       <Option label="Change" icon = {
        <IconButton disabled={props.disabled} onClick={() => {}}>
            <PublishIcon/>
        </IconButton>  
       }/>
        <Option 
        label = "Delete"
        icon = {<IconButton disabled={props.disabled} onClick={handleAddGroupDelete}>
        <DeleteForeverIcon/>
        </IconButton>  }
        />
    </OptionContainer>
    }

    return (<SideBarContainer
      headerContent={ getHeaderContent() }
      headerRightIcon = { getHeaderRightIcon() }
      body ={ getBody() }
      footer = { getFooter() }
      />)
}