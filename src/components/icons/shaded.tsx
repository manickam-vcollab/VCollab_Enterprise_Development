
import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
function shaded(props:any) {
    return (
        <>
            <SvgIcon {...props} viewBox='0 0 17 19'>
            <path d="M0.5 14V5L8.375 9.5V18.5L0.5 14Z" fill="#DBDADA"/>
            <path d="M8.375 9.5L16.25 5V14L8.375 18.5V9.5Z" fill="#ACAAAA"/>
            <path d="M8.375 0.5L0.5 5L8.375 9.5L16.25 5L8.375 0.5Z" fill="white"/>
            </SvgIcon>
        </>
    )
}

export default shaded
