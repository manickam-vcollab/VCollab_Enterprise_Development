import {mat4, vec3} from 'gl-matrix'
import { EPSILON } from '../../config';
export const getPerpendicular = (input: vec3):vec3 => {
    const n = vec3.create();
    vec3.normalize(n,input);
    const X = vec3.fromValues(1,0,0);
    const Y = vec3.fromValues(0,1,0);
    const Z = vec3.fromValues(0,0,1);

    let dots = [Math.abs(vec3.dot(input,X)),Math.abs(vec3.dot(input,Y)),Math.abs(vec3.dot(input,Z))]

    let minIndex = getMinIndex(dots);
    let i = vec3.create();
    let n1 = n[0];
    let n2 = n[1];
    let n3 = n[2];
    switch (minIndex) {
        case 0:
            i = vec3.fromValues(1-n1*n1,-n1*n2,-n1*n3);
            break;
        case 1:
            i = vec3.fromValues(-n1*n2,1-n2*n2,-n2*n3);
            break;
        case 2:
            i = vec3.fromValues(-n1*n3,-n2*n3,1-n3*n3);
            break;
        default:
            break;
    }
    vec3.normalize(i,i);
    return i
}

export const getMinIndex = (arr:number[]):number => {
    return arr.indexOf(Math.min(...arr))
}

export const getOrthoAxes = (input:vec3) :{x:vec3,y:vec3}=> {
    let i = getPerpendicular(input);
    let n = vec3.create();
    let j = vec3.create();
    vec3.normalize(n,input);
    vec3.cross(j,n,i);
    return {
        x:i,
        y:j
    }
}

export const projectPointOnPlane = (n:vec3,d:number,point:vec3): vec3 => {
    let out = vec3.create(); 
    vec3.copy(out, n );
    let s = vec3.dot(n, point ) - d;
    vec3.scale(out,out, -s);
    return vec3.add(out,out,point);
}

export const getNormalizedEqn = (eqn:[number,number,number,number]):[number,number,number,number] => {
    let n = vec3.fromValues(eqn[0],eqn[1],eqn[2]);
    let l = vec3.len(n);
    vec3.normalize(n,n);
    let r = eqn[3]/l;
    return [n[0],n[1],n[2],r];
}
export const getWorldTransformFromPlaneEqn = (eqn:[number,number,number,number],center:vec3 = vec3.create()):mat4 =>{
    let n = vec3.fromValues(eqn[0],eqn[1],eqn[2]);
    vec3.normalize(n,n);
    let {x,y} = getOrthoAxes(n);
    let c = projectPointOnPlane(n,eqn[3],center);
    return mat4.fromValues(
        x[0],x[1],x[2],0,
        y[0],y[1],y[2],0,
        n[0],n[1],n[2],0,
        c[0],c[1],c[2],1
    )
}

export const planeEqnFrom3pts = (p1:vec3,p2:vec3,p3:vec3):number[] | undefined => {
    const kEdge1 = vec3.create();
    const kEdge2 = vec3.create(); 
    vec3.sub(kEdge1,p2,p1)
    vec3.sub(kEdge2,p3,p1)
    const n = vec3.create();
    vec3.cross(n,kEdge1,kEdge2);
    vec3.normalize(n,n);
    let d = vec3.dot(n,p1);
    if(vec3.sqrLen(n) > EPSILON){
        const eqn = [n[0],n[1],n[2] ,d];
        return eqn;
    }
    return undefined;
}