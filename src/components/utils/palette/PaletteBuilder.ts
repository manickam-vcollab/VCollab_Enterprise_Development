import { PaletteColor } from "../palette/types/palette"
import { LegendType, LegendDirection, LegendTicsType, LegendValuePlacement, LegendTitlePlacement  } from '../../../store/sideBar/colormapSlice';

import {setWindowSize} from '../../../store/windowMgrSlice';

type PaletteElementOptions = {
    x: number;
    y: number;
    width: number;
    height: number;
    colorTop: string;
    colorBottom: string;
    textTop: string;
    textCenter: string;
    textBottom: string;
    textColor: string;
    valueType: ValueType;
    title:string;
    paletteType: LegendType;
    paletteDirection: LegendDirection;
    valuePlacement: LegendValuePlacement;
    titlePlacement: LegendTitlePlacement;
    ticks: LegendTicsType;
    gap:number;
    valuePlacementRight:number;  
    valuePlacementLeft:number;   
    valuePlacementTop:number;   
    valuePlaceentBottom:number;  
}
enum ValueType {
    NA = 'na',
    FLOAT = 'float'
}
class PaletteElement {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private colorTop: string;
    private colorBottom: string;
    private textTop: string;
    private textCenter: string;
    private textBottom: string;
    private textColor: string;
    private valueType: ValueType;
    private title :string;
    private paletteType: LegendType;
    private paletteDirection: LegendDirection;
    private valuePlacement: LegendValuePlacement;
    private titlePlacement: LegendTitlePlacement;
    private ticks: LegendTicsType;
    private gap:number;



    constructor(options: PaletteElementOptions) {
        this.x = options.x;
        this.y = options.y;
        this.width = options.width;
        this.height = options.height;
        this.colorTop = options.colorTop;
        this.colorBottom = options.colorBottom;
        this.textTop = options.textTop;
        this.textCenter = options.textCenter;
        this.textBottom = options.textBottom;
        this.textColor = options.textColor;
        this.valueType = options.valueType;
        this.title = options.title;
        this.paletteType = options.paletteType;
        this.paletteDirection = options.paletteDirection;
        this.valuePlacement = options.valuePlacement;
        this.titlePlacement = options.titlePlacement;
        this.ticks = options.ticks;
        this.gap = options.gap;
    }

    draw(ctx: CanvasRenderingContext2D, paletteCount: number, colorCountLength: number , paletteElementGap:number) {

         this.setGap(paletteElementGap);
         this.createPaletteFillColor(ctx , paletteElementGap);
         this.createTicPosition(ctx , colorCountLength,paletteCount);
         this.setValuePosition(ctx,paletteElementGap,paletteCount);

    }

    setGap(paletteElementGap:number) {

        if(this.paletteDirection === LegendDirection.VERTICAL) {

            this.height = this.height - paletteElementGap

        }

        if(this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO) {

           this.width = this.width -  paletteElementGap

        }


    }

    createPaletteFillColor(ctx: CanvasRenderingContext2D ,paletteElementGap:number) {

        
        if(this.paletteType === LegendType.DISCRETE) {

            ctx.fillStyle = this.colorTop;
            ctx.fillRect(this.x,this.y,this.width,this.height);

        }

        if(this.paletteType === LegendType.CONTINUOUS) {

            let grd:any ;

            if(this.paletteDirection === LegendDirection.VERTICAL) {

               grd = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);

            }

            if(this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) {

              grd = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y);
            }

