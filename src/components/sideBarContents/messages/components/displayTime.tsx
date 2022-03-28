import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import {useEffect, useState} from 'react';

export default function DisplayTime(props:any){
    
    const [time,setTime] = useState<number>(0);

    const changeTimeFinder = (date : string) => {
        const now = new Date();
        const then = new Date(JSON.parse(date));
        const changeTime:any = Math.abs(now - then);
        setTime(Math.ceil(changeTime/1000))
    }

    useEffect(() => {
        const handle = setInterval( () => {
            changeTimeFinder(props.time)
        }, 5000);
        return () => {
            clearInterval(handle)
        }
    },[])
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
       
    return (
        <Typography variant="h3" align="left">
            {timeString(time)}
        </Typography>
    )
}