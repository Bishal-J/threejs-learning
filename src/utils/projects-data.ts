export type Project = {
  title: string;
  description: string;
  link: string;
  lesson: number;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    lesson: 1,
    title: "Creating the Scene",
    description: `Learned the basics of setting up a Three.js application by creating a scene, adding a cube with BoxGeometry and MeshBasicMaterial, configuring a PerspectiveCamera, setting up WebGLRenderer with an HTML canvas, and rendering my first 3D scene in the browser.`,
    link: "./src/pages/01-creating-scene.html",
  },
  {
    lesson: 2,
    title: "Transforming Objects",
    description: `Learned how to organize scenes in Three.js using THREE.Group, apply object transformations like position, scale, and rotation, control cameras with lookAt(), explore vector operations, visualize coordinates with AxesHelper, and render a complete 3D scene using WebGLRenderer.`,
    link: "./src/pages/02-transforming-objects.html",
  },
  {
    lesson: 3,
    title: "Animations",
    description: `Learned the basics of animation with Three.js, installed and explored GSAP, and built a simple animated cube using sine and cosine for smooth motion. A great introduction to combining Three.js rendering with animation concepts.`,
    link: "./src/pages/03-animations.html",
  },
  {
    lesson: 4,
    title: "Understanding Cameras",
    description: `Today I learned about different camera types in Three.js, including Perspective and Orthographic cameras. I also explored custom camera controls and built-in OrbitControls with damping to create smooth, interactive 3D navigation.`,
    link: "./src/pages/04-understanding-cameras.html",
  },
  {
    lesson: 5,
    title: "Full Screen And Resizing",
    description: `Learned how to make a Three.js scene responsive by handling window resizing, updating the camera and renderer, managing pixel ratios for better performance, and adding a double-click fullscreen toggle for an improved viewing experience.`,
    link: "./src/pages/05-full-screen-resizing.html",
    featured: true,
  },
  {
    lesson: 6,
    title: "Different Geometries",
    description: `Learned how to create custom geometry in Three.js using BufferGeometry and Float32Array. Explored built-in geometries, defined vertex positions with BufferAttribute, and generated random vertices to build and render custom 3D shapes`,
    link: "./src/pages/06-different-geometries.html",
  },
  {
    lesson: 7,
    title: "Debug UI",
    description: `Learned how to use lil-gui in Three.js to build a debugging UI, enabling real-time control of geometry, material, position, rotation, visibility, and animations. Also explored updating geometry dynamically while managing GPU memory efficiently.`,
    link: "./src/pages/07-debug-ui.html",
  },
  {
    lesson: 8,
    title: "Understanding Textures",
    description: `Learned how to load and apply textures in Three.js using TextureLoader, manage asset loading with LoadingManager, and explored texture properties, filtering, mipmaps, and the role of UV unwrapping in mapping textures onto 3D models.`,
    link: "./src/pages/08-understanding-textures.html",
  },
  {
    lesson: 9,
    title: "Understanding Materials",
    description: `Learned how Three.js materials work, exploring MeshBasic, Standard, Phong, Toon, and other material types. Experimented with textures, environment maps, lighting, and GUI controls to understand how material properties affect rendering.`,
    link: "./src/pages/09-understanding-materials.html",
  },
  {
    lesson: 10,
    title: "3D Text",
    description: `Learned how to create 3D text in Three.js using custom fonts and TextGeometry. Explored beveling, centering geometry, matcap materials, and built a scene with randomly placed 3D torus objects.`,
    link: "./src/pages/10-3d-text.html",
  },
  {
    lesson: 11,
    title: "Understanding Lights",
    description: `Learned how to use different Three.js lights, including Ambient, Directional, Hemisphere, Point, Spot, and Rect Area lights, and explored light helpers to visualize and debug light positions, directions, and behavior within a 3D scene.`,
    link: "./src/pages/11-understanding-lights.html",
  },
  {
    lesson: 12,
    title: "Understanding Shadows",
    description: `Learned how to use Three.js shadows, including shadow cameras and Camera Helpers, optimized shadow quality with map size and camera settings, and compared real-time shadows with baked shadows for better rendering performance and visual quality.`,
    link: "./src/pages/12-understanding-shadows.html",
  },
  {
    lesson: 13,
    title: "Haunted House",
    description: `Built a haunted house scene in Three.js using basic geometries, PBR textures, dynamic lighting, shadows, fog, and animated ghost lights. Combined materials, environment effects, and lighting to create a spooky, immersive atmosphere.`,
    link: "./src/pages/13-haunted-house.html",
    featured: true,
  },
  {
    lesson: 14,
    title: "Understanding Particles",
    description: `Learned how to create and animate particles in Three.js using BufferGeometry and PointsMaterial. Explored custom particle positions, vertex colors, textures, additive blending, and real-time animation to build dynamic, interactive particle effects.`,
    link: "./src/pages/14-understanding-particles.html",
  },
  {
    lesson: 15,
    title: "Galaxy Generator",
    description: `Learned how to create a procedural galaxy generator in Three.js with Points and BufferGeometry. Explored generating thousands of particles, positioning them with mathematical formulas, adding randomness, applying color gradients, and creating an interactive system to control galaxy parameters in real time.`,
    link: "/src/pages/15-galaxy-generator.html",
    featured: true,
  },
  {
    lesson: 16,
    title: "Scroll Based Animation",
    description: ``,
    link: "/src/pages/16-scroll-based-animation.html",
    featured: true,
  },
];

// {
//     lesson: ,
//     title: "",
//     description: ``,
//     link: "/src/pages/",
//   },
