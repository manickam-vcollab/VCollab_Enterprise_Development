
export const orthoToPerspective = (left:number,right:number,top:number,bottom:number,near:number,far:number):{fov:number,aspect:number,near:number,far:number} => {
    let fov = 2 * 180 / Math.PI * (Math.atan2(top, near));
    let aspect = (right -left) / (top - bottom);
    return {
        fov,
        aspect,
        near,
        far
    }
}

export const perspectiveToOrtho = (fov:number,aspect:number,near:number,far:number) => {
  let top:number, bottom:number, left:number, right:number;
  top = near * Math.tan(fov/2*Math.PI/180);
  bottom = -top;
  right = top * aspect;
  left = -right;
  return {
      left,
      right,
      top,
      bottom,
      near,
      far
  }
}