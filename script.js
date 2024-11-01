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

//Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x800080});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Outline
const edges = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({color: 0xccff66});
const outline = new THREE.LineSegments(edges, lineMaterial);
scene.add(outline);

//Orbit Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;	

//Animation
const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
}

tick();