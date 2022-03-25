import { makeStyles } from "@material-ui/core";
type Props = {
    arrowPos: [number,number],
    arrowSize: number,
    color: string
}
export const useStyles = makeStyles(theme => ({
    root: (props:Props) => ({
        position:'absolute',
        top: props.arrowPos[1],
        left: props.arrowPos[0],
        zIndex:100,
        transform: `translate(calc(-50% - ${props.arrowSize/2}px),calc(-100% - ${props.arrowSize}px))`,
        border: '1px solid grey',
        borderRadius: '5px',
        backgroundColor: props.color,
        minWidth: '50px',
        padding: 2,
        '&::after' : {
            position: 'absolute',
            content: '""',
            left: `calc(50% - ${props.arrowSize/2}px)`,
            top: "calc(100% + 1px )",
            border: `${props.arrowSize}px solid ${props.color}`,
            borderLeftColor: 'transparent',
            borderBottomColor: 'transparent',
            borderRightColor: 'transparent'
        }
    })
}))