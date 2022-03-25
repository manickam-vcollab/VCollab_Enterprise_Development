import React ,{useState} from 'react'
import EyeIcon from '../../../icons/eyeIcon';
import EyeSlashIcon from '../../../icons/eyeSlashIcon';
import EyeInvert from '../../../icons/eyeInvert';
import {setCheckedVisibilityAsync, invertVisibilityAsync} from "../../../../store/sideBar/productTreeSlice"
import { useAppDispatch } from '../../../../store/storeHooks';
import OptionPopper from '../../../shared/Footer/OptionPopper';

type VisibilityOptionsProps = {
    disabled: boolean,
}
function VisibilityOptions(props:VisibilityOptionsProps) {
    const dispatch = useAppDispatch();
    return (
        <OptionPopper 
         disabled={props.disabled}
         parent={{
             id:'Change selected visibility',
             icon: <EyeIcon/>,
             onClick: () => {}
         }}
         options={
            [
                {
                    id: 'Show',
                    icon: <EyeIcon/>,
                    onClick: () => dispatch(setCheckedVisibilityAsync({toShow:true, undoable:true}))
                },
                {
                    id: 'Hide',
                    icon: <EyeSlashIcon/>,
                    onClick: () => dispatch(setCheckedVisibilityAsync({toShow:false, undoable:true}))
                },
                {
                    id: 'Invert',
                    icon: <EyeInvert viewBox = '0 0 19 20'></EyeInvert>,
                    onClick: () => dispatch(invertVisibilityAsync({undoable: true}))
                }
            ]
        } />
    )
}

export default VisibilityOptions
