import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Group, Math as ThreeMath } from "three";

const loader = new THREE.TextureLoader();

const ThreejsCookieObject = ({ className }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.z = 3;
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor("0xFF5C00", 0);

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();

    const material = new THREE.MeshMatcapMaterial({
      color: 0xff5c00,
    });

    material.metalness = 0.2;
    material.roughness = 1;

    //lights

    const light = new THREE.AmbientLight(0xffffff); // soft white light
    scene.add(light);

    //helpers

    ///

    scene.add(group);

    const sphere = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.21, 25), material);

    const sphere1 = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.21, 25), material);
    const sphere2 = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.21, 25), material);
    const sphere3 = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.21, 25), material);

    group.add(sphere, sphere1, sphere2, sphere3);

    sphere1.position.z = -6;
    sphere1.position.y = -0.7;
    sphere2.position.z = -6;
    sphere2.position.y = -0.7;
    sphere3.position.z = -6;
    sphere3.position.y = -0.7;
    sphere1.position.x = -2.4;
    sphere2.position.x = 2.4;

    sphere.position.y = -0.91;
    sphere.position.z = 1;

    loader.load(
      "https://cdn.cpixl.com/img/ctrl_cookieTexture.png",
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

      const yOff = Math.sin(elapsedTime * 4);
      // move the sphere up and down
      group.position.y = ThreeMath.lerp(0, 0.05, yOff);

      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      sphere.rotation.z += 0.01;

      sphere1.rotation.x += 0.025;
      sphere1.rotation.y += 0.05;
      sphere1.rotation.z += 0.015;

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

export default ThreejsCookieObject;
