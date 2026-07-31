import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";
import GUI from "lil-gui";
import * as CANNON from "cannon-es";

// PHYSICS LIBRARIES
// 3D => Ammo.js, Cannon.js, Oimo.js
// 2D => Matter.js, P2.js, Planck.js, Box2d.js

interface CollisionEvent {
  type: "collide";
  body: CANNON.Body;
  target: CANNON.Body;
  contact: CANNON.ContactEquation;
}

const canvas = document.getElementById("webgl") as HTMLCanvasElement;
const container = document.getElementById("container") as HTMLDivElement;

const gui = new GUI();

const debugObject = {
  createSphere: (): void => {},
  createBox: (): void => {},
  reset: (): void => {},
};

const scene = new THREE.Scene();

const stats = new Stats();
container.appendChild(stats.dom);

const hitSound = new Audio("/sounds/hit.mp3");

const playHitSound = (collision: CollisionEvent): void => {
  const impactStrength = collision.contact.getImpactVelocityAlongNormal();
  if (impactStrength > 1.5) {
    // hitSound.volume = Math.random();
    hitSound.currentTime = 0;
    hitSound.play();
  }
};

const cubeTextureLoader = new THREE.CubeTextureLoader();

const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.png",
  "/textures/environmentMaps/0/nx.png",
  "/textures/environmentMaps/0/py.png",
  "/textures/environmentMaps/0/ny.png",
  "/textures/environmentMaps/0/pz.png",
  "/textures/environmentMaps/0/nz.png",
]);

// Psysics
const world = new CANNON.World();
world.broadphase = new CANNON.SAPBroadphase(world);
world.allowSleep = true;
world.gravity.set(0, -9.82, 0);

//
// const concreteMaterial = new CANNON.Material("concrete");
// const plasticMaterial = new CANNON.Material("plastic");
const defaultMaterial = new CANNON.Material("default");

//
// const sphereShape = new CANNON.Sphere(0.5);

// const sphereBody = new CANNON.Body({
//   mass: 1,
//   position: new CANNON.Vec3(0, 3, 0),
//   shape: sphereShape,
//   // material: defaultMaterial,
// });

// sphereBody.applyLocalForce(
//   new CANNON.Vec3(150, 0, 0),
//   new CANNON.Vec3(0, 0, 0),
// );

// world.addBody(sphereBody);

const floorShape = new CANNON.Plane();
const floorBody = new CANNON.Body({
  mass: 0,
  shape: floorShape,
  // material: defaultMaterial,
});
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5);
world.addBody(floorBody);

const defaultContactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    friction: 0.1,
    restitution: 0.7,
  },
);
// world.addContactMaterial(defaultContactMaterial);

world.defaultContactMaterial = defaultContactMaterial;

// const sphere = new THREE.Mesh(
//   new THREE.SphereGeometry(0.5, 32, 32),
//   new THREE.MeshStandardMaterial({
//     metalness: 0.3,
//     roughness: 0.4,
//     envMap: environmentMapTexture,
//     envMapIntensity: 0.5,
//   }),
// );
// sphere.castShadow = true;
// sphere.position.y = 0.5;
// scene.add(sphere);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: "#777777",
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
    envMapIntensity: 0.5,
  }),
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const aspectRatio = sizes.width / sizes.height;

// Group
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
camera.position.set(-3, 3, 3);
cameraGroup.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Utils
const objectsToUpdate: {
  mesh: THREE.Mesh;
  body: CANNON.Body;
}[] = [];

const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const sphereMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  envMap: environmentMapTexture,
});

const createSphere = (radius: number, position: THREE.Vector3Like): void => {
  const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  mesh.castShadow = true;
  mesh.scale.set(radius, radius, radius);
  mesh.position.copy(position);
  scene.add(mesh);

  // Cannon.js Body
  const shape = new CANNON.Sphere(radius);
  const body = new CANNON.Body({
    mass: 1,
    // position: new CANNON.Vec3(0, 3, 0),
    shape: shape,
    material: defaultMaterial,
  });
  const cannonPosition = new CANNON.Vec3(position.x, position.y, position.z);
  body.position.copy(cannonPosition);
  body.addEventListener("collide", playHitSound);
  world.addBody(body);

  // Save in objects to update
  objectsToUpdate.push({
    mesh,
    body,
  });
};

debugObject.createSphere = () => {
  createSphere(Math.random() * 0.5, {
    x: (Math.random() - 0.5) * 3,
    y: 5,
    z: (Math.random() - 0.5) * 3,
  });
};

// Create Box
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  envMap: environmentMapTexture,
});

const createBox = (
  width: number,
  height: number,
  depth: number,
  position: THREE.Vector3Like,
): void => {
  const mesh = new THREE.Mesh(boxGeometry, boxMaterial);
  mesh.scale.set(width, height, depth);
  mesh.castShadow = true;
  mesh.position.copy(position);
  scene.add(mesh);

  const shape = new CANNON.Box(
    new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5),
  );
  const body = new CANNON.Body({
    mass: 1,
    shape: shape,
    material: defaultMaterial,
  });

  const cannonPosition = new CANNON.Vec3(position.x, position.y, position.z);
  body.position.copy(cannonPosition);
  body.addEventListener("collide", playHitSound);
  world.addBody(body);

  objectsToUpdate.push({
    mesh,
    body,
  });
};

debugObject.createBox = () => {
  createBox(Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5, {
    x: (Math.random() - 0.5) * 3,
    y: 5,
    z: (Math.random() - 0.5) * 3,
  });
};

debugObject.reset = () => {
  for (const object of objectsToUpdate) {
    // Remove Body
    object.body.removeEventListener("collide", playHitSound);
    world.removeBody(object.body);

    // Remove Mesh
    scene.remove(object.mesh);
  }
  // Reset Objects to Update
  objectsToUpdate.splice(0, objectsToUpdate.length);
};

gui.add(debugObject, "createSphere");
gui.add(debugObject, "createBox");
gui.add(debugObject, "reset");

const timer = new THREE.Timer();
timer.connect(document);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const animate = () => {
  renderer.render(scene, camera);

  const deltaTime = timer.getDelta();
  timer.update();

  // Update Physic World
  // Applying wind effect
  // sphereBody.applyForce(new CANNON.Vec3(0.5, 0, 0), sphereBody.position);
  world.step(1 / 60, deltaTime, 3);

  for (const object of objectsToUpdate) {
    object.mesh.position.copy(object.body.position);
    object.mesh.quaternion.copy(object.body.quaternion);
  }

  // sphere.position.x = sphereBody.position.x;
  // sphere.position.y = sphereBody.position.y;
  // sphere.position.z = sphereBody.position.z;
  // Copy Method
  // sphere.position.copy(sphereBody.position);

  controls.update();
  stats.update();

  window.requestAnimationFrame(animate);
};

animate();
