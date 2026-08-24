import { useEffect, useRef } from "react";
import * as THREE from "three";
import useReducedMotion from "../hooks/useReducedMotion";

function isMobileViewport() {
  return window.matchMedia("(max-width: 860px)").matches || window.matchMedia("(pointer: coarse)").matches;
}

export default function Hero3DScene() {
  const containerRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mobile = isMobileViewport();
    const width = container.clientWidth || 520;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.2, mobile ? 8.2 : 7.1);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !mobile,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.75));
    container.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const cyan = 0x8ecbff;
    const paper = 0xe8ece8;
    const lineMat = new THREE.LineBasicMaterial({
      color: cyan,
      transparent: true,
      opacity: 0.55,
    });
    const faintMat = new THREE.LineBasicMaterial({
      color: paper,
      transparent: true,
      opacity: 0.18,
    });

    const frame = (w, h, d) => {
      const geo = new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d));
      return new THREE.LineSegments(geo, lineMat.clone());
    };

    const board = frame(3.4, 2.1, 0.08);
    board.position.set(-0.15, 0.15, 0);
    root.add(board);

    const panel = frame(1.7, 2.4, 0.08);
    panel.position.set(1.55, -0.35, 0.7);
    panel.rotation.y = 0.38;
    root.add(panel);

    const slab = frame(2.2, 0.9, 0.08);
    slab.position.set(-1.2, -1.15, 0.45);
    slab.rotation.x = -0.18;
    root.add(slab);

    const axis = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-2.6, 0, 0),
      new THREE.Vector3(2.8, 0, 0),
      new THREE.Vector3(0, -1.8, 0),
      new THREE.Vector3(0, 1.9, 0),
    ]);
    root.add(new THREE.LineSegments(axis, faintMat));

    const nodeGeo = new THREE.SphereGeometry(0.045, 10, 10);
    const nodeMat = new THREE.MeshBasicMaterial({ color: cyan });
    const nodes = [
      [-1.7, 1.05, 0.2],
      [1.7, 1.2, 0.4],
      [0.2, -1.4, 0.6],
      [2.1, -0.6, 1.1],
    ].map(([x, y, z]) => {
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      mesh.position.set(x, y, z);
      root.add(mesh);
      return mesh;
    });

    const links = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-1.7, 1.05, 0.2),
      new THREE.Vector3(1.7, 1.2, 0.4),
      new THREE.Vector3(1.7, 1.2, 0.4),
      new THREE.Vector3(2.1, -0.6, 1.1),
      new THREE.Vector3(-1.7, 1.05, 0.2),
      new THREE.Vector3(0.2, -1.4, 0.6),
    ]);
    root.add(new THREE.LineSegments(links, lineMat));

    if (!mobile) {
      const count = 48;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i += 1) {
        positions[i * 3] = (Math.random() - 0.5) * 6;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 4.2;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
      }
      const points = new THREE.BufferGeometry();
      points.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      root.add(
        new THREE.Points(
          points,
          new THREE.PointsMaterial({
            color: paper,
            size: 0.028,
            transparent: true,
            opacity: 0.35,
          })
        )
      );
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const onMove = (event) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const clock = new THREE.Clock();
    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      if (!reduced) {
        board.rotation.y = Math.sin(t * 0.22) * 0.08;
        panel.rotation.x = Math.sin(t * 0.18) * 0.06;
        slab.rotation.z = Math.cos(t * 0.16) * 0.04;
        nodes.forEach((node, index) => {
          node.scale.setScalar(1 + Math.sin(t * 2 + index) * 0.18);
        });
        targetX += (mouseX * 0.35 - targetX) * 0.05;
        targetY += (mouseY * 0.28 - targetY) * 0.05;
        root.rotation.y = targetX;
        root.rotation.x = targetY;
        root.position.y = Math.sin(t * 0.6) * 0.06;
      }
      renderer.render(scene, camera);
    };
    animate();

    const resize = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const nextW = entry.contentRect.width;
        const nextH = entry.contentRect.height;
        if (nextW < 2 || nextH < 2) continue;
        camera.aspect = nextW / nextH;
        camera.updateProjectionMatrix();
        renderer.setSize(nextW, nextH);
      }
    });
    resize.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      resize.disconnect();
      window.removeEventListener("pointermove", onMove);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((mat) => mat.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, [reduced]);

  return <div ref={containerRef} className="hero-canvas" aria-hidden="true" />;
}
