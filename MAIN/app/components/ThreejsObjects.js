import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Math as ThreeMath } from "three";

const loadingManager = new THREE.LoadingManager();

//textures
const textureLoader = new THREE.TextureLoader(loadingManager);
//const textureBinary = textureLoader.load("/texture.png");
//const [textureBinary] = useLoader(THREE.ImageLoader, ["/texture.png"]);

const ThreejsObjects = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.z = 3;
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor("0xFF5C00", 1);

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();

    const material = new THREE.MeshStandardMaterial({
      color: 0xff5c00,
    });

    material.metalness = 0.2;
    material.roughness = 1;
    //material.map = textureBinary;

    //lights

    const rectLight = new THREE.RectAreaLight(0x4e00ff, 0.5, 6, Math.PI * 0.1, 0.25, 1);
    rectLight.position.set(-1.5, 0, 1.5);
    rectLight.lookAt(new THREE.Vector3());

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 2, 3);

    scene.add(rectLight, spotLight);
    spotLight.target.position.x = -0.75;

    //helpers

    ///

    scene.add(group);

    const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(0.5, 16, 16), material);
    sphere.position.x = -1.5;

    const box = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), material);

    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.75, 1, 3), material);
    cone.position.x = 1.5;

    group.add(sphere, box, cone);

    //clock
    const clock = new THREE.Clock();

    //animations

    const animation = () => {
      //clock elapsed used for same speeed on difrent monitors speed
      const elapsedTime = clock.getElapsedTime();
      //update objects
      sphere.rotation.y = 0.1 * elapsedTime;
      box.rotation.y = 0.21 * elapsedTime;
      cone.rotation.y = 0.1 * elapsedTime;

      sphere.rotation.x = 0.16 * elapsedTime;
      box.rotation.x = 0.16 * elapsedTime;
      cone.rotation.x = 0.16 * elapsedTime;
      cone.rotation.z = 0.3 * elapsedTime;

      const yOff = Math.sin(elapsedTime * 4);
      // move the sphere up and down
      group.position.y = ThreeMath.lerp(0, 0.05, yOff);

      //rerender
      renderer.render(scene, camera);
      window.requestAnimationFrame(animation);
    };

    renderer.render(scene, camera);

    animation();

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

export default ThreejsObjects;
