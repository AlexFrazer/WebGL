import * as Three from 'three';
import OrbitControls from 'three-orbitcontrols';
// import { EffectComposer } from 'postprocessing';
import { ShaderPass, FXAAShader } from 'postprocessing';
import { OutlinePass, RenderPass, EffectComposer } from 'three-outlinepass';
import scene from './scene';
import camera from './camera';

export const renderer = new Three.WebGLRenderer({ antialias: true });
export const controls = new OrbitControls(camera, renderer.domElement);
export const composer = new EffectComposer(renderer);
export const renderPass = new RenderPass(scene, camera);
export const outlinePass = new OutlinePass(
  new Three.Vector2(window.innerWidth, window.innerHeight),
  scene,
  camera,
);
export const effectFXAA = new ShaderPass(FXAAShader);
renderer.shadowMapEnabled = true;
renderer.shadowMapType = Three.PCFSoftShadowMap;

outlinePass.edgeStrength = 5;
outlinePass.edgeGlow = 0.5;
outlinePass.edgeThickness = 1;
// effectFXAA.uniforms['resolution'].value.set(
//   1 / window.innerWidth,
//   1 / window.innerHeight,
// );
effectFXAA.renderToScreen = true;

composer.addPass(renderPass);
// composer.addPass(effectFXAA);
composer.addPass(outlinePass);

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
  composer.render();
}
