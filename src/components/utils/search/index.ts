export const getSearchInput = (searchStringData:string) => {
    return "'" + searchStringData;
}

export const getHighlightText = (matches:any[], key:string) : {text:string, isMatch:boolean}[]=> {

    let out:{text:string, isMatch:boolean}[] = [];

    matches.forEach( match => {
        if(match.key === key) {
            let prevIdx = 0;
            let text = match.value as string;
            match.indices.forEach( (idx:[number,number]) => {
                if(idx[0] === 0 && idx[1] === 0)
                {
                    out.push({text: text[0], isMatch:true});
                    prevIdx +=1
                }
                if(idx[1] > prevIdx) {
                    let firstIdx = idx[0];
                    let len = idx[1] - idx[0]
                    if(firstIdx - prevIdx > 0) {
                        out.push({text: text.substr(prevIdx,firstIdx-prevIdx), isMatch: false})
                    }
                    out.push({text: len > 0 ? text.substr(firstIdx,len+1) : text[firstIdx] , isMatch:true})
                    prevIdx = idx[1] + 1
                }
            })
            let lastPartLen = text.length - prevIdx;
            if (lastPartLen > 0) {
                out.push({text:text.substr(prevIdx,lastPartLen),isMatch:false})
            }
        }
    })
    return out
}