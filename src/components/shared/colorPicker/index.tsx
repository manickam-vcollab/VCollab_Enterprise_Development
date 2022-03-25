import { SketchPicker } from 'react-color';

type Color = {
    r:number,
    g:number,
    b:number,
    a?:number,
}

interface ColorPickerProps {
    color : Color,
    onChangeComplete ?: (color : Color, undoable?: boolean) => void,
}

export default function ColorPicker(props : ColorPickerProps) {
    return(
        <SketchPicker  
               {...props} 
               onChangeComplete = { (color) => props.onChangeComplete ? props.onChangeComplete({r : color.rgb.r , g: color.rgb.g, b: color.rgb.b, a:color.rgb.a,}, true) : null}
               presetColors={[]}
               disableAlpha ={true}                 
        />
    )
}