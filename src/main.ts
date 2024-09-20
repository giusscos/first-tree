import './style.css'

import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { SceneNode } from 'three/webgpu';

const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;

const scene = new THREE.Scene();
const aspectRatio = innerWidth / innerHeight
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
// const camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 500);

camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// Create a Box (Cube)
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshNormalMaterial();
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

//create a blue LineBasicMaterial
// const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

// const points = [];
// points.push( new THREE.Vector3( - 10, 0, 0 ) );
// points.push( new THREE.Vector3( 0, 10, 0 ) );
// points.push( new THREE.Vector3( 10, 0, 0 ) );
// points.push( new THREE.Vector3( 0, -10, 0 ) );
// points.push( new THREE.Vector3( -10, 0, 0 ) );

// const geometry = new THREE.BufferGeometry().setFromPoints( points );
// const line = new THREE.Line( geometry, material );
// scene.add(line);


const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 5);
scene.add(light);

const loader = new GLTFLoader();

let cokeModel: GLTF;
loader.load('/cokesoda/scene.gltf', function (gltf) {
  cokeModel = gltf;

  scene.add(gltf.scene);

}, undefined, function (error) {

  console.error(error);

});

camera.position.z = 5;
camera.position.y = 5;
camera.lookAt(0, 0, 0)

function animate() {
  if (!cokeModel) return;

  cokeModel.scene.rotation.y += 0.01;
  // Animate Cube
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

if (WebGL.isWebGL2Available()) {
  // Initiate function or other initializations here
  // animate();

  renderer.setAnimationLoop(animate);
} else {
  const warning = WebGL.getWebGL2ErrorMessage();
  document.getElementById('app')?.appendChild(warning);
}