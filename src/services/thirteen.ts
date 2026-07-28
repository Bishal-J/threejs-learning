import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import { Sky } from "three/addons/objects/Sky.js";

const gui = new GUI();

gui.hide();

const canvas = document.getElementById("webgl") as HTMLCanvasElement;

const scene = new THREE.Scene();

// Loading Texture
const textureLoader = new THREE.TextureLoader();
const floorAlphaTexture = textureLoader.load("/haunted/floor/alpha.jpg");
const floorColorTexture = textureLoader.load(
  "/haunted/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg",
);
const floorARMTexture = textureLoader.load(
  "/haunted/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg",
);
const floorNormalTexture = textureLoader.load(
  "/haunted/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg",
);
const floorDisplacementTexture = textureLoader.load(
  "/haunted/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.jpg",
);

floorColorTexture.repeat.set(8, 8);
floorARMTexture.repeat.set(8, 8);
floorNormalTexture.repeat.set(8, 8);
floorDisplacementTexture.repeat.set(8, 8);

floorColorTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;

floorColorTexture.wrapT = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

floorColorTexture.colorSpace = THREE.SRGBColorSpace;

// Wall
const wallColorTexture = textureLoader.load(
  "/haunted/wall/rough_plaster_brick_1k/rough_plaster_brick_diff_1k.jpg",
);
const wallARMTexture = textureLoader.load(
  "/haunted/wall/rough_plaster_brick_1k/rough_plaster_brick_arm_1k.jpg",
);
const wallNormalTexture = textureLoader.load(
  "/haunted/wall/rough_plaster_brick_1k/rough_plaster_brick_nor_gl_1k.jpg",
);

wallColorTexture.colorSpace = THREE.SRGBColorSpace;

// Roof
const roofColorTexture = textureLoader.load(
  "/haunted/roof/roof_07_1k/roof_07_diff_1k.jpg",
);
const roofARMTexture = textureLoader.load(
  "/haunted/roof/roof_07_1k/roof_07_arm_1k.jpg",
);
const roofNormalTexture = textureLoader.load(
  "/haunted/roof/roof_07_1k/roof_07_nor_gl_1k.jpg",
);

roofColorTexture.repeat.set(3, 1);
roofARMTexture.repeat.set(3, 1);
roofNormalTexture.repeat.set(3, 1);

roofColorTexture.wrapS = THREE.RepeatWrapping;
roofARMTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.wrapS = THREE.RepeatWrapping;

roofColorTexture.colorSpace = THREE.SRGBColorSpace;

// Bush
const bushColorTexture = textureLoader.load(
  "/haunted/bush/forest_leaves_02_1k/forest_leaves_02_diffuse_1k.jpg",
);
const bushARMTexture = textureLoader.load(
  "/haunted/bush/forest_leaves_02_1k/forest_leaves_02_arm_1k.jpg",
);
const bushNormalTexture = textureLoader.load(
  "/haunted/bush/forest_leaves_02_1k/forest_leaves_02_nor_gl_1k.jpg",
);

bushColorTexture.repeat.set(2, 1);
bushARMTexture.repeat.set(2, 1);
bushNormalTexture.repeat.set(2, 1);

bushColorTexture.wrapS = THREE.RepeatWrapping;
bushARMTexture.wrapS = THREE.RepeatWrapping;
bushNormalTexture.wrapS = THREE.RepeatWrapping;

bushColorTexture.colorSpace = THREE.SRGBColorSpace;

// Graves
const graveColorTexture = textureLoader.load(
  "/haunted/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg",
);
const graveARMTexture = textureLoader.load(
  "/haunted/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg",
);
const graveNormalTexture = textureLoader.load(
  "/haunted/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg",
);

graveColorTexture.repeat.set(0.3, 0.4);
graveARMTexture.repeat.set(0.3, 0.4);
graveNormalTexture.repeat.set(0.3, 0.4);

graveColorTexture.colorSpace = THREE.SRGBColorSpace;

// Door
const doorColorTexture = textureLoader.load("/haunted/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/haunted/door/alpha.jpg");
const doorHeightTexture = textureLoader.load("/haunted/door/height.jpg");
const doorNormalTexture = textureLoader.load("/haunted/door/normal.jpg");
const doorAoTexture = textureLoader.load("/haunted/door/ambientOcclusion.jpg");
const doorMetalnessTexture = textureLoader.load("/haunted/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/haunted/door/roughness.jpg");

// ==== Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    transparent: true,
    alphaMap: floorAlphaTexture,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.3,
    displacementBias: -0.2,
  }),
);
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

gui
  .add(floor.material, "displacementScale", 0, 1, 0.001)
  .name("floorDisplacementScale");
gui
  .add(floor.material, "displacementBias", -1, 1, 0.001)
  .name("floorDisplacementBias");

// ==== House
const house = new THREE.Group();

