import { WebGLRenderer } from 'three';
import OrbitControls from 'three-orbitcontrols';
import scene from './scene';
import camera from './camera';

const renderer = new WebGLRenderer({ antialias: true });
const controls = new OrbitControls(camera, renderer.domElement);
console.log(controls);

export function init(): void {
  controls.update();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

export function animate(): void {
  window.requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
