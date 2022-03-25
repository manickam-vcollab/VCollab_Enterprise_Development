import React, { useState } from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import { useAppSelector } from '../../../../store/storeHooks';
import { selectModels } from '../../../../store/sideBar/productTreeSlice';

interface Model {
  id:string,
  title: string
}
function SelectModel() {

    let models:Model[] = useAppSelector(selectModels)
    const handleSelectChange = (e:React.ChangeEvent<{ value: string }>) => {
        setApplyTo(e.target.value);
    }

    const [applyTo, setApplyTo] = useState(models[0].id);
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
            {
               models.map(model => <MenuItem value={model.id}>{model.title}</MenuItem>)
            }
           
            
          </SelectAction>
        )
}

export default SelectModel