            grd.addColorStop(0, this.colorTop);
            grd.addColorStop(1, this.colorBottom);
            ctx.fillStyle = grd;
            ctx.fillRect(this.x, this.y, this.width, this.height);

        }
    }

    createTicPosition(ctx: CanvasRenderingContext2D ,colorCountLength:number,paletteCount:number) {

        if(this.paletteType === LegendType.DISCRETE) {


            if(this.paletteDirection === LegendDirection.VERTICAL) {

            // Tic position based on value position 
                if (this.ticks === LegendTicsType.NO_TICS) {
        


                }

                if(this.ticks === LegendTicsType.INSIDE) {

                      if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width - 10, this.y + this.height / 2);

                      }

                      if(this.valuePlacement === LegendValuePlacement.LEFT) { 

                        this.drawTic(ctx,this.x,this.y + this.height / 2,this.x+10, this.y + this.height / 2);
                      }

                      if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            
                            this.drawTic(ctx,this.x,this.y + this.height / 2,this.x+10, this.y + this.height / 2);

                           }
                           else {

                            this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width - 10, this.y + this.height / 2);

                           }


                          

                      }


                }

                if(this.ticks === LegendTicsType.OUTSIDE) {

                      if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);

                      }

                      if(this.valuePlacement === LegendValuePlacement.LEFT) { 

                        this.drawTic(ctx,this.x,this.y + this.height / 2,this.x-10, this.y + this.height / 2);
                      }

                      if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            
                            this.drawTic(ctx,this.x,this.y + this.height / 2,this.x-10, this.y + this.height / 2);

                           }
                           else {

                            this.drawTic(ctx,this.x+this.width, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);

                           }


                          

                      }


                }

                if(this.ticks === LegendTicsType.RUNNING_ACROSS) {

                      if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);

                      }

                      if(this.valuePlacement === LegendValuePlacement.LEFT) { 

                        this.drawTic(ctx,this.x+this.width,this.y + this.height / 2,this.x-10, this.y + this.height / 2);
                      }

                      if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x+this.width,this.y + this.height / 2,this.x-10, this.y + this.height / 2);

                           }
                           else {

                            this.drawTic(ctx,this.x, this.y + this.height / 2,this.x + this.width + 10, this.y + this.height / 2);

                           }


                          

                      }
                }

            }

            if(this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) { 

                if (this.ticks === LegendTicsType.NO_TICS) {
        


                }

                if(this.ticks === LegendTicsType.INSIDE) {

                      if(this.valuePlacement === LegendValuePlacement.TOP) {

                        this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y+10);

                      }

                      if(this.valuePlacement === LegendValuePlacement.BOTTOM) { 

                        this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height - 10);
                      }

                      if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            
                            this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y+10);

                           }
                           else {

                            this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height - 10);

                           }


                          

                      }


                }

                if(this.ticks === LegendTicsType.OUTSIDE) {

                      if(this.valuePlacement === LegendValuePlacement.TOP) {

                        this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y-10);

                      }

                      if(this.valuePlacement === LegendValuePlacement.BOTTOM) { 

                        this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height + 10);
                      }

                      if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x + this.width / 2, this.y + this.height,this.x + this.width / 2, this.y + this.height + 10);

                           }
                           else {

                            this.drawTic(ctx,this.x+this.width/2,this.y,this.x+this.width/2,this.y-10);

                          
                           }


                          

                      }


                }

                if(this.ticks === LegendTicsType.RUNNING_ACROSS) {

                      if(this.valuePlacement === LegendValuePlacement.TOP) {

                        this.drawTic(ctx,this.x+this.width/2,this.y+this.height,this.x+this.width/2,this.y-10);

                      }

                      if(this.valuePlacement === LegendValuePlacement.BOTTOM) { 

                        this.drawTic(ctx,this.x + this.width / 2, this.y ,this.x + this.width / 2, this.y + this.height + 10);
                      }

                      if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x + this.width / 2, this.y ,this.x + this.width / 2, this.y + this.height + 10);

                           }
                           else {

                            this.drawTic(ctx,this.x+this.width/2,this.y+this.height,this.x+this.width/2,this.y-10);

                           }


                          

                      }
                }


            }


        }

        if(this.paletteType === LegendType.CONTINUOUS) {

            if(this.paletteDirection === LegendDirection.VERTICAL) {

                if (this.ticks === LegendTicsType.NO_TICS) {
        


                }

                if(this.ticks === LegendTicsType.INSIDE) {

                     if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x + this.width, this.y,this.x + this.width - 10, this.y);
                     
                        // Create End Tic     
                        if(colorCountLength-1 === paletteCount) {

                          this.drawTic(ctx,this.x + this.width, this.y+this.height,this.x + this.width - 10, this.y+this.height);
                          

                        }

                     }
                     if(this.valuePlacement === LegendValuePlacement.LEFT) {

                        this.drawTic(ctx,this.x, this.y ,this.x + 10, this.y );

                        // Create End Tic     
                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x, this.y+this.height ,this.x + 10, this.y+this.height);
  
                          }
                         
                     }
                     if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {


                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x, this.y ,this.x + 10, this.y );

                           }
                           else {

                            this.drawTic(ctx,this.x + this.width, this.y,this.x + this.width - 10, this.y);

                           }

                           if(colorCountLength-1 === paletteCount) {

                                if (count % 2 === 0) {

                                    this.drawTic(ctx,this.x + this.width, this.y+this.height,this.x + this.width - 10, this.y+this.height);

                                }
                                else {

                                    this.drawTic(ctx,this.x, this.y+this.height ,this.x + 10, this.y+this.height );

                                }
  
                          }


                         
                     }
                }

                if(this.ticks === LegendTicsType.OUTSIDE) {


                    if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x + this.width, this.y,this.x + this.width + 10, this.y);

                        // Create End Tic     
                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x + this.width, this.y+this.height,this.x + this.width + 10, this.y+this.height);
                            
  
                        }

                     }
                    if(this.valuePlacement === LegendValuePlacement.LEFT) {

                        this.drawTic(ctx,this.x, this.y ,this.x - 10, this.y );

                        // Create End Tic     
                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x, this.y+this.height ,this.x - 10, this.y+this.height);
  
                          }
                         
                     }
                    if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {


                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x, this.y ,this.x - 10, this.y );

                           }
                           else {

                            this.drawTic(ctx,this.x + this.width, this.y,this.x + this.width + 10, this.y);

                           }

                           if(colorCountLength-1 === paletteCount) {

                            if (count % 2 === 0) {

                                this.drawTic(ctx,this.x + this.width, this.y+this.height,this.x + this.width + 10, this.y+this.height);

                            }
                            else {

                                this.drawTic(ctx,this.x, this.y+this.height ,this.x - 10, this.y+this.height );

                            }

                      }


                         
                     }


                }

                if(this.ticks === LegendTicsType.RUNNING_ACROSS) {

                    if(this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.drawTic(ctx,this.x, this.y,this.x + this.width + 10, this.y);

                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x, this.y+this.height,this.x + this.width + 10, this.y+this.height);
                            
  
                        }

                     }
                    if(this.valuePlacement === LegendValuePlacement.LEFT) {

                        this.drawTic(ctx,this.x+this.width, this.y ,this.x - 10, this.y );

                         // Create End Tic     
                         if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x+this.width, this.y+this.height ,this.x - 10, this.y+this.height );
                            
  
                        }

                        
                         
                     }
                    if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {


                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x+this.width, this.y ,this.x - 10, this.y );

                           }
                           else {

                            this.drawTic(ctx,this.x, this.y,this.x + this.width + 10, this.y);

                           }

                           if(colorCountLength-1 === paletteCount) {

                            if (count % 2 === 0) {

                                this.drawTic(ctx,this.x, this.y+this.height,this.x + this.width + 10, this.y+this.height);

                            }
                            else {

                                this.drawTic(ctx,this.x+this.width, this.y+this.height ,this.x - 10, this.y+this.height );

                            }

                      }


                         
                     }
                }

            }

            if(this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) {

                if (this.ticks === LegendTicsType.NO_TICS) {
        


                }

                if(this.ticks === LegendTicsType.INSIDE) {


                     if(this.valuePlacement === LegendValuePlacement.TOP) {

                        this.drawTic(ctx,this.x, this.y,this.x, this.y + 10);

                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x+this.width, this.y,this.x+this.width, this.y + 10);
                            
                        }

                     }
                     if(this.valuePlacement === LegendValuePlacement.BOTTOM) {

                        this.drawTic(ctx,this.x, this.y + this.height,this.x, this.y + this.height - 10);

                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x+this.width, this.y + this.height,this.x+this.width, this.y + this.height - 10);
                            
                          }
                         
                     }
                     if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {


                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x, this.y + this.height,this.x, this.y + this.height - 10);

                           }
                           else {

                            this.drawTic(ctx,this.x, this.y,this.x, this.y + 10);

                           }

                           if(colorCountLength-1 === paletteCount) {

                            if (count % 2 === 0) {

                                this.drawTic(ctx,this.x+this.width, this.y,this.x+this.width, this.y + 10);

                            }
                            else {

                                this.drawTic(ctx,this.x+this.width, this.y + this.height,this.x+this.width, this.y + this.height - 10);

                            }

                      }


                         
                     }
                }

                if(this.ticks === LegendTicsType.OUTSIDE) {


                     if(this.valuePlacement === LegendValuePlacement.TOP) {

                        this.drawTic(ctx,this.x, this.y,this.x, this.y - 10);

                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x+this.width, this.y,this.x+this.width, this.y - 10);
                            
                        }

                     }
                     if(this.valuePlacement === LegendValuePlacement.BOTTOM) {

                        this.drawTic(ctx,this.x, this.y + this.height,this.x, this.y + this.height + 10);

                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x+this.width, this.y + this.height,this.x+this.width, this.y + this.height + 10);
                            
                        }
                         
                     }
                     if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x, this.y + this.height,this.x, this.y + this.height + 10);

                           }
                           else {

                            this.drawTic(ctx,this.x, this.y,this.x, this.y - 10);

                           }


                           if(colorCountLength-1 === paletteCount) {

                            if (count % 2 === 0) {

                                this.drawTic(ctx,this.x+this.width, this.y,this.x+this.width, this.y - 10);

                            }
                            else {

                                this.drawTic(ctx,this.x+this.width, this.y + this.height,this.x+this.width, this.y + this.height + 10);

                            }

                      }


                         
                     }

                }

                if(this.ticks === LegendTicsType.RUNNING_ACROSS) {

                     if(this.valuePlacement === LegendValuePlacement.TOP) {

                        this.drawTic(ctx,this.x, this.y+this.height,this.x, this.y - 10);

                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x+this.width, this.y+this.height,this.x+this.width, this.y - 10);
                            
                        }

                     }
                     if(this.valuePlacement === LegendValuePlacement.BOTTOM) {

                        this.drawTic(ctx,this.x, this.y ,this.x, this.y + this.height + 10);

                        if(colorCountLength-1 === paletteCount) {

                            this.drawTic(ctx,this.x+this.width, this.y ,this.x+this.width, this.y + this.height + 10);
                            
                        }
                         
                     }
                     if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {


                        let count = paletteCount + 1;

                           if (count % 2 === 0) {

                            this.drawTic(ctx,this.x, this.y ,this.x, this.y + this.height + 10);

                           }
                           else {

                            this.drawTic(ctx,this.x, this.y+this.height,this.x, this.y - 10);

                           }


                           if(colorCountLength-1 === paletteCount) {

                            if (count % 2 === 0) {

                                this.drawTic(ctx,this.x+this.width, this.y+this.height,this.x+this.width, this.y - 10);

                            }
                            else {

                                this.drawTic(ctx,this.x+this.width, this.y ,this.x+this.width, this.y + this.height + 10);

                            }

                           }


                         
                     }
                }

            }


        }


    }

    drawTic(ctx: CanvasRenderingContext2D,X1:number , Y1:number ,X2:number , Y2:number) {

        ctx.beginPath();
        ctx.moveTo(X1,Y1);
        ctx.lineTo(X2,Y2);
        ctx.stroke();


    }

    setValuePosition(ctx: CanvasRenderingContext2D ,paletteElementGap:number,paletteCount:number) {

        let count = paletteCount+1;

        if(this.paletteType === LegendType.DISCRETE) {

            const text = this.valueType === ValueType.NA ? 'NA' : this.textCenter;

            if(this.paletteDirection === LegendDirection.VERTICAL) {

                    if (this.valuePlacement === LegendValuePlacement.RIGHT) {

                        this.setTextPosition(ctx,text, this.x + this.width + 15, this.y + this.height / 2);
        
                    }

                    if (this.valuePlacement === LegendValuePlacement.LEFT) {

                        this.setTextPosition(ctx,text, this.x - 15, this.y + this.height / 2);
        
                    }

                    if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                        if (count % 2 === 0) {

                            ctx.textAlign = "right";
                            this.setTextPosition(ctx,text, this.x - 15, this.y + this.height / 2);

                        }
                        else {
        
                            ctx.textAlign = "left";
                            this.setTextPosition(ctx,text , this.x + this.width + 15, this.y + this.height / 2);
                        }
        
                    }

                    ctx.textAlign = "left";

            }

            if(this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) {

                  if(this.valuePlacement === LegendValuePlacement.TOP) {

                    this.setTextPosition(ctx,text,this.x+this.width/2,this.y-15);

                  }

                  if(this.valuePlacement === LegendValuePlacement.BOTTOM) { 

                    this.setTextPosition(ctx,text,this.x + this.width / 2, this.y + this.height +15);
                  }

                  if(this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                    let count = paletteCount + 1;

                       if (count % 2 === 0) {

                        this.setTextPosition(ctx,text,this.x + this.width / 2, this.y + this.height +15);

                       }
                       else {

                        this.setTextPosition(ctx,text,this.x+this.width/2,this.y-15);

                       }


                      

                  }


            }

        }

        if(this.paletteType === LegendType.CONTINUOUS) {

            const textTop = this.valueType === ValueType.NA ? 'NA' : this.textTop;
            const textBtm = this.valueType === ValueType.NA ? 'NA' : this.textBottom;


            if(this.paletteDirection === LegendDirection.VERTICAL) {

                if (this.valuePlacement === LegendValuePlacement.RIGHT) {  
                    if (textTop !== ValueType.NA && textTop)
                        this.setTextPosition(ctx,textTop, this.x + this.width + 15, this.y);
                    if (textBtm !== ValueType.NA && textBtm)
                        this.setTextPosition(ctx,textBtm, this.x + this.width + 15, this.y + this.height + paletteElementGap);

                }

                if (this.valuePlacement === LegendValuePlacement.LEFT) {

                    if (textTop !== ValueType.NA && textTop)
                      this.setTextPosition(ctx,textTop, this.x - 15, this.y)
                    if (textBtm !== ValueType.NA && textBtm)
                      this.setTextPosition(ctx,textBtm, this.x - 15, this.y + this.height + paletteElementGap);

                }

                if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {

                    if (count === 1) {
                        ctx.textAlign = "left";
                        this.setTextPosition(ctx,textTop, this.x + this.width + 15, this.y);
                        ctx.textAlign = "right";
                        this.setTextPosition(ctx,textBtm, this.x - 15, this.y + this.height + paletteElementGap);

                    }

                    if (count % 2 === 0) {

                        ctx.textAlign = "left";
                        this.setTextPosition(ctx,textBtm, this.x + this.width + 15, this.y + this.height + paletteElementGap)

                    }
                    else if (count !== 1) {

                        ctx.textAlign = "right";
                        this.setTextPosition(ctx,textBtm, this.x - 15, this.y + this.height + paletteElementGap);

                    }

                }

                ctx.textAlign = "left";
            }

            if(this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) {


                if (this.valuePlacement === LegendValuePlacement.TOP) {

                    if (textTop !== ValueType.NA && textTop)
    
                        this.setTextPosition(ctx,textTop, this.x, this.y - 15);
    
                    if (textBtm !== ValueType.NA && textBtm)
    
                        this.setTextPosition(ctx,textBtm, this.x + this.width + paletteElementGap, this.y - 15);
    
                }
    
                if (this.valuePlacement === LegendValuePlacement.BOTTOM) {
    
    
                    if (textTop !== ValueType.NA && textTop)
    
                    this.setTextPosition(ctx,textTop, this.x, this.y + this.height + 15);
    
                    if (textBtm !== ValueType.NA && textBtm)
    
                    this.setTextPosition(ctx,textBtm, this.x + this.width + paletteElementGap, this.y + this.height + 15);
    
                }
    
    
                if (this.valuePlacement === LegendValuePlacement.ALTERNATING) {
    
    
                    if (count === 1) {
    
                        this.setTextPosition(ctx,textTop, this.x, this.y - 15);
                        this.setTextPosition(ctx,textBtm, this.x + this.width + paletteElementGap, this.y + this.height + 15);
    
                    }
    
    
                    if (count % 2 === 0) {
    
                        this.setTextPosition(ctx,textBtm, this.x + this.width + paletteElementGap, this.y - 15);
    
                    }
                    else if (count !== 1) {
    
    
                        this.setTextPosition(ctx,textBtm, this.x + this.width+paletteElementGap, this.y + this.height + 15);
    
                    }
    
                }

                
            }



        }
    }

    setTextPosition(ctx: CanvasRenderingContext2D,Text:string,positionX:number , positonY:number) {

        ctx.fillStyle = this.textColor;
        if(this.valuePlacement === LegendValuePlacement.LEFT) {
            ctx.textAlign = "right";
        }

        ctx.fillText(Text, positionX, positonY);

    }

    setTitlePosition(ctx: CanvasRenderingContext2D , count:number , paletteGap:number ,colorCountLength:number ) {

        // function will call only one time 

        if (this.paletteDirection === LegendDirection.VERTICAL) {

            if (count === 0) {

                this.verticalTitlePlacement(ctx, colorCountLength ,paletteGap);

            }



        }

    // function will call only one time     

        else if (this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) {

            if (count === 0) {

                this.horizontalTitlePlacement(ctx, colorCountLength,paletteGap);


            }
        }


    }

    verticalTitlePlacement(ctx: CanvasRenderingContext2D,colorCountLength:number ,paletteGap:number ) {

        let legendHeight:number = 0 ;
        let paletteTotalGap = (paletteGap * colorCountLength);
        colorCountLength = colorCountLength +1;
        legendHeight = (this.height * colorCountLength) ; 
        legendHeight = legendHeight+ paletteTotalGap;


        if (this.titlePlacement === LegendTitlePlacement.TOP) {

            ctx.fillText(this.title, this.x, this.y - 20);

        }

        else if (this.titlePlacement === LegendTitlePlacement.BOTTOM) {

            ctx.fillText(this.title, this.x, (legendHeight+50) );

        }


    }

    horizontalTitlePlacement(ctx: CanvasRenderingContext2D ,colorCountLength:number ,paletteGap:number) {


        let legendWidth:number = 0 ;
        let paletteTotalGap = (paletteGap * colorCountLength);
        colorCountLength = colorCountLength ;
        legendWidth = (this.width * colorCountLength) ; 
        legendWidth = legendWidth + paletteTotalGap;



        switch (true) {

            case this.titlePlacement === LegendTitlePlacement.TOP_LEFT:

                return ctx.fillText(this.title, this.x, this.y - 40);

            case this.titlePlacement === LegendTitlePlacement.TOP_MIDDLE:

                return ctx.fillText(this.title, (this.x + legendWidth / 2) , this.y - 40);

            case this.titlePlacement === LegendTitlePlacement.TOP_RIGHT:

                return ctx.fillText(this.title, (this.x + legendWidth) , this.y - 40);

            case this.titlePlacement === LegendTitlePlacement.BOTTOM_LEFT:

                return ctx.fillText(this.title, this.x, this.y + this.height + 40);

            case this.titlePlacement === LegendTitlePlacement.BOTTOM_MIDDLE:

                return ctx.fillText(this.title, this.x + legendWidth / 2, this.y + this.height + 40);

            case this.titlePlacement === LegendTitlePlacement.BOTTOM_RIGHT:

                return ctx.fillText(this.title, this.x + legendWidth, this.y + this.height + 20);

        }


    }


}

