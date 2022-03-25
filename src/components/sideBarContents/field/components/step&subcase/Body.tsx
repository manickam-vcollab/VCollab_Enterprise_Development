import React, { useEffect } from 'react'
import TreeSearch from '../../shared/Tree'
import AutoSizer from '../../../../shared/autoSize'
import { useAppDispatch, useAppSelector } from '../../../../../store/storeHooks'
import { selectSteps, expandStepsAndSubcase, setSelectStepsAndSubcase, selectVariables, setVisibleStepsAndSubcase, getDependantStepIds, getSelectedVariableIds } from '../../../../../store/sideBar/fieldSlice'
import useSingleSelect from '../../shared/hooks/useSingleSelect'
import useVisibility from '../../shared/hooks/useVisibility'
import { useState } from 'react'


function Body() {
    const dispatch = useAppDispatch();
    const steps = useAppSelector(selectSteps);
    const [searchText, setSearchText] = useState("");
    const [selected, handleSelect] = useSingleSelect({
        treeData: steps,
        selectReducer: setSelectStepsAndSubcase
    })


    const handleExpand = (toOpen:boolean,nodeId:string) => {
        dispatch(expandStepsAndSubcase({toOpen,nodeId}));
    }

    return (
        <AutoSizer>
            {
                (size:any) => 
                    <div id="some_wrapper" style={{width:size.width, height:size.height}}>
                        <TreeSearch
                            data = {steps}
                            height = {size.height}
                            onChangeSearch = {(s:string,r:any) => {setSearchText(s);} }
                            searchAttribKeys = {["title"]}
                            searchText = {searchText}
                            width = {300}
                            searchPlaceholder = "Search Steps & Subcases"
                            onExpand = {handleExpand}
                            onRowClick = {handleSelect}
                            selected = {selected}
                        />
                    </div>   
            }
        </AutoSizer>
    )
}

export default Body
