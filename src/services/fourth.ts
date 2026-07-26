import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.getElementById("webgl") as HTMLCanvasElement;

// Cursor

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "#d2112b",
  wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const sizes = {
  width: 800,
  height: 600,
};

// const cursor = {
//   x: 0,
//   y: 0,
// };

// window.addEventListener("mousemove", (event) => {
//   cursor.x = event.clientX / sizes.width - 0.5;
//   cursor.y = -(event.clientY / sizes.height - 0.5);
// });

const aspectRatio = sizes.width / sizes.height;
// ====Perspective Camera - Field of view, Aspect Ratio, Near, Far
const camera = new THREE.PerspectiveCamera(55, aspectRatio, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

// ====Orthographic Camera - left, right, top, bottom, near, far
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100,
// );
// camera.position.z = 3;
// scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

// Orbit Contorl
const controls = new OrbitControls(camera, canvas);
controls.update();
controls.enableDamping = true;

// Timer
const timer = new THREE.Timer();
timer.connect(document);

const animate = () => {
  window.requestAnimationFrame(animate);

  const elapsed = timer.getElapsed();

  timer.update();
  cube.rotation.y = elapsed;
  // cube.position.x = cursor.x;
  // cube.position.y = -cursor.y;

  // Custom Controls
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(cube.position);

  // Built In Controls
  controls.update();

  renderer.render(scene, camera);
};

animate();
