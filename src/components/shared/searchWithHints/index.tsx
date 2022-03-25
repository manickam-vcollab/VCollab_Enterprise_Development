import React from 'react'
import SearchBox from '../searchBox'
import Hints from '../hintsPanel'
type SearchProps = {
    text: string,
    placeholder:string,
    disableHints?: boolean,
    onChange: (text:string,results:any) => void,
    getAttribKeys: (searchPool:any) => string[],
    hints: string[],
    searchPool: any,
    onClickHint: (text:string) => void
    onDeleteHint: (text:string) => void
    onClear: () => void
}
function SearchWithHints(props:SearchProps) {
    return (
        <div style={{ display:'flex', justifyContent: 'center'}}>
            <SearchBox 
            text={props.text} 
            textBoxWidth={250}
            searchPool={props.searchPool} 
            getAttribKeys={props.getAttribKeys} 
            placeholder={props.placeholder} 
            onChange={props.onChange} 
            onClear={props.onClear}/>
            {
               props.disableHints ? null : <Hints data={props.hints} onClick={props.onClickHint} onDelete={props.onDeleteHint}/>
            }
            
        </div>
    )
}

export default SearchWithHints
