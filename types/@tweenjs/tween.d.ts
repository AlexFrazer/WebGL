declare module '@tweenjs/tween.js' {
  interface Point3D {
    readonly x: number;
    readonly y: number;
    readonly z: number;
  }
  export const Easing: any;
  export class Tween {
    constructor(point: Point3D);
    to(point: Point3D, duration: number): Tween;
    easing(easing: typeof Easing): Tween;
    onUpdate(cb: (point: Point3D) => void): Tween;
    start(): void;
  }
  export function update(): void;
}
