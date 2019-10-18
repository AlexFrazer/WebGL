import { Vector3, PerspectiveCamera } from 'three';
import Tween from '@tweenjs/tween.js';
import camera from './camera';

console.log(Tween.Easing);

interface ModelTarget {
  new (...args: any[]): {
    [key: string]: unknown;
    render(): void;
  };
}

/**
 * Runs a render loop on keyframe.
 * Anything in `render` will happen each frame.
 * @param target
 */
export function Model<T extends ModelTarget>(target: T): ModelTarget {
  if (!('render' in target.prototype)) {
    return target;
  }
  return class extends target {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...props: any[]) {
      super(...props);
      this.render();
    }

    render = (): void => {
      window.requestAnimationFrame(this.render);
      super.render();
    };
  };
}

export function handler<T>(
  eventName: keyof WindowEventMap,
  propagates = false,
) {
  return (target: T, key: keyof T): void => {
    if (target[key] instanceof Function) {
      const boundFn = ((target[key] as unknown) as EventHandlerNonNull).bind(
        target,
      );
      window.addEventListener(eventName, boundFn, propagates);
    }
  };
}

interface Point3D {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export function tweenCamera(
  { x: targetX, y: targetY, z: targetZ }: Point3D,
  {
    camera: { position: { x: originX, y: originY, z: originZ } } = camera,
    easing: easing = Tween.Easing.Quadratic.InOut,
    onComplete = () => {},
  } = {},
): void {
  new Tween.Tween({
    x: originX,
    y: originY,
    z: originZ,
  })
    .to(
      {
        x: targetX,
        y: targetY,
        z: targetZ,
      },
      1000,
    )
    .easing(easing)
    .onUpdate(({ x, y, z }) => {
      camera.position.x = x;
      camera.position.y = y;
      camera.position.z = z;
    })
    .onComplete(onComplete)
    .start();
}
