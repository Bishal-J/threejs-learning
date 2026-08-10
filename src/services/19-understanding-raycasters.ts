import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

// Canvas
const canvas = document.getElementById("webgl") as HTMLCanvasElement;

// Scene
const scene = new THREE.Scene();

// const modelLoader = new GLTFLoader();

// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath("/draco/");
// modelLoader.setDRACOLoader(dracoLoader);

// // let animationMixer: THREE.AnimationMixer;

// const gltf = await modelLoader.loadAsync("/models/Hamburger/Burger.glb");

// gltf.scene.position.y = -1.2;
// gltf.scene.scale.set(-0.1, -0.5, -0.5);
// scene.add(gltf.scene);

const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);

// If all the mesh share the same material and if we try to update the color then for
// all the mesh it updates the color but if we set individual colors then only those colors
// are updated
// const sphereMaterial = new THREE.MeshBasicMaterial({
//   color: "#d2112b",
// });

const sphere1 = new THREE.Mesh(
  sphereGeometry,
  new THREE.MeshBasicMaterial({
    color: "#d2112b",
  }),
);
const sphere2 = new THREE.Mesh(
  sphereGeometry,
  new THREE.MeshBasicMaterial({
    color: "#d2112b",
  }),
);
sphere2.position.x = -2;
const sphere3 = new THREE.Mesh(
  sphereGeometry,
  new THREE.MeshBasicMaterial({
    color: "#d2112b",
  }),
);
sphere3.position.x = 2;

scene.add(sphere1, sphere2, sphere3);

// Raycaster
// const raycaster = new THREE.Raycaster();

// const rayOrigin = new THREE.Vector3(-3, 0, 0);
// const rayDirection = new THREE.Vector3(10, 0, 0);
// console.log(rayDirection.length());

// rayDirection.normalize();

// raycaster.set(rayOrigin, rayDirection);

// // IntersectObject or IntersectObjects
// const intersect = raycaster.intersectObject(sphere1);

// console.log(intersect);

// const intersects = raycaster.intersectObjects([sphere1, sphere2, sphere3]);
// console.log(intersects);

// Raycaster Update Sphere
const raycaster = new THREE.Raycaster();

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

// Mouse Control
const cursor = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
  cursor.x = (event.clientX / sizes.width) * 2 - 1;
  cursor.y = -(event.clientY / sizes.height) * 2 + 1;
});

window.addEventListener("click", function () {
  if (currentIntersect) {
    if (currentIntersect.object === sphere1) {
      console.log("clicked on sphere one");
    }
    if (currentIntersect.object === sphere2) {
      console.log("clicked on sphere two");
    }
    if (currentIntersect.object === sphere3) {
      console.log("clicked on sphere three");
    }
  }
});

// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.z = 3;
scene.add(camera);

// Lights
const ambientLight = new THREE.AmbientLight("#FFFFFF", 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight("#ffffff", 2);
pointLight.position.set(2, 3, 0);
scene.add(pointLight);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const timer = new THREE.Timer();
timer.connect(document);

let currentIntersect: THREE.Intersection<
  THREE.Object3D<THREE.Object3DEventMap>
> | null;

const tick = () => {
  // Update controls
  controls.update();

  timer.update();

  const elapsedTime = timer.getElapsed();

  // Animate
  sphere1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
  sphere2.position.y = Math.sin(elapsedTime * 1.3) * 1.5;
  sphere3.position.y = Math.sin(elapsedTime * 0.8) * 1.5;

  // Cast a ray
  // const rayOrigin = new THREE.Vector3(-3, 0, 0);
  // const rayDirection = new THREE.Vector3(1, 0, 0);
  // rayDirection.normalize();

  // raycaster.set(rayOrigin, rayDirection);

  // const objectsToTest = [sphere1, sphere2, sphere3];

  // const intersects = raycaster.intersectObjects(objectsToTest);

  // for (const object of objectsToTest) {
  //   object.material.color.set("#ff0000");
  // }

  // for (const intersect of intersects) {
  //   intersect.object.material.color.set("#00ff00");
  // }

  //
  raycaster.setFromCamera(cursor, camera);

  const objectsToTest = [sphere1, sphere2, sphere3];
  const intersects = raycaster.intersectObjects(objectsToTest);

  // for (const object of objectsToTest) {
  //   object.material.color.set("#ff0000");
  // }

  // for (const intersect of intersects) {
  //   intersect.object.material.color.set("#ff0ff0");
  // }

  if (intersects.length) {
    if (!currentIntersect) {
      console.log("mouse enter");
    }

    currentIntersect = intersects[0];
  } else {
    if (currentIntersect) {
      console.log("nothing being hovered");
    }
    currentIntersect = null;
  }

  // const modelIntersects = raycaster.intersectObject(gltf.scene);

  // if (modelIntersects.length) {
  //   gltf.scene.scale.set(1.2, 1.2, 1.2);
  // } else {
  //   gltf.scene.scale.set(1, 1, 1);
  // }

  // console.log(modelIntersects);

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
