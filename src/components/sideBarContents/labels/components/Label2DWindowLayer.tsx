import { LabelType } from 'store/sideBar/labelSlice/shared/types';
import { Layers } from 'store/windowMgrSlice';
import {  selectLabelData, setLabelPos, toggleVisibility, windowPrefixId  } from '../../../../store/sideBar/labelSlice/labelAllSlice';
import { useAppSelector } from '../../../../store/storeHooks';
import Label2D from './Label2D';

interface Props {
    parentRef:any,
    layerId:Layers
}
function Label2DWindowLayer(props:Props) {
    
    const labelTree = useAppSelector(selectLabelData);
    return (
        <>{
            [...Object.values(labelTree)].map(label => {
                return label.pid === LabelType.LABEL2D  ? <Label2D 
                key = {label.id}
                layerId={props.layerId}
                windowPrefixId={windowPrefixId}
                label = {label}
                setLabelPosReducer = {setLabelPos}
                parentRef={props.parentRef}/> : null
            })
        }
        </>    
    )
}

export default Label2DWindowLayer
