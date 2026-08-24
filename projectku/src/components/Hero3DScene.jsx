import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3DScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for mouse rotation
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Icosahedron Wireframe + Inner Core
    const geoIcosa = new THREE.IcosahedronGeometry(1.8, 1);
    const matWire = new THREE.MeshBasicMaterial({
      color: 0x70baff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const meshWire = new THREE.Mesh(geoIcosa, matWire);
    mainGroup.add(meshWire);

    // Inner glowing sphere
    const geoSphere = new THREE.SphereGeometry(0.9, 24, 24);
    const matSphere = new THREE.MeshBasicMaterial({
      color: 0x77d6b2,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const innerSphere = new THREE.Mesh(geoSphere, matSphere);
    mainGroup.add(innerSphere);

    // 2. Torus Rings (Orbiting Coordinate Rings)
    const geoTorus1 = new THREE.TorusGeometry(2.4, 0.015, 16, 100);
    const matTorus1 = new THREE.MeshBasicMaterial({
      color: 0x70baff,
      transparent: true,
      opacity: 0.5,
    });
    const ring1 = new THREE.Mesh(geoTorus1, matTorus1);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const geoTorus2 = new THREE.TorusGeometry(2.6, 0.015, 16, 100);
    const matTorus2 = new THREE.MeshBasicMaterial({
      color: 0xc7a6ff,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(geoTorus2, matTorus2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    mainGroup.add(ring2);

    // 3. Surrounding Code Data Points (Particles)
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.2 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xedf3f7,
      size: 0.04,
      transparent: true,
      opacity: 0.65,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particleSystem);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouseX = (clientX / width) * 2 - 1;
      mouseY = -(clientY / height) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Render loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth rotation
        meshWire.rotation.y = elapsedTime * 0.2;
        meshWire.rotation.x = elapsedTime * 0.12;

        innerSphere.rotation.y = -elapsedTime * 0.3;

        ring1.rotation.z = elapsedTime * 0.15;
        ring2.rotation.z = -elapsedTime * 0.12;

        particleSystem.rotation.y = elapsedTime * 0.05;

        // Mouse Lerp
        targetX += (mouseX * 0.6 - targetX) * 0.05;
        targetY += (mouseY * 0.6 - targetY) * 0.05;

        mainGroup.rotation.y = targetX;
        mainGroup.rotation.x = -targetY;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });

    resizeObserver.observe(container);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geoIcosa.dispose();
      matWire.dispose();
      geoSphere.dispose();
      matSphere.dispose();
      geoTorus1.dispose();
      matTorus1.dispose();
      geoTorus2.dispose();
      matTorus2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="hero-3d-canvas-container" aria-hidden="true" />;
}
