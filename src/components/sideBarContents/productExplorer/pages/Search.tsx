import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

import {goBack, push} from 'connected-react-router/immutable';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackIcon from '../shared/BackIcon';
import Search from '../search';
import {useAppSelector, useAppDispatch} from "../../../../store/storeHooks";
import {selectCheckedLeafNodes, setSearchString} from "../../../../store/sideBar/productTreeSlice";
import Footer from '../Footer'
import { Routes } from '../../../../routes';
import SearchBox from '../search/SearchBox';


export default function TreeSearch(props:any){
    
    const checkedNodes = useAppSelector(selectCheckedLeafNodes);
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
      return(<SearchBox/>)
    }
    

    const getHeaderRightIcon = () => {
      return(<IconButton aria-label="search" onClick={() => dispatch(setSearchString(""))}>
      <ClearIcon />
    </IconButton>)
    }

    const getBody = () => {
      return (
            <Search isSearchMode={true}/>
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