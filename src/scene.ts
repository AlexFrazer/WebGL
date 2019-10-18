import { Scene, HemisphereLight } from 'three';
import skybox from './Skybox';

const scene = new Scene();
const light = new HemisphereLight(0xffffbb, 0x000000, 1);

scene.add(skybox);
scene.add(light);

export default scene;
