import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Group, Math as ThreeMath } from "three";

const loader = new THREE.TextureLoader();

const ThreejsCookieObject = ({ className }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(105, 1, 0.1, 1000);

    camera.position.z = 3;
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor("0xff5c00", 0);

    renderer.setSize(800, 800);
    mountRef.current.appendChild(renderer.domElement);

    const group = new Group();

    const material = new THREE.MeshMatcapMaterial({
      color: 0xff5c00,
    });

    material.metalness = 0.2;
    material.roughness = 1;

    // Lights

    const light = new THREE.AmbientLight(0xffffff); // soft white light
    scene.add(light);

    scene.add(group);

    const sphere = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.11, 25), material);

    group.add(sphere);

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

    // Clock
    const clock = new THREE.Clock();

    // Animations

    const animation = () => {
      // Clock elapsed used for same speed on difrent monitors refresh rates
      const elapsedTime = clock.getElapsedTime();
      // Update objects

      const yOff = Math.sin(elapsedTime * 4);
      // Move the sphere up and down
      group.position.y = ThreeMath.lerp(0, 0.05, yOff);

      sphere.rotation.x += 0.005;
      sphere.rotation.y += 0.005;
      sphere.rotation.z += 0.005;

      // Rerender
      renderer.render(scene, camera);
      window.requestAnimationFrame(animation);
    };

    renderer.render(scene, camera);

    animation();

    // Disabled resizing because of positioning/canvas issues. Leaving this here since it might come in handy later
    // let onWindowResize = () => {
    //   camera.aspect = window.innerWidth / window.innerHeight;
    //   camera.updateProjectionMatrix();
    //   renderer.setSize(window.innerWidth, window.innerHeight);
    //   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // };

    // window.addEventListener("resize", onWindowResize, false);

    return () => mountRef.current.removeChild(renderer.domElement);
  }, []);

  return <div className={className} ref={mountRef}></div>;
};

export default ThreejsCookieObject;
