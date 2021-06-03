import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import texture from "./assets/Binary.jpg";

const loadingManager = new THREE.LoadingManager();
//textures

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load(texture);

//cursor

const App = () => {
  const mountRef = useRef(null);
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      105,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial();
    material.metalness = 0.45;
    material.roughness = 0.65;
    material.map = colorTexture;
    material.color.set("orange");

    //lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = 4;
    scene.add(pointLight);

    scene.add(group);

    const sphere = new THREE.Mesh(
      new THREE.SphereBufferGeometry(0.5, 16, 16),
      material
    );
    sphere.position.x = -1.5;

    const plane = new THREE.Mesh(
      new THREE.BoxBufferGeometry(1, 1, 1),
      material
    );

    const torus = new THREE.Mesh(
      new THREE.TorusBufferGeometry(0.3, 0.3, 16, 32),
      material
    );
    torus.position.x = 1.5;

    group.add(sphere, plane, torus);

    //clock
    const clock = new THREE.Clock();
    //Controls

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    //animations

    const tick = () => {
      //clock elapsed used for same speeed on difrent monitors speed
      const elapsedTime = clock.getElapsedTime();
      //update objects
      sphere.rotation.y = 0.1 * elapsedTime;
      plane.rotation.y = 0.2 * elapsedTime;
      torus.rotation.y = 0.3 * elapsedTime;

      sphere.rotation.x = 0.19 * elapsedTime;
      plane.rotation.x = 0.66 * elapsedTime;
      torus.rotation.x = -0.11 * elapsedTime;

      //update camera
      //update controls
      controls.update();

      //rerender
      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    };

    renderer.render(scene, camera);

    tick();

    let onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", onWindowResize, false);

    return () => mountRef.current.removeChild(renderer.domElement);
  }, []);

  return <div ref={mountRef}></div>;
};

export default App;
