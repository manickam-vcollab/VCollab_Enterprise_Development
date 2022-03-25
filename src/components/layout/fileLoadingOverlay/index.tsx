import { selectModelLoadingStatus } from '../../../store/appSlice';
import { useAppSelector } from '../../../store/storeHooks';

import Logo from "../../../assets/images/LogoBig.svg";
import Typography from "@material-ui/core/Typography";
import styles from './style';

export default function FileLoadingOverlay() {
  
  const classes = styles();
  const modelLoadingStatus = useAppSelector(selectModelLoadingStatus);
  
  return (
    <div className={classes.loaderContainer}>
      <Typography>
        <img src={Logo} className={classes.logo} alt="Logo" />
      </Typography>
      <Typography className={classes.status} variant='h3'>{ modelLoadingStatus }</Typography>
    </div>
  );
}


