let range = [" seconds ", " minutes ", " hours ", " days ", " weeks "];
let SizeRange = ["B", "KB", "MB", "GB", "TB"];
let SpeedRange = ["B/s", "KB/s", "MB/s", "GB/s", "TB/s"];

//Convert number of seconds to structure string E.g. 65 as input returns 1minutes 5seconds
export const SecondsToStructuredString = function(time:number) {
        let min;
        let sec;
        let hr;
        let days;
        let wks;
        if (time < 1)
            return "0 milliseconds";

        if(time < 1000)        
            return Math.floor(time) + " milliseconds";        
        else
            time = time / 1000;

        if (time < 60)//Seconds
        {
            return Math.floor(time) + range[0];
        }
        else if ((time / 60) < 60)//Minutes
        {
            min = Math.floor(time / 60);
            sec = Math.floor(time - (min * 60));
            return min + range[1] + (sec > 0 ? sec + range[0] : "");
        }
        else if ((time / (60 * 60)) >= 1 && (time / (60 * 60)) < 24)//Hours
        {
            hr = Math.floor(time / (60 * 60));
            min = time - (hr * (60 * 60));
            min = Math.floor(min / 60);
            sec = Math.floor(time - ((hr * (60 * 60)) + (min * 60)));
            return hr + range[2] + (min > 0 ? min + range[1] : "") + (sec > 0 ? Math.floor(sec) + range[0] : "");
        }
        else if ((time / (60 * 60)) >= 24 && (time / (60 * 60 * 24)) < 7)//Days
        {
            days = Math.floor(time / (60 * 60 * 24));
            hr = time - (days * 60 * 60 * 24);
            hr = Math.floor(hr / (60 * 60));
            min = time - ((days * 60 * 60 * 24) + (hr * 60 * 60));
            min = Math.floor(min / 60);
            sec = Math.floor(time - ((days * 60 * 60 * 24) + (hr * 60 * 60) + (min * 60)));
            return days + range[3] + (hr > 0 ? hr + range[2] : "") + (min > 0 ? min + range[1] : "") + (sec > 0 ? sec + range[0] : "");
        }
        else //if((time / (60*60*24)) >= 7) //Weeks
        {
            wks = Math.floor(time / (60 * 60 * 24 * 7));
            days = time - (wks * (60 * 60 * 24 * 7));
            days = Math.floor(days / (60 * 60 * 24));
            hr = time - ((wks * 60 * 60 * 24 * 7) + (days * 60 * 60 * 24));
            hr = Math.floor(hr / (60 * 60));
            min = time - (((wks * (60 * 60 * 24 * 7)) + (days * 60 * 60 * 24) + (hr * 60 * 60)));
            min = Math.floor(min / 60);
            sec = Math.floor(time - ((wks * (60 * 60 * 24 * 7)) + (days * 60 * 60 * 24) + (hr * 60 * 60) + (min * 60)));
            return wks + range[4] + (days > 0 ? days + range[3] : "") + (hr > 0 ? hr + range[2] : "") + (min > 0 ? min + range[1] : "") + (sec > 0 ? sec + range[0] : "");
        }
};

//Returns number of bytes as structure string E.g. 1076 as input returns 1.05KB  
export const BytesToStructuredString = function(bytes:number , precision : number) {
        if(precision === undefined) precision = 2;
        if (bytes < 1)
            return "0 B";
        let i = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, i)).toFixed(precision) + " " + SizeRange[i];
};

//Returns number of bytes/sec as structure string E.g. 1076 as input returns 1.05KB/s
export const SpeedToStructuredString = function(speed:number) {
        if (speed < 1)
            return "0 B/s";
        let i = Math.floor(Math.log(speed) / Math.log(1024));
        return (speed / Math.pow(1024, i)).toFixed(2) + " " + SpeedRange[i];
};