export class Palette {
    private position: { x: number, y: number};
    private width: number;
    private height: number;
    private bandWidth: number;
    private bandHeight: number;
    private textColor: string;
    private textAlign: string;
    private font: string;
    private baseline: string;
    private minMax: [number, number];
    private colors: string[];
    private values: number[];
    private title:string;
    private paletteType: LegendType;
    private paletteDirection: LegendDirection;
    private valuePlacement: LegendValuePlacement;
    private titlePlacement: LegendTitlePlacement;
    private scale: string;
    private paletteElements: PaletteElement[];
    private ticks: LegendTicsType;
    private gap:number;

    constructor() {
        this.position = { x: 50, y: 50 };
        this.bandWidth = 0;
        this.bandHeight = 0;
        this.baseline = 'middle';
        this.colors = ['#ee4035', '#f37736', '#fdf498', '#7bc043', '#ee4035', '#f37736', '#fdf498'];
        this.values = [100, 50, 30, 0, 10, 15, 20];
        this.title = "Legend";
        this.paletteType = LegendType.DISCRETE;
        this.ticks = LegendTicsType.RUNNING_ACROSS;
        this.paletteDirection = LegendDirection.VERTICAL;
        this.valuePlacement = LegendValuePlacement.RIGHT;
        this.titlePlacement = LegendTitlePlacement.TOP;
        this.gap = 0;
        this.width = 0;
        this.height = 0;
        this.minMax = [0, 10];
        this.scale = 'linear';
        this.font = '12px Times New Roman'
        this.textColor = 'black';
        this.textAlign = 'middle';
        this.paletteElements = [];
    }

    draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number,) {

        ctx.font = this.font;
        ctx.textAlign = this.textAlign as any;
        ctx.textBaseline = this.baseline as any;

        var xOffset = 0;
        var yOffset = 0;
        const colorCount = this.paletteType === LegendType.CONTINUOUS ? (this.colors.length - 1) : this.colors.length;


        if (this.paletteDirection === LegendDirection.VERTICAL) {

            this.bandWidth = canvasWidth - 100;
            this.bandHeight = (canvasHeight - 100) / this.colors.length;

            xOffset = 0;
            yOffset = this.bandHeight;
        }

        else if (this.paletteDirection === LegendDirection.HORIZONTAL || this.paletteDirection === LegendDirection.AUTO ) {

            this.bandWidth = (canvasWidth - 100)  / this.colors.length;
            this.bandHeight = canvasHeight - 100;

            xOffset = this.bandWidth;
            yOffset = 0;
        }


        for (let i = 0; i < colorCount; i++) {
            const options = {
                x: this.position.x + i * xOffset,
                y: this.position.y + i * yOffset,
                width: this.bandWidth,
                height: this.bandHeight,
                colorTop: this.colors[i],
                title:this.title,
                colorBottom: this.paletteType === LegendType.CONTINUOUS ? this.colors[i + 1] : this.colors[i],
                textTop: this.paletteType === LegendType.CONTINUOUS && i === 0 ? (this.values[i]).toString() : null,
                textCenter: this.paletteType === LegendType.DISCRETE ? (this.values[i]).toString() : null,
                textBottom: this.paletteType === LegendType.CONTINUOUS ? (this.values[i + 1]).toString() : null,
                textColor: this.textColor,
                valueType: ValueType.FLOAT,
                paletteDirection: this.paletteDirection,
                paletteType: this.paletteType,
                valuePlacement: this.valuePlacement,
                titlePlacement: this.titlePlacement,
                ticks: this.ticks
            } as PaletteElementOptions;
            const paletteElement = new PaletteElement(options);
            paletteElement.draw(ctx, i, colorCount ,this.gap);
            paletteElement.setTitlePosition(ctx, i, this.gap,colorCount);
        }


    }

    // Set selected legend settings data 

    setPaletteType(type: any) {

        if (type === LegendType.AUTO) {

            this.paletteType = LegendType.DISCRETE;

        }
        else if (type === LegendType.CONTINUOUS) {

            this.paletteType = LegendType.CONTINUOUS;

        }
        else if (type === LegendType.DISCRETE) {

            this.paletteType = LegendType.DISCRETE;

        }
    }

    setPaletteDirection(direction: any) {

        if (direction === LegendDirection.AUTO) {

            this.paletteDirection = LegendDirection.HORIZONTAL;

        }
        else if (direction === LegendDirection.HORIZONTAL) {

            this.paletteDirection = LegendDirection.HORIZONTAL;

        }
        else if (direction === LegendDirection.VERTICAL) {

            this.paletteDirection = LegendDirection.VERTICAL;


        }
    }

    setPaletteTickPosition(tick: any) {

        if (tick === LegendTicsType.NO_TICS) {

            this.ticks = LegendTicsType.NO_TICS;
        }
        else if (tick === LegendTicsType.INSIDE) {

            this.ticks = LegendTicsType.INSIDE;

        }
        else if (tick === LegendTicsType.OUTSIDE) {

            this.ticks = LegendTicsType.OUTSIDE;

        }

        else if (tick === LegendTicsType.RUNNING_ACROSS) {

            this.ticks = LegendTicsType.RUNNING_ACROSS;
        }

    }

    setPaletteTittlePlacement(tittle: any) {

         if (tittle === LegendTitlePlacement.BOTTOM) {

            this.titlePlacement = LegendTitlePlacement.BOTTOM;

        }
        else if (tittle === LegendTitlePlacement.BOTTOM_LEFT) {

            this.titlePlacement = LegendTitlePlacement.BOTTOM_LEFT;

        }

        else if (tittle === LegendTitlePlacement.BOTTOM_MIDDLE) {

            this.titlePlacement = LegendTitlePlacement.BOTTOM_MIDDLE;
        }

        else if (tittle === LegendTitlePlacement.BOTTOM_RIGHT) {

            this.titlePlacement = LegendTitlePlacement.BOTTOM_RIGHT;
        }

        else if (tittle === LegendTitlePlacement.TOP) {

            this.titlePlacement = LegendTitlePlacement.TOP;
        }

        else if (tittle === LegendTitlePlacement.TOP_LEFT) {

            this.titlePlacement = LegendTitlePlacement.TOP_LEFT;
        }

        else if (tittle === LegendTitlePlacement.TOP_MIDDLE) {

            this.titlePlacement = LegendTitlePlacement.TOP_MIDDLE;
        }

        else if (tittle === LegendTitlePlacement.TOP_RIGHT) {

            this.titlePlacement = LegendTitlePlacement.TOP_RIGHT;
        }

    }

    setPaletteValuePlacement(value: any) {

        if (value === LegendValuePlacement.BOTTOM) {

            this.valuePlacement = LegendValuePlacement.BOTTOM;

        }
        else if (value === LegendValuePlacement.LEFT) {

            this.valuePlacement = LegendValuePlacement.LEFT;

        }

        else if (value === LegendValuePlacement.RIGHT) {

            this.valuePlacement = LegendValuePlacement.RIGHT;
        }

        else if (value === LegendValuePlacement.TOP) {

            this.valuePlacement = LegendValuePlacement.TOP;
        }

        else if (value === LegendValuePlacement.ALTERNATING) {

            this.valuePlacement = LegendValuePlacement.ALTERNATING;
        }


    }

    setPaletteColor(colors:any) {

        this.colors = colors;

    }

    setPaletteValue(values:any) {

        this.values = values


    }

    setPaletteGap(Gap:number) {

        this.gap = Gap;
    }

    setLegendTitle(title:any) {

        this.title = title;
    }
}

export class PaletteBuilder {

    palette: Palette;
    constructor() {
        this.palette = new Palette();
    }
    build() {
        return this.palette
    }
}