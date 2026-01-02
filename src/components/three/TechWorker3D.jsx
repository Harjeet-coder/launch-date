import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function TechWorker3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;

    /* ---------------- SCENE ---------------- */
    const scene = new THREE.Scene();

    /* ---------------- CAMERA ---------------- */
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2.5, 7);

    /* ---------------- RENDERER ---------------- */
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    /* ---------------- LIGHTS ---------------- */
    scene.add(new THREE.AmbientLight(0xff1e3c, 0.6));

    const keyLight = new THREE.PointLight(0x00ffe0, 2, 15);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    /* ---------------- FLOOR ---------------- */
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshBasicMaterial({
        color: 0x110000,
        transparent: true,
        opacity: 0.4,
      })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.2;
    scene.add(floor);

    /* ---------------- DESK ---------------- */
    const desk = new THREE.Mesh(
      new THREE.BoxGeometry(4, 0.25, 1.8),
      new THREE.MeshStandardMaterial({ color: 0x220000 })
    );
    desk.position.y = -0.6;
    scene.add(desk);

    /* ---------------- LAPTOP ---------------- */
    const laptopBase = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.08, 1),
      new THREE.MeshStandardMaterial({ color: 0x000000 })
    );
    laptopBase.position.set(0, -0.45, 0);
    scene.add(laptopBase);

    const laptopScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(1.4, 0.9),
      new THREE.MeshBasicMaterial({
        color: 0x00ffe0,
        transparent: true,
        opacity: 0.9,
      })
    );
    laptopScreen.position.set(0, 0.05, -0.5);
    laptopScreen.rotation.x = -0.4;
    scene.add(laptopScreen);

    /* ---------------- HUMAN SILHOUETTE ---------------- */
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.5, 1.6, 24),
      new THREE.MeshStandardMaterial({ color: 0x111111 })
    );
    body.position.y = 0.6;
    scene.add(body);

    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 24, 24),
      new THREE.MeshStandardMaterial({ color: 0x222222 })
    );
    head.position.y = 1.7;
    scene.add(head);

    /* ---------------- MOUSE INTERACTION ---------------- */
    let mouseX = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    /* ---------------- ANIMATION ---------------- */
    const animate = () => {
      body.rotation.y += 0.002;
      head.rotation.y += 0.002;

      laptopScreen.material.opacity =
        0.75 + Math.sin(Date.now() * 0.003) * 0.15;

      camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.05;
      camera.lookAt(0, 0.8, 0);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    /* ---------------- RESIZE ---------------- */
    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", resize);

    /* ---------------- CLEANUP ---------------- */
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div className="tech-worker-3d" ref={mountRef} />;
}
