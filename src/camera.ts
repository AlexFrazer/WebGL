import { PerspectiveCamera } from 'three';

export const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  100000,
);

camera.position.set(10, 10, 10);
camera.updateMatrix();

export default camera;
