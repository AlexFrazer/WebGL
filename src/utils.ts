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
