import {useAppSelector} from '../../store/storeHooks';
import MuiTypography from '@material-ui/core/Typography';
import MuiSnackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function ProbeLabel (){
    const position = useAppSelector((state) => state.probe.position)
   
    const text = useAppSelector((state) => state.probe.text);
    return (
      <div>
      {
          <div>
          { position.x < 1032
            ?
            <MuiSnackbar style={{position:"absolute",left: `${position.x + 120}px`, top: `${position.y + 50}px`}}
              anchorOrigin={{vertical:"top", horizontal:'center'}}
              autoHideDuration={3000}
              open={true}
            >
              <MuiAlert icon={false}>
                <div style={{margin:"-10px",}}>
                  <MuiTypography color="inherit" style={{fontSize:"13px"}}>
                    {`(${position.x},${position.y}) ${text}`}
                  </MuiTypography>
                </div>
              </MuiAlert>
            </MuiSnackbar>
            :
    
            <MuiSnackbar style={{position:"absolute",left: `${position.x - 120}px`, top: `${position.y + 50}px`}}
              anchorOrigin={{vertical:"top", horizontal:'center'}}
              autoHideDuration={3000}
              open={true}
            >
              <MuiAlert icon={false}>
                <div style={{margin:"-10px",}}>
                  <MuiTypography color="inherit" style={{fontSize:"13px"}}>
                    {`(${position.x},${position.y}) ${text}`}
                  </MuiTypography>
                </div>
              </MuiAlert>
            </MuiSnackbar>
          }
          
      </div>  
      }
    </div>
)
}