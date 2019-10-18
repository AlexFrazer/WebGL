import { Vector2, Raycaster, Object3D, Intersection } from 'three';
import camera from './camera';
import scene from './scene';
import { outlinePass } from './renderer';

const registry: Set<Object3D> = new Set();
let intersections: Intersection[] = [];

// const intersections: Intersection[] = [];
const mouse = new Vector2(0, 0);
const raycaster = new Raycaster();

function onMouseMove({ clientX, clientY }: MouseEvent): void {
  mouse.x = (clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener('mousemove', onMouseMove, false);

function render(): void {
  window.requestAnimationFrame(render);
  raycaster.setFromCamera(mouse, camera);
  intersections = raycaster.intersectObjects(scene.children);
  if (intersections.length > 0) {
    const [{ object: selected }] = intersections;
    outlinePass.selectedObjects = selected;
  }
}

export function register(target: Object3D): void {
  registry.add(target);
}

export function collides(target: Object3D): boolean {
  for (const { object } of intersections) {
    if (target === object) {
      return true;
    }
  }
  return false;
}

render();
