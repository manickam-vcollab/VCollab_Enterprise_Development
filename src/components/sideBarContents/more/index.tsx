import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

import {goBack, push} from 'connected-react-router/immutable';

import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import {useAppSelector, useAppDispatch} from "../../../store/storeHooks";
import { Routes } from '../../../routes';
import SearchBox from '../../shared/searchBox';
import Body from './Body'
import { useState } from 'react';
import Title from 'components/layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import { SearchItem, getSearchItems, selectPrevSearches} from '../../../store/moreSlice'
import { selectMainMenuItems } from 'store/mainMenuSlice';

export default function More(props:any){
    
    const dispatch = useAppDispatch();  
    
    const [showSearch ,setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
    const prevSearchItems = useAppSelector(selectPrevSearches);
    const mainMenuItems = useAppSelector(selectMainMenuItems);
    const [searchList,setSearchList] = useState(getSearchItems(mainMenuItems,true));

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
          setSearchResults(r.map(el => el.item));
        }} 
        onClear={() => {}} 
        searchPool={searchList}
        placeholder='type here'
        getAttribKeys={(data: SearchItem) => {return ["name"]}}
        />
        :
        <div style={{paddingLeft: '10px'}}>
          <Title text="Menu Items" />
        </div>
        )
    }
    

    const getHeaderRightIcon = () => {
      return(
      !showSearch ?
    <IconButton aria-label="search" onClick={() => {setShowSearch(true)}}>
          <SearchIcon/>
        </IconButton>
      :
      <IconButton aria-label="go back to more options" onClick={() => {setShowSearch(false)}}>
      <ClearIcon />
    </IconButton>
    )
    }

    const getBody = () => {
      return (
            <Body 
            showSearch={showSearch}
            searchItems={searchList}
            searchText={searchText}
            searchHintsData={prevSearchItems}
            searchResults={ showSearch ? searchResults : searchList}
            onClickSearchHints={(s:string) => {
              setShowSearch(true);
              setTimeout(() => setSearchText(s),10)
            }}
            />
      )
    }      

    const getFooter = () => {
        return null
    }

    return (<SideBarContainer
      headerContent={ getHeaderContent() }
      headerRightIcon = { getHeaderRightIcon() }
      body ={ getBody() }
      footer = { getFooter() }
      />)
}