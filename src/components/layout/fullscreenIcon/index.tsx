import IconButton from '@material-ui/core/IconButton'
import Fullscreen from '../../icons/fullscreen';
import FullscreenClose from '../../icons/fullscreen_exit';
import styles from './style';
import { selectFullscreenStatus, setFullscreenState } from '../../../store/appSlice';
import { useAppSelector, useAppDispatch } from '../../../store/storeHooks';

export default function FullscreenIcon(props : any) {

    const classes = styles();
    const isFullscreenEnabled = useAppSelector(selectFullscreenStatus);
    const dispatch = useAppDispatch();  

    const OnClickFullscreen = function(){
        dispatch(setFullscreenState(!isFullscreenEnabled));
    }

    return (
        <div className = {classes.divFullscreen}>
            <IconButton  onClick={ OnClickFullscreen }>
                {(isFullscreenEnabled ?
                    <FullscreenClose/>:
                    <Fullscreen />
                )}
            </IconButton>
        </div>
    );
}
