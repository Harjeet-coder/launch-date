import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroThreeInteractiveBG() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;

    /* ---------------- SCENE ---------------- */
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 25 , 200); // 👈 depth fog (3D feel)

    /* ---------------- CAMERA ---------------- */
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 9.5;

    /* ---------------- RENDERER ---------------- */
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    /* ---------------- GRID ---------------- */
    const grid = new THREE.GridHelper(26, 52, 0x330000, 0x110000);
    grid.position.y = -2.8;
    grid.material.opacity = 0.25;
    grid.material.transparent = true;
    scene.add(grid);

    /* ---------------- NODES ---------------- */
    let nodes, nodeGeometry, nodeMaterial;
    let positions, nodeCount;

    const createNodes = () => {
      if (nodes) {
        scene.remove(nodes);
        nodeGeometry.dispose();
      }

      const area = container.clientWidth * container.clientHeight;
      nodeCount = Math.floor(area / 3500); // ~10% increased density

      positions = new Float32Array(nodeCount * 3);

      for (let i = 0; i < nodeCount; i++) {
        // Thicker spherical volume (better 3D)
        const radius = 3.5 + Math.random() * 4.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] =
          radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
      }

      nodeGeometry = new THREE.BufferGeometry();
      nodeGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      nodeMaterial = new THREE.PointsMaterial({
        color: 0xff1e3c,
        size: 0.015,                 // 👈 slightly larger
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
        sizeAttenuation: true,
              // 👈 CRITICAL for 3D depth
      });

      nodes = new THREE.Points(nodeGeometry, nodeMaterial);
      scene.add(nodes);
    };

    /* ---------------- RESIZE ---------------- */
    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;

      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      createNodes();
    };

    resize();
    window.addEventListener("resize", resize);

    /* ---------------- MOUSE ---------------- */
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", onMouseMove);

    /* ---------------- ANIMATION ---------------- */
    let time = 0;

    const animate = () => {
      time += 0.0025;

      /* Faster globe-like rotation (still smooth) */
      nodes.rotation.y += 0.0022;
      nodes.rotation.x += 0.0011;

      /* Grid subtle motion */
      grid.rotation.z += 0.0003;

      /* True 3D camera orbit + mouse */
      const orbitRadius = 9.5;
      camera.position.x =
        Math.sin(time * 0.6) * orbitRadius * 0.08 +
        mouseX * 1.4;

      camera.position.y =
        Math.cos(time * 0.4) * orbitRadius * 0.06 -
        mouseY * 1.2;

      camera.position.z =
        orbitRadius + Math.sin(time * 0.5) * 0.4;

      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    /* ---------------- CLEANUP ---------------- */
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      container.removeChild(renderer.domElement);
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div className="hero-three-bg" ref={mountRef} />;
}
