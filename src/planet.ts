import {
  Mesh,
  SphereGeometry,
  MeshPhongMaterial,
  TextureLoader,
  Vector3,
} from 'three';
import { collides } from './raycaster';
import texture from './assets/textures/8k_earth_daymap.jpg';
import scene from './scene';
import { Model } from '~utils';
import { tweenCamera } from './utils';
import EventEmitter from 'eventemitter3';
import { controls, outlinePass } from './renderer';
import camera from './camera';

@Model
export default class Planet extends EventEmitter {
  public mesh: Mesh;
  // public label:
  private focused = false;
  private prevCameraPosition?: Vector3;
  private info?: HTMLElement;

  constructor() {
    super();
    this.mesh = new Mesh(
      new SphereGeometry(5, 32, 32),
      new MeshPhongMaterial({
        map: new TextureLoader().load(texture),
      }),
    );
    // this.label = new Mesh();
    scene.add(this.mesh);
    window.addEventListener('click', this.onClick);
  }

  private onFocus(): void {
    this.focused = true;
    controls.enabled = false;
    window.removeEventListener('click', this.onClick);
    window.addEventListener('keyup', this.onKeyUp);
    this.emit('focus');
  }

  private onBlur(): void {
    this.focused = false;
    controls.enabled = true;
    window.addEventListener('click', this.onClick);
    window.removeEventListener('keyup', this.onKeyUp);
    this.emit('blur');
  }

  private onKeyUp = ({ key }: KeyboardEvent): void => {
    if (key === 'Escape') {
      this.onBlur();
      this.returnCameraToOriginalPosition();
    }
  };

  private addInfo(): void {
    const div = document.createElement('div');
    div.classList.add('info');
    div.innerHTML = `
      <article>
        <h1>Earth</h1>
        <p>
        Earth is the third planet from the Sun and the only astronomical object known to harbor life. According to radiometric dating and other sources of evidence, Earth formed over 4.5 billion years ago.[23][24][25] Earth's gravity interacts with other objects in space, especially the Sun and the Moon, which is Earth's only natural satellite. Earth orbits around the Sun in 365.26 days, a period known as an Earth year. During this time, Earth rotates about its axis about 366.26 times.[n 6]

Earth's axis of rotation is tilted with respect to its orbital plane, producing seasons on Earth.[26] The gravitational interaction between Earth and the Moon causes tides, stabilizes Earth's orientation on its axis, and gradually slows its rotation.[27] Earth is the densest planet in the Solar System and the largest and most massive of the four rocky planets.[28]

Earth's lithosphere is divided into several rigid tectonic plates that migrate across the surface over many millions of years. About 71% of Earth's surface is covered with water, mostly by oceans.[29] The remaining 29% is land consisting of continents and islands that together contain many lakes, rivers and other sources of water that contribute to the hydrosphere. The majority of Earth's polar regions are covered in ice, including the Antarctic ice sheet and the sea ice of the Arctic ice pack. Earth's interior remains active with a solid iron inner core, a liquid outer core that generates the Earth's magnetic field and a convecting mantle that drives plate tectonics.

Within the first billion years of Earth's history, life appeared in the oceans and began to affect the Earth's atmosphere and surface, leading to the proliferation of anaerobic and, later, aerobic organisms. Some geological evidence indicates that life may have arisen as early as 4.1 billion years ago. Since then, the combination of Earth's distance from the Sun, physical properties and geological history have allowed life to evolve and thrive.[30][31] In the history of life on Earth, biodiversity has gone through long periods of expansion, occasionally punctuated by mass extinction events. Over 99% of all species[32] that ever lived on Earth are extinct.[33][34] Estimates of the number of species on Earth today vary widely;[35][36][37] most species have not been described.[38] Over 7.6 billion humans live on Earth and depend on its biosphere and natural resources for their survival.[39] Humans have developed diverse societies and cultures; politically, the world has around 200 sovereign states.
        </p>
      </article>
    `;
    div.style.transform = 'translateY(-50%)';
    document.body.appendChild(div);
    this.info = div;
  }

  private removeInfo(): void {
    if (this.info && document.body.contains(this.info)) {
      document.body.removeChild(this.info);
    }
  }

  private returnCameraToOriginalPosition(): void {
    if (this.prevCameraPosition) {
      this.removeInfo();
      tweenCamera({
        x: this.prevCameraPosition.x,
        y: this.prevCameraPosition.y,
        z: this.prevCameraPosition.z,
      });
    }
  }

  private onClick = (): void => {
    if (collides(this.mesh)) {
      this.prevCameraPosition = new Vector3(
        camera.position.x,
        camera.position.y,
        camera.position.z,
      );
      tweenCamera(
        {
          x: this.mesh.position.x,
          y: this.mesh.position.y,
          z: this.mesh.position.z - 10,
        },
        {
          onComplete: () => this.addInfo(),
        },
      );
      this.onFocus();
    }
  };

  render(): void {
    if (!collides(this.mesh)) {
      outlinePass.selected;
      this.mesh.rotation.y += Math.PI / 10000;
    }
  }
}
