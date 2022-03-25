import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import {useState} from 'react';

export default function DisplayTime(props:any){
    
    const [time,setTime] = useState<number>(0);

    const changeTimeFinder = (date : Date) => {
        const now = moment(Date());
        const then = moment(date)
        const changeTime = now.diff(then,"seconds")
        setTime(changeTime)
    }

    const timeString = (time : number) => {
        if(time < 60)
        return("Just Now")
    else{
        let changeTimeMunite = ~~(time/60);
        if(changeTimeMunite < 60)
            return(`${changeTimeMunite} minutes ago`)
        else{
            let changeTimeHours = Math.round(changeTimeMunite/60);
            if ( changeTimeHours < 24)
                return(`${changeTimeHours} Hours ago`);
            else{
                let changeTimeDays = Math.round(changeTimeMunite/24);
                return(`${changeTimeDays} Days ago`);
            }
        }
    } 
    }


    setTimeout( () => {
        changeTimeFinder(props.time)
    }, 1000);

       
    return (
        <Typography variant="h3" align="left">
            {timeString(time)}
        </Typography>
    )
}