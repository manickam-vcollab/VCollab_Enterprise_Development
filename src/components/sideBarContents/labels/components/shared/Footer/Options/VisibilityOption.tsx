import React ,{useState} from 'react'
import EyeIcon from '../../../../../../icons/eyeIcon';
import EyeSlashIcon from '../../../../../../icons/eyeSlashIcon';
import EyeInvert from '../../../../../../icons/eyeInvert';
import OptionPopper from '../../../../../../shared/Footer/OptionPopper';

type VisibilityOptionsProps = {
    disabled: boolean,
    showClick: () => void,
    hideClick: () => void,
    invertClick: () => void
}
function VisibilityOptions(props:VisibilityOptionsProps) {
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
                    onClick: props.showClick
                },
                {
                    id: 'Hide',
                    icon: <EyeSlashIcon/>,
                    onClick: props.hideClick
                },
                {
                    id: 'Invert',
                    icon: <EyeInvert viewBox = '0 0 19 20'></EyeInvert>,
                    onClick: props.invertClick
                }
            ]
        } />
    )
}

export default VisibilityOptions
