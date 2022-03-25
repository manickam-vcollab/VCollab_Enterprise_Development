import React, { useEffect } from 'react'
import TreeSearch from '../../shared/Tree'
import AutoSizer from '../../../../shared/autoSize'
import { useAppDispatch, useAppSelector } from '../../../../../store/storeHooks'
import { getDependantDerivedTypeIds, setVisibleDerivedTypes, selectDerivedTypes, expandDerivedTypes, setSelectDerivedTypes, selectVariables, getSelectedVariableIds } from '../../../../../store/sideBar/fieldSlice'
import useSingleSelect from '../../shared/hooks/useSingleSelect'
import useVisibility from '../../shared/hooks/useVisibility'
import { useState } from 'react'


function Body() {
    const dispatch = useAppDispatch();
    const derived = useAppSelector(selectDerivedTypes);
    const [selected, handleSelect] = useSingleSelect({
        treeData: derived,
        selectReducer: setSelectDerivedTypes
    })

    const handleExpand = (toOpen:boolean,nodeId:string) => {
        dispatch(expandDerivedTypes({toOpen,nodeId}));
    }

    const [searchText, setSearchText] = useState("");

    return (
        <AutoSizer>
            {
                (size:any) => 
                    <div id="some_wrapper" style={{width:size.width, height:size.height}}>
                        <TreeSearch
                            data = {derived}
                            height = {size.height}
                            onChangeSearch = {(s:string,r:any) => {setSearchText(s);} }
                            searchAttribKeys = {["title"]}
                            searchText = {searchText}
                            width = {300}
                            searchPlaceholder = "Search Derived Types"
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
