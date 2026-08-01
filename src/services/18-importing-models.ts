import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

// Canvas
const canvas = document.getElementById("webgl") as HTMLCanvasElement;

// Scene
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load(
  "/textures/dungen-floor/stone_tiles_02_diff_1k.webp",
);
const normalTexture = textureLoader.load(
  "/textures/dungen-floor/stone_tiles_02_nor_gl_1k.webp",
);
const armTexture = textureLoader.load(
  "/textures/dungen-floor/stone_tiles_02_arm_1k.webp",
);

const floorAlphaTexture = textureLoader.load("/haunted/floor/alpha.jpg");

colorTexture.repeat.set(21, 21);
normalTexture.repeat.set(21, 21);
armTexture.repeat.set(21, 21);

colorTexture.wrapS = THREE.RepeatWrapping;
normalTexture.wrapS = THREE.RepeatWrapping;
armTexture.wrapS = THREE.RepeatWrapping;

colorTexture.wrapT = THREE.RepeatWrapping;
normalTexture.wrapT = THREE.RepeatWrapping;
armTexture.wrapT = THREE.RepeatWrapping;

colorTexture.colorSpace = THREE.SRGBColorSpace;

// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
const modelLoader = new GLTFLoader();
// modelLoader.setDRACOLoader(dracoLoader);

// let animationMixer: THREE.AnimationMixer;

modelLoader.load("/models/Dungen/Dungen.gltf", (gltf) => {
  const items = [];

  // animationMixer = new THREE.AnimationMixer(gltf.scene);
  // const action = mixer.clipAction(gltf.animations[0]);

  // console.log(action.play())

  for (const child of gltf.scene.children) {
    items.push(child);
  }

  scene.add(...items);
});

/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(38, 38, 100, 100),
  new THREE.MeshStandardMaterial({
    transparent: true,
    alphaMap: floorAlphaTexture,
    map: colorTexture,
    aoMap: armTexture,
    roughnessMap: armTexture,
    normalMap: normalTexture,
    roughness: 1,
  }),
);
floor.position.y = -0.4;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

scene.fog = new THREE.FogExp2("#6F7E57", 0.1);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.set(2, 2, 2);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.maxDistance = 14;
controls.minDistance = 1;
controls.maxPolarAngle = Math.PI * 0.5;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// const timer = new THREE.Timer();
// timer.connect(document);

const tick = () => {
  // Update controls
  controls.update();

  // const deltaTime = timer.getDelta();

  // Update Mixer
  // if (animationMixer) {
  //   animationMixer.update(deltaTime);
  // }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
