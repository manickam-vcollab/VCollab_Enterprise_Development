import {goBack} from 'connected-react-router/immutable';
import BackIcon from '../shared/BackIcon';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import MenuItem from '@material-ui/core/MenuItem'

import {useAppSelector, useAppDispatch} from "../../../../store/storeHooks";
import {selectCheckedLeafNodes, selectUnCheckedLeafNodes} from "../../../../store/sideBar/productTreeSlice";
import DisplayModeBody from '../DisplayModes/DisplayModesBody'
import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import Footer from '../DisplayModes/Footer';
import { fetchDisplayModes, selectApplyTo,Selection,setApplyTo } from '../../../../store/sideBar/displayModesSlice';
import { useEffect } from 'react';



export default function DisplayModes(props:any){
  
    const checkedLeafNodes = useAppSelector(selectCheckedLeafNodes);
    const unCheckedLeafNodes = useAppSelector(selectUnCheckedLeafNodes);
    const applyTo = useAppSelector(selectApplyTo);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if(checkedLeafNodes.length > 0)
      dispatch(setApplyTo(Selection.SELECTED_PARTS));
  },[])

    const IsListDisabled = ():boolean => {
      if((applyTo === Selection.SELECTED_PARTS && checkedLeafNodes.length === 0) ||
         (applyTo === Selection.UNSELECTED_PARTS && unCheckedLeafNodes.length ===  0)
      ) 
      {
        return true
      }
      else {
        return false
      }
    }

    const onClickBackIcon = () =>{
      dispatch(goBack());
    }     

    const handleSelectChange = (e:React.ChangeEvent<{ value: Selection }>) => {
      dispatch(setApplyTo(e.target.value));
      dispatch(fetchDisplayModes);
    }
    const getAction = () => {
        return(
          <SelectAction
          labelId="display-modes-selection-label-id"
          id="display-modes-selection-id"
          value={applyTo}
          onChange={handleSelectChange}
          MenuProps={{
            disablePortal: true,
            anchorOrigin: {
              vertical:"bottom",
              horizontal:"left",
           },
           getContentAnchorEl: null
          }}
          >
            <MenuItem value={Selection.ALL_PARTS}>All Parts</MenuItem>
            <MenuItem value={Selection.SELECTED_PARTS}>Selected Parts</MenuItem>
            <MenuItem value={Selection.UNSELECTED_PARTS}>Unselected Parts</MenuItem>
          </SelectAction>
        )
    }
    const getFooter = () => {
       return <Footer/>
    }
    return (<SideBarContainer
      headerContent={ <Title text={"Display Modes" } group="Geometry"/> }
      headerAction = {getAction()}
      body ={ <DisplayModeBody disabled={IsListDisabled()}/> }
      footer = {getFooter()}
      />)
}