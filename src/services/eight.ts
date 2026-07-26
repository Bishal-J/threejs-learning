import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import imageSrc from "/textures/door/color.jpg";

const canvas = document.getElementById("webgl") as HTMLCanvasElement;

const scene = new THREE.Scene();

// ==== Texture, Loading Manager, UV unwrapping
// Using Native JS
// const image = new Image();
const manager = new THREE.LoadingManager();

manager.onStart = () => console.log("Loading Started!");
// manager.onProgress = () => console.log("Loading in Progress!");
// manager.onLoad = () => console.log("Loading completed!");
// manager.onError = () => console.log("Error Loading");

const loader = new THREE.TextureLoader(manager);
// const colorTexture = loader.load("/textures/clouds.png");
// const colorTexture = loader.load("/textures/stars.png");
// const colorTexture = loader.load("/textures/rainbow.png");
// const colorTexture = loader.load("/textures/firebox.png");
// const colorTexture = loader.load("/textures/fire.png");
const colorTexture = loader.load("/textures/minecraft.png");
// const colorTexture = loader.load("/textures/checkerboard-8x8.png");
// const colorTexture = loader.load("/textures/checkerboard-1024x1024.png");
// const colorTexture = loader.load("/textures/door/color.jpg");
// const alphaTexture = loader.load("/textures/door/alpha.jpg");
// const heightTexture = loader.load("/textures/door/height.jpg");
// const normalTexture = loader.load("/textures/door/normal.jpg");
// const aoTexture = loader.load("/textures/door/ambientOcclusion.jpg");
// const metalnessTexture = loader.load("/textures/door/metalness.jpg");
// const roughnessTexture = loader.load("/textures/door/roughness.jpg");
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 2;

// ==== wrapS, wrapT
// Mirrored Repeat
// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;

// RepeatWrapping
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;

// Offset
// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// Rotation
// colorTexture.rotation = Math.PI * 0.25;

// Piviot Point
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

// ==== Filtering and Mipmapping
// Nearest Filter better performace (frame rate)

colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  map: colorTexture,
});
const cone = new THREE.Mesh(geometry, material);
scene.add(cone);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const aspectRatio = sizes.width / sizes.height;

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
camera.position.z = 2;
scene.add(camera);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
});

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const animate = (): void => {
  window.requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
};

animate();
