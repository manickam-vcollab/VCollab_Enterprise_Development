import React, { useState, useEffect , useRef} from 'react'
import SearchWithHints from '../searchWithHints'
import Tree, { ITreeNode, ITreeNodeState, ITreeTableProps} from '../RsTreeTable'
import {getTreeData} from "../../utils/tree"

type LimitedTreeTableProps = Omit<ITreeTableProps, "treeData" | "expandedRowIds">;
export interface RsTreeSearchProps extends LimitedTreeTableProps {
    searchText: string,
    searchAttribKeys: string[],
    searchPlaceholder?: string,
    onChangeSearch:(s:string, results: any[]) => void,
    onClearSearch?:() => void,
    onClickSearchHint?:(s:string) => void,
    onDeleteSearchHint?:(s:string) => void,
    searchHints?:string[],
    data: {[id:string]:ITreeNode}

}
function RsTreeSearch(props: RsTreeSearchProps) {

    const searchBarHeight = 60;
    const [results, setResults] = useState([] as any[])
    const {treeData, expandedKeys} = getTreeData(props.data,results);
    const [data, setData] = useState(treeData)
    const [expanded, setExpanded] = useState(expandedKeys)

    useEffect(() => {
        let {treeData, expandedKeys} = getTreeData(props.data, props.searchText === "" ? [] : results);
        if(treeData)
        setData([...treeData]);
        if(expandedKeys)
        setExpanded([...expandedKeys])
    },[props.data, results])

    const handleSearchResult = (results:any[]) => {
        let filtered = results.map(result => {
            let node =  JSON.parse(JSON.stringify(result.item));
            if(result.matches)
            node.matches =result.matches
            return node
          }
          );
        setResults(filtered);
    }

    return (
        <div style={{width:props.width,height:props.height}}>
            <SearchWithHints
                text={props.searchText}
                searchPool={props.data}
                disableHints
                getAttribKeys={() => props.searchAttribKeys}
                placeholder={props.searchPlaceholder ? props.searchPlaceholder : "Search Tree"}
                onChange={(s:string, results:any[]) => {props.onChangeSearch(s,results); handleSearchResult(results)}}
                hints={props.searchHints?props.searchHints:[]}
                onClickHint={props.onClickSearchHint? props.onClickSearchHint : (s:string) => {}}
                onDeleteHint={props.onDeleteSearchHint? props.onDeleteSearchHint :() => {}}
                onClear={props.onClearSearch? props.onClearSearch : () => {}}
            />
            
            <Tree
                {...props}
                treeData = {data ? data : []}
                expandedRowIds = {expanded?expanded : [] }
                height = {props.height - searchBarHeight}
            />
        </div>
    )
}
export type {ITreeNode, ITreeNodeState};
export default RsTreeSearch