// Wall
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
    normalMap: wallNormalTexture,
  }),
);
walls.position.y += 2.5 / 2;

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1.5, 4),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    normalMap: roofNormalTexture,
  }),
);
roof.position.y += 1.5 / 2 + 2.5;
roof.rotation.y = Math.PI * 0.25;

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2, 100, 100),
  new THREE.MeshStandardMaterial({
    color: "#A67C52",
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAoTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.15,
    displacementBias: -0.04,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  }),
);
door.position.y += 1;
door.position.z += 2 + 0.01;

// Bush
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
  color: "#ccffcc",
  map: bushColorTexture,
  aoMap: bushARMTexture,
  roughnessMap: bushARMTexture,
  metalnessMap: bushARMTexture,
  normalMap: bushNormalTexture,
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);
bush1.rotation.x = -0.75;
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
bush2.rotation.x = -0.75;
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.rotation.x = -0.75;
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);
bush4.rotation.x = -0.75;
// Graves
const graves = new THREE.Group();
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  aoMap: graveARMTexture,
  roughnessMap: graveARMTexture,
  metalnessMap: graveARMTexture,
  normalMap: graveNormalTexture,
});

for (let i = 0; i < 30; i++) {
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);

  const angle = Math.random() * Math.PI * 2;
  const randomRadius = 3 + Math.random() * 4;
  grave.position.x = Math.sin(angle) * randomRadius;
  grave.position.y = Math.random() * 0.4;
  grave.position.z = Math.cos(angle) * randomRadius;

  grave.rotation.x = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;

  graves.add(grave);
}

scene.add(graves);
house.add(walls, roof, door, bush1, bush2, bush3, bush4);
scene.add(house);

// ==== Lights
// 1. Ambient Light
const ambientLight = new THREE.AmbientLight("#86cdff", 0.275);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// 2. Directional Light - Shadow -> Camera - Similar to Orthographic Camera
const moonLight = new THREE.DirectionalLight("#86cdff", 1);
moonLight.position.set(3, 2, -8);
scene.add(moonLight);

// Door Light
const doorLight = new THREE.PointLight("#ff7d46", 5);
doorLight.position.set(0, 2.2, 2.5);
house.add(doorLight);

// Ghost
const ghost1 = new THREE.PointLight("#8800ff", 6);
const ghost2 = new THREE.PointLight("#ff0088", 6);
const ghost3 = new THREE.PointLight("#ff0000", 6);
scene.add(ghost1, ghost2, ghost3);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const aspectRatio = sizes.width / sizes.height;

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  renderer.setSize(sizes.width, sizes.height);
});

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);

camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(sizes.width, sizes.height);

// Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

moonLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
walls.receiveShadow = true;
roof.castShadow = true;
floor.receiveShadow = true;

for (const grave of graves.children) {
  grave.castShadow = true;
  grave.receiveShadow = true;
}

// Mapping
moonLight.shadow.mapSize.width = 256;
moonLight.shadow.mapSize.height = 256;
moonLight.shadow.camera.top = 8;
moonLight.shadow.camera.right = 8;
moonLight.shadow.camera.bottom = -8;
moonLight.shadow.camera.left = -8;
moonLight.shadow.camera.near = 1;
moonLight.shadow.camera.far = 20;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 10;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 10;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 10;

// Sky
const sky = new Sky();
sky.scale.setScalar(100);
scene.add(sky);

sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);

// Fog
scene.fog = new THREE.FogExp2("#04343f", 0.1);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.maxDistance = 10;
controls.minDistance = 4;
controls.maxPolarAngle = Math.PI * 0.45;

const timer = new THREE.Timer();
timer.connect(document);

const animate = (): void => {
  window.requestAnimationFrame(animate);

  const elapsedTime = timer.getElapsed();
  timer.update();

  // Animating Ghost
  const ghost1Angle = elapsedTime * 0.3;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.y = Math.abs(
    Math.sin(ghost1Angle) *
      Math.sin(ghost1Angle * 2.34) *
      Math.sin(ghost1Angle * 3.14),
  );
  ghost1.position.z = Math.sin(ghost1Angle) * 4;

  const ghost2Angle = -elapsedTime * 0.38;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.y = Math.abs(
    Math.sin(ghost2Angle) *
      Math.sin(ghost2Angle * 2.34) *
      Math.sin(ghost2Angle * 3.14),
  );
  ghost2.position.z = Math.sin(ghost2Angle) * 5;

  const ghost3Angle = elapsedTime * 0.23;
  ghost3.position.x = Math.cos(ghost3Angle) * 6;
  ghost3.position.y = Math.abs(
    Math.sin(ghost3Angle) *
      Math.sin(ghost3Angle * 2.34) *
      Math.sin(ghost3Angle * 3.14),
  );
  ghost3.position.z = Math.sin(ghost3Angle) * 6;

  // Flickering House Light
  doorLight.intensity =
    4.5 + Math.sin(elapsedTime * 25) * 0.3 + (Math.random() - 0.5) * 0.4;

  controls.update();

  renderer.render(scene, camera);
};

animate();
