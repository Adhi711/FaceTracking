import { loadGLTF, loadTexture } from "./libs/loader.js";

const THREE = window.MINDAR.FACE.THREE;

document.addEventListener("DOMContentLoaded", () => {
  const start = async () => {
    // Initialize MindAR Face tracking
    const mindarThree = new window.MINDAR.FACE.MindARThree({
      container: document.body,
    });

    const { renderer, scene, camera } = mindarThree;

    // Add light to the scene
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    // Create and texture the face mesh
    const faceMesh = mindarThree.addFaceMesh();
    const texture = await loadTexture("./asserts/facemesh/face-mask-template/Face_Mask_Template.png");
    faceMesh.material.map = texture;
    faceMesh.material.transparent = true;
    faceMesh.material.needsUpdate = true;
    scene.add(faceMesh);

    // Start MindAR
    await mindarThree.start();

    // Continuous render loop
    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
  };

  start();
});