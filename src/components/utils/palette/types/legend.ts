enum LegendType{
    DISCRETE,
    CONTINUOUS
}
enum LegendDirection{
    AUTO,
    VERTICAL,
    HORIZONTAL
}
enum LegendTicsType{
    INSIDE,
    OUTSIDE,
    NO_TICS,
    RUNNING_ACROSS
}
enum LegendTitlePlacement{
    AUTO,
    TOP,
    BOTTOM,
    TOP_LEFT,
    TOP_MIDDLE,
    TOP_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_MIDDLE,
    BOTTOM_RIGHT,
}
enum LegendValuePlacement{
    AUTO,
    LEFT,
    RIGHT,
    TOP,
    BOTTOM,
    ALTERNATING
}

interface ILegendSettings{
    uid:string;
    type: LegendType;
    direction: LegendDirection;
    ticPosition: LegendTicsType;
    titlePlacement: LegendTitlePlacement;
    valuePlacement: LegendValuePlacement;
    gap: number;
}

export {LegendType, LegendTicsType}