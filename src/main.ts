import './style.css'

import * as THREE from 'three';

const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;

const scene = new THREE.Scene();
const aspectRatio = innerWidth / innerHeight
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;
camera.position.y = 1


function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);