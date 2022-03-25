interface IPalette {
    position: {x:number, y: number},
    width: number,
    height: number,
    bandWidth: number,
    bandHeight: number,
    textColor: string,
    baseline: string,
    minMax: [number,number],
    colors: PaletteColor[],
    values: number[],
    colorOrder: number,
    valueType: string,
    scale: string,
    draw: (ctx:CanvasRenderingContext2D) => void
}

enum PaletteType{
    SYSTEM,
    USER_DEFINED
}

export type PaletteColor = {
    r: number,
    g: number,
    b: number,
    a: number
}

export type PaletteElement = {
    font: string,
    color: string,
    textAlign: string,

}
