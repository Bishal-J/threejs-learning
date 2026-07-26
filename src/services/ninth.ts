import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
// import imageSrc from "/textures/door/color.jpg";

const gui = new GUI();

const canvas = document.getElementById("webgl") as HTMLCanvasElement;

const scene = new THREE.Scene();

// ==== Texture, Loading Manager, UV unwrapping
const manager = new THREE.LoadingManager();

const loader = new THREE.TextureLoader(manager);
const cubeTextureLoader = new THREE.CubeTextureLoader(manager);
// const colorTexture = loader.load("/textures/door/color.jpg");
// const alphaTexture = loader.load("/textures/door/alpha.jpg");
// const heightTexture = loader.load("/textures/door/height.jpg");
// const normalTexture = loader.load("/textures/door/normal.jpg");
// const aoTexture = loader.load("/textures/door/ambientOcclusion.jpg");
// const metalnessTexture = loader.load("/textures/door/metalness.jpg");
// const roughnessTexture = loader.load("/textures/door/roughness.jpg");

// Matcap Texture
// const matcapTexture = loader.load("/textures/matcaps/8.png");
// const gradientTexture = loader.load("/textures/gradients/3.jpg");

// Environment Map Textures
const envMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/3/px.jpg",
  "/textures/environmentMaps/3/nx.jpg",
  "/textures/environmentMaps/3/py.jpg",
  "/textures/environmentMaps/3/ny.jpg",
  "/textures/environmentMaps/3/pz.jpg",
  "/textures/environmentMaps/3/nz.jpg",
]);

// ==== Mesh Basic Material
// const material = new THREE.MeshBasicMaterial();
// material.color = new THREE.Color("#d2112b");
// material.map = colorTexture;
// material.wireframe = true;
// material.transparent = true;
// material.opacity = 0.5;
// material.alphaMap = alphaTexture;
// material.side = THREE.FrontSide;
// material.side = THREE.BackSide;
// material.side = THREE.DoubleSide;

// Mesh Normal Material
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true; // Only for Normal Material

// Mesh Matcap Material
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// Mesh Depth Material
// const material = new THREE.MeshDepthMaterial();

// ==== ALL the Material below require lights
// Mesh Lambert Material
// const material = new THREE.MeshLambertMaterial();

// Mesh Phong Material
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff);

// Mesh Toon Material
// const material = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// material.gradientMap = gradientTexture;

// Mesh Standard Material
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.envMap = envMapTexture;
// material.map = colorTexture;
// material.aoMap = aoTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = heightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = metalnessTexture;
// material.roughnessMap = roughnessTexture;
// material.normalMap = normalTexture;
// material.normalScale.set(0.1, 0.1);
// material.transparent = true;
// material.alphaMap = alphaTexture;

// Mesh Physical Material - Similar to standard material but with clear coating
// Points Material - To create particles
// Shader Material and Raw Shader Material

// Environment Map

const matFolder = gui.addFolder("Material");
matFolder.add(material, "roughness", 0, 1, 0.001);
matFolder.add(material, "metalness", 0, 1, 0.001);
matFolder.add(material, "aoMapIntensity", 0, 10, 0.001);
matFolder.add(material, "displacementScale", 0, 1, 0.001);

// Ambient Light and Point Light
const ambientLight = new THREE.AmbientLight("#ffffff", 1.5);
const pointLight = new THREE.PointLight("#ffffff", 15);
pointLight.position.set(2, 3, 4);
scene.add(ambientLight, pointLight);

// ==== Sphere, Plane, Torus
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere.position.x = -1.5;
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material,
);
torus.position.x = 1.5;
scene.add(sphere, plane, torus);

//
sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2),
);
plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2),
);
torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2),
);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const aspectRatio = sizes.width / sizes.height;

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
camera.position.z = 3;
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

const timer = new THREE.Timer();
timer.connect(document);

const animate = (): void => {
  window.requestAnimationFrame(animate);

  const elapsedTime = timer.getElapsed();
  timer.update();

  // Update objects
  // sphere.rotation.y = 0.1 * elapsedTime;
  // plane.rotation.y = 0.1 * elapsedTime;
  // torus.rotation.y = 0.1 * elapsedTime;

  // sphere.rotation.x = 0.15 * elapsedTime;
  // plane.rotation.y = 0.15 * elapsedTime;
  // torus.rotation.y = 0.15 * elapsedTime;

  controls.update();

  renderer.render(scene, camera);
};

animate();
