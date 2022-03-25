import { selectPopupMenuActiveContent } from '../../../store/appSlice';
import { useAppSelector } from '../../../store/storeHooks';
import { popupMenuContentTypes } from '../../../config';

import DisplayMode from './displayMode';
import More from './more';

function PopupMenu(props : any)
{  
    const popupMenuActiveContent = useAppSelector(selectPopupMenuActiveContent);

    const renderSwitch = () => {
        switch(popupMenuActiveContent) {
            case popupMenuContentTypes.displayModes:
                return (<DisplayMode open= { popupMenuActiveContent === popupMenuContentTypes.displayModes && props.anchorEl !== null } anchorEl={ props.anchorEl }/>);
            case popupMenuContentTypes.more:
                return (<More open= { popupMenuActiveContent === popupMenuContentTypes.more && props.anchorEl !== null  } anchorEl={ props.anchorEl }/>);
            default:
                return <></>;
        }
    }

    return (renderSwitch())
}

export default PopupMenu;