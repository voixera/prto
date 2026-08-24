import { useEffect, useRef } from "react";
import * as THREE from "three";
import useReducedMotion from "../hooks/useReducedMotion";

function isMobileViewport() {
  return (
    window.matchMedia("(max-width: 860px)").matches ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

/**
 * Hero3DScene — Refined metallic geometric sculpture
 * Abstract crystalline form with mouse-reactive rotation
 */
export default function Hero3DScene({ pointer = { x: 0, y: 0 } }) {
  const containerRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mobile = isMobileViewport();
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 400;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0.5, mobile ? 9 : 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !mobile,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.2 : 1.6));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Root group for all objects
    const root = new THREE.Group();
    scene.add(root);

    // Color palette — warm metallic with accent
    const accent = 0xc9a87c;       // Warm gold/bronze accent
    const metal = 0xb8b5af;        // Cool silver/metallic
    const dim = 0x55585c;          // Dim structural lines

    // ── Main geometric form: Icosahedron wireframe (crystalline core) ──
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: accent,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    root.add(core);

    // Inner solid form — subtle fill
    const innerGeo = new THREE.IcosahedronGeometry(1.15, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.04,
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    root.add(inner);

    // ── Outer frame: Octahedron edges (structural cage) ──
    const frameGeo = new THREE.OctahedronGeometry(2.4, 0);
    const frameEdges = new THREE.EdgesGeometry(frameGeo);
    const frameMat = new THREE.LineBasicMaterial({
      color: metal,
      transparent: true,
      opacity: 0.18,
    });
    const frame = new THREE.LineSegments(frameEdges, frameMat);
    root.add(frame);

    // ── Secondary tilted ring ──
    const ringGeo = new THREE.TorusGeometry(1.85, 0.008, 8, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.3,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    ring.rotation.z = Math.PI / 6;
    root.add(ring);

    // Second ring — orthogonal
    const ring2Geo = new THREE.TorusGeometry(2.1, 0.006, 8, 48);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: metal,
      transparent: true,
      opacity: 0.12,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 3;
    root.add(ring2);

    // ── Axis lines (subtle coordinate reference) ──
    const axisLength = 3.2;
    const axisPoints = [
      new THREE.Vector3(-axisLength, 0, 0),
      new THREE.Vector3(axisLength, 0, 0),
      new THREE.Vector3(0, -axisLength * 0.7, 0),
      new THREE.Vector3(0, axisLength * 0.7, 0),
    ];
    const axisGeo = new THREE.BufferGeometry().setFromPoints(axisPoints);
    const axisMat = new THREE.LineBasicMaterial({
      color: dim,
      transparent: true,
      opacity: 0.12,
    });
    const axisLines = new THREE.LineSegments(axisGeo, axisMat);
    root.add(axisLines);

    // ── Node points at key vertices ──
    const nodePositions = [
      [1.4, 1.1, 0.6],
      [-1.2, 1.3, 0.4],
      [0.8, -1.2, 0.8],
      [-0.6, -0.9, 1.3],
      [1.8, -0.3, -0.5],
    ];
    const nodeGeo = new THREE.SphereGeometry(0.035, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: accent });

    const nodes = nodePositions.map(([x, y, z]) => {
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      mesh.position.set(x, y, z);
      root.add(mesh);
      return mesh;
    });

    // ── Connecting lines between nodes ──
    if (nodePositions.length >= 4) {
      const linkPoints = [
        new THREE.Vector3(...nodePositions[0]),
        new THREE.Vector3(...nodePositions[1]),
        new THREE.Vector3(...nodePositions[1]),
        new THREE.Vector3(...nodePositions[2]),
        new THREE.Vector3(...nodePositions[0]),
        new THREE.Vector3(...nodePositions[3]),
        new THREE.Vector3(...nodePositions[2]),
        new THREE.Vector3(...nodePositions[4]),
      ];
      const linkGeo = new THREE.BufferGeometry().setFromPoints(linkPoints);
      const linkMat = new THREE.LineBasicMaterial({
        color: accent,
        transparent: true,
        opacity: 0.25,
      });
      root.add(new THREE.LineSegments(linkGeo, linkMat));
    }

    // ── Particle field (desktop only) ──
    let particles = null;
    if (!mobile) {
      const particleCount = 36;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 7;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const pMat = new THREE.PointsMaterial({
        color: metal,
        size: 0.02,
        transparent: true,
        opacity: 0.28,
        sizeAttenuation: true,
      });
      particles = new THREE.Points(pGeo, pMat);
      root.add(particles);
    }

    // ── Mouse tracking & animation ──
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const onMove = (event) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    const clock = new THREE.Clock();
    let rafId = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!reduced) {
        // Core slow rotation
        core.rotation.x = t * 0.12 + mouseY * 0.15;
        core.rotation.y = t * 0.18 + mouseX * 0.2;

        // Inner counter-rotation
        inner.rotation.x = -t * 0.08;
        inner.rotation.y = -t * 0.14;

        // Frame subtle tilt
        frame.rotation.x = Math.sin(t * 0.08) * 0.06;
        frame.rotation.z = Math.cos(t * 0.06) * 0.04;

        // Ring rotations
        ring.rotation.z = t * 0.15;
        ring2.rotation.x = t * 0.09;
        ring2.rotation.z = -t * 0.11;

        // Node pulse
        nodes.forEach((node, i) => {
          const scale = 1 + Math.sin(t * 1.5 + i * 1.2) * 0.25;
          node.scale.setScalar(scale);
        });

        // Smooth mouse follow
        targetRotX += (mouseX * 0.35 - targetRotX) * 0.04;
        targetRotY += (mouseY * 0.28 - targetRotY) * 0.04;
        root.rotation.y = targetRotX;
        root.rotation.x = targetRotY;

        // Gentle float
        root.position.y = Math.sin(t * 0.4) * 0.08;

        // Particle drift
        if (particles) {
          particles.rotation.y = t * 0.03;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handling
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w < 2 || h < 2) continue;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    };
  }, [reduced]);

  return <div ref={containerRef} className="hero-canvas" aria-hidden="true" />;
}
