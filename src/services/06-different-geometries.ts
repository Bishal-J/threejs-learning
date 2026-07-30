import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.getElementById("webgl") as HTMLCanvasElement;

const scene = new THREE.Scene();

// ==== Float32Array and BufferGeometry
// const geometry = new THREE.BufferGeometry();
// const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
// positionsArray[0] = 0
// positionsArray[1] = 0
// positionsArray[2] = 0

// positionsArray[3] = 0
// positionsArray[4] = 1
// positionsArray[5] = 0

// positionsArray[6] = 1
// positionsArray[7] = 0
// positionsArray[8] = 0
// const positionAttribute = new THREE.BufferAttribute(positionsArray, 3);
// geometry.setAttribute("position", positionAttribute);

const geometry = new THREE.BufferGeometry();

const count = 21;
const positionsArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 1;
}
const positionAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute("position", positionAttribute);

// ==== GEOMETRIES
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);

const material = new THREE.MeshBasicMaterial({
  color: "#d2112b",
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const aspectRatio = sizes.width / sizes.height;

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
});

const camera = new THREE.PerspectiveCamera(55, aspectRatio, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

const timer = new THREE.Timer();
timer.connect(document);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const animate = () => {
  window.requestAnimationFrame(animate);

  controls.update();

  const elapsed = timer.getElapsed();
  timer.update();

  cube.rotation.y = elapsed * 0.1;

  renderer.render(scene, camera);
};

animate();
