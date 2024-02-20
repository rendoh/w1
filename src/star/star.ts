import GUI from 'lil-gui';
import * as THREE from 'three';

import { clock } from '../core/clock';
import fragmentShader from './fragment.glsl';
import vertexShader from './vertex.glsl';

const gui = new GUI();
const options = { wireframe: true };
gui.add(options, 'wireframe');

/**
 * 正十角形の頂点座標を返す
 */
const theta = Math.PI / 5;
function coord(n: number): [x: number, y: number, z: number] {
  return [Math.cos(n * theta), Math.sin(n * theta), 0];
}

export class Star {
  public readonly mesh: THREE.Mesh<
    THREE.BufferGeometry,
    THREE.RawShaderMaterial
  >;
  constructor() {
    const geometry = new THREE.BufferGeometry();

    // 正十角形の頂点座標
    const decagonCoordinates = [...Array(10).keys()].map((i) => coord(i));

    // 正十角形を構成する面の頂点座標
    const vertices = decagonCoordinates.flatMap((coord, i, arr) => [
      ...[0, 0, 0],
      ...coord,
      ...decagonCoordinates[(i + 1) % arr.length],
    ]);

    // 星型を構成する頂点と谷の情報
    const concaves = [...Array(10).keys()].flatMap((i) =>
      i % 2 === 0 ? [0, 1, -1] : [0, -1, 1],
    );

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3),
    );
    geometry.setAttribute(
      'concave',
      new THREE.Float32BufferAttribute(concaves, 1),
    );

    const material = new THREE.RawShaderMaterial({
      wireframe: options.wireframe,
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.scale.setScalar(150);
  }
  public dispose() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
  public update() {
    this.mesh.material.wireframe = options.wireframe;
    this.mesh.rotation.z -= clock.delta * 0.00025;
    this.mesh.material.uniforms.uTime.value = clock.elapsed;
  }
}
