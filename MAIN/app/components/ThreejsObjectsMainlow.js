import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Math as ThreeMath } from "three";

const loader = new THREE.TextureLoader();

const ThreejsObjects = ({ className }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.z = 3;
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor("0xff5c00", 0);

    renderer.setSize(840, 560);
    mountRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();

    const material = new THREE.MeshStandardMaterial({
      color: 0xff5c00,
    });

    material.metalness = 0.2;
    material.roughness = 1;

    //lights

    const rectLight = new THREE.RectAreaLight(0xffffff, 0.5, 6, Math.PI * 0.1, 0.25, 1);
    rectLight.position.set(-1.5, 0, 1.5);
    rectLight.lookAt(new THREE.Vector3());

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 2, 3);

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(0, 2, 3);

    scene.add(rectLight, spotLight, pointLight);
    spotLight.target.position.x = -0.75;

    //helpers

    ///

    scene.add(group);

    const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(0.9, 16, 16), material);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.2, 4), material);

    sphere.position.x = -2;
    sphere.position.z = 0.5;
    sphere.position.y = 1;

    cone.position.x = 0.85;
    cone.position.z = 1.5;
    cone.position.y = 1.25;

    group.add(sphere, cone);

    loader.load(
      "https://cdn.cpixl.com/img/ctrl_texture.jpg",
      (texture) => {
        //Update Texture
        material.map = texture;
        material.needsUpdate = true;
      },
      (xhr) => {
        //Download Progress
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        //Error CallBack
        console.log("An error happened" + error);
      }
    );

    //clock
    const clock = new THREE.Clock();

    //animations

    const animation = () => {
      //clock elapsed used for same speeed on difrent monitors speed
      const elapsedTime = clock.getElapsedTime();
      //update objects
      sphere.rotation.y = 0.1 * elapsedTime;
      cone.rotation.y = 0.1 * elapsedTime;

      sphere.rotation.x = 0.16 * elapsedTime;
      cone.rotation.x = 0.16 * elapsedTime;
      cone.rotation.z = 0.3 * elapsedTime;

      const yOff = Math.sin(elapsedTime * 4);
      const yOff2 = Math.sin(elapsedTime * 2);
      // move the sphere up and down
      cone.position.y = ThreeMath.lerp(0.03, 0.05, yOff);
      //sphere.position.y = ThreeMath.lerp(-0.01, 0.05, yOff);

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

  return <div className={className} ref={mountRef}></div>;
};

export default ThreejsObjects;
