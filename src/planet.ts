import { SphereGeometry, MeshPhongMaterial, Mesh, TextureLoader } from 'three';
import texturePath from './assets/textures/4k_eris_fictional.jpg';

export default class Planet {
  public geometry: SphereGeometry;
  public material: MeshPhongMaterial;
  public mesh: Mesh;

  constructor() {
    const loader = new TextureLoader();
    const texture = loader.load(
      texturePath,
      () => console.log('Loaded!'),
      () => console.log('Progress!'),
      error => console.log('Error!', error.message),
    );
    this.geometry = new SphereGeometry(5, 32, 32);
    this.material = new MeshPhongMaterial({ map: texture });
    // this.material = new MeshBasicMaterial({ map: texture });
    this.mesh = new Mesh(this.geometry, this.material);
    this.animate();
  }

  public animate = (): void => {
    window.requestAnimationFrame(this.animate);
    this.mesh.rotation.z += 0.0005;
  };
}
