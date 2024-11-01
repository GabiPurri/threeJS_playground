import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';



//Scene
const scene = new THREE.Scene();

//Camera
const sizes = {width: 800, height: 600};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

//Renderer
const canvas = document.querySelector('canvas.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor(0xf5f5dc); // Beige color

// Define colors for each face
const faceColors = [
    0xff0000, // Red
    0x00ff00, // Green
    0x0000ff, // Blue
    0xffff00, // Yellow
    0xff00ff, // Magenta
    0x00ffff  // Cyan
];

// Create an array of materials
const materials = faceColors.map(color => new THREE.MeshBasicMaterial({ color }));

// Create geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Assign materials to each face
for (let i = 0; i < geometry.groups.length; i++) {
    geometry.groups[i].materialIndex = i;
}

// Create the mesh with the geometry and materials
const mesh = new THREE.Mesh(geometry, materials);
scene.add(mesh);

// Outline
const edges = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({color: 0xccff66});
const outline = new THREE.LineSegments(edges, lineMaterial);
scene.add(outline);

// Orbit Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Animation
const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
}

tick();