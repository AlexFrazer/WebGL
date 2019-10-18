declare module 'three-orbitcontrols' {
  import { Camera, WebGLRenderer } from 'three';
  export default class OrbitControls {
    constructor(camera: Camera, element: WebGLRenderer['domElement']);
    update(): void;
    enabled: boolean;
  }
}
