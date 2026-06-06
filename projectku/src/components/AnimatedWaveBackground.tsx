import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const PANELS = [
  { position: [-5.8, 2.1, -4.2], rotation: [0.02, 0.36, -0.08], size: [1.8, 0.86], delay: 0.1, accent: "#34d399" },
  { position: [-3.9, 0.65, -2.9], rotation: [-0.03, 0.2, 0.05], size: [1.14, 0.66], delay: 0.8, accent: "#8ff7d2" },
  { position: [-1.85, 1.85, -4.8], rotation: [0.04, -0.12, 0.08], size: [1.28, 0.52], delay: 1.4, accent: "#5eead4" },
  { position: [0.7, 2.65, -6.1], rotation: [0.05, 0.05, -0.04], size: [1.6, 0.72], delay: 2.1, accent: "#f8fafc" },
  { position: [2.85, 1.35, -3.6], rotation: [-0.02, -0.34, 0.07], size: [1.92, 0.9], delay: 0.5, accent: "#60a5fa" },
  { position: [5.45, 2.28, -5.4], rotation: [0.04, -0.42, 0.1], size: [1.38, 0.62], delay: 1.8, accent: "#34d399" },
  { position: [4.65, -0.08, -2.2], rotation: [-0.04, -0.22, -0.06], size: [1.12, 0.72], delay: 2.6, accent: "#a7f3d0" },
  { position: [-5.05, -0.92, -2.5], rotation: [0.05, 0.3, 0.12], size: [1.4, 0.7], delay: 3.0, accent: "#67e8f9" },
  { position: [-2.15, -1.58, -1.9], rotation: [-0.02, 0.1, -0.1], size: [1.78, 0.78], delay: 1.0, accent: "#34d399" },
  { position: [1.45, -1.25, -2.6], rotation: [0.03, -0.18, 0.08], size: [1.22, 0.58], delay: 2.3, accent: "#f8fafc" },
  { position: [3.8, -1.74, -3.4], rotation: [-0.03, -0.28, -0.04], size: [1.7, 0.74], delay: 3.4, accent: "#5eead4" },
];

const RAILS = [
  { origin: [-5.8, -1.6, -3.6], height: 4.1, amp: 0.54, phase: 0.2, color: "#34d399", opacity: 0.36 },
  { origin: [-2.6, -2.1, -4.8], height: 5.3, amp: 0.36, phase: 1.4, color: "#67e8f9", opacity: 0.28 },
  { origin: [0.1, -2.3, -5.7], height: 5.8, amp: 0.46, phase: 2.4, color: "#f8fafc", opacity: 0.18 },
  { origin: [2.8, -1.7, -4.1], height: 4.4, amp: 0.5, phase: 3.6, color: "#34d399", opacity: 0.32 },
  { origin: [5.4, -2.2, -5.2], height: 5.1, amp: 0.42, phase: 4.8, color: "#60a5fa", opacity: 0.24 },
];

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  return reducedMotion;
}

function useCompactViewport() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => setIsCompact(window.innerWidth < 760);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return isCompact;
}

function usePointerParallax() {
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePointerMove = (event) => {
      targetRef.current = {
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return targetRef;
}

function FloatingPanel({ panel, reducedMotion }) {
  const groupRef = useRef(null);
  const [width, height] = panel.size;
  const edgeGeometry = useMemo(() => {
    const plane = new THREE.PlaneGeometry(width, height);
    return new THREE.EdgesGeometry(plane);
  }, [height, width]);
  const bars = useMemo(
    () => [
      { x: -width * 0.24, y: height * 0.19, w: width * 0.42, h: 0.035, opacity: 0.66 },
      { x: width * 0.2, y: height * 0.19, w: width * 0.18, h: 0.035, opacity: 0.38 },
      { x: -width * 0.16, y: -height * 0.02, w: width * 0.56, h: 0.028, opacity: 0.28 },
      { x: width * 0.03, y: -height * 0.19, w: width * 0.72, h: 0.028, opacity: 0.18 },
    ],
    [height, width]
  );

  useFrame(({ clock }) => {
    if (!groupRef.current || reducedMotion) return;
    const t = clock.elapsedTime + panel.delay;
    groupRef.current.position.y = panel.position[1] + Math.sin(t * 0.78) * 0.11;
    groupRef.current.rotation.z = panel.rotation[2] + Math.sin(t * 0.52) * 0.025;
  });

  return (
    <group ref={groupRef} position={panel.position} rotation={panel.rotation}>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          color="#07130f"
          depthWrite={false}
          opacity={0.36}
          side={THREE.DoubleSide}
          transparent
        />
      </mesh>

      <lineSegments geometry={edgeGeometry} position={[0, 0, 0.012]}>
        <lineBasicMaterial
          color={panel.accent}
          depthWrite={false}
          opacity={0.34}
          transparent
        />
      </lineSegments>

      <mesh position={[-width * 0.39, height * 0.34, 0.018]}>
        <circleGeometry args={[0.032, 18]} />
        <meshBasicMaterial color={panel.accent} depthWrite={false} opacity={0.78} transparent />
      </mesh>

      {bars.map((bar, index) => (
        <mesh key={`${panel.delay}-${index}`} position={[bar.x, bar.y, 0.02]}>
          <planeGeometry args={[bar.w, bar.h]} />
          <meshBasicMaterial
            color={index === 0 ? panel.accent : "#d7fff1"}
            depthWrite={false}
            opacity={bar.opacity}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}

function ParticleField({ count, reducedMotion }) {
  const pointsRef = useRef(null);
  const { positions, colors } = useMemo(() => {
    const nextPositions = new Float32Array(count * 3);
    const nextColors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#34d399"),
      new THREE.Color("#67e8f9"),
      new THREE.Color("#f8fafc"),
      new THREE.Color("#9ff7cf"),
    ];

    for (let index = 0; index < count; index += 1) {
      const seed = Math.sin(index * 91.17) * 10000;
      const randomA = seed - Math.floor(seed);
      const randomB = Math.sin(seed * 3.1) * 0.5 + 0.5;
      const randomC = Math.cos(seed * 7.3) * 0.5 + 0.5;
      const color = palette[index % palette.length];

      nextPositions[index * 3] = (randomA - 0.5) * 14;
      nextPositions[index * 3 + 1] = (randomB - 0.5) * 7;
      nextPositions[index * 3 + 2] = -1.4 - randomC * 7.8;

      nextColors[index * 3] = color.r;
      nextColors[index * 3 + 1] = color.g;
      nextColors[index * 3 + 2] = color.b;
    }

    return { positions: nextPositions, colors: nextColors };
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current || reducedMotion) return;
    const t = clock.elapsedTime;
    pointsRef.current.rotation.y = Math.sin(t * 0.08) * 0.035;
    pointsRef.current.position.y = Math.sin(t * 0.18) * 0.08;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        depthWrite={false}
        opacity={0.54}
        size={0.032}
        sizeAttenuation
        transparent
        vertexColors
      />
    </points>
  );
}

function MotionRail({ rail, reducedMotion }) {
  const lineRef = useRef(null);
  const geometry = useMemo(() => {
    const segments = 72;
    const points = new Float32Array(segments * 3);

    for (let index = 0; index < segments; index += 1) {
      const t = index / (segments - 1);
      points[index * 3] =
        rail.origin[0] + Math.sin(t * Math.PI * 2.2 + rail.phase) * rail.amp;
      points[index * 3 + 1] = rail.origin[1] + t * rail.height;
      points[index * 3 + 2] =
        rail.origin[2] + Math.cos(t * Math.PI * 1.6 + rail.phase) * 0.55;
    }

    const nextGeometry = new THREE.BufferGeometry();
    nextGeometry.setAttribute("position", new THREE.BufferAttribute(points, 3));
    return nextGeometry;
  }, [rail]);

  useFrame(({ clock }) => {
    if (!lineRef.current || reducedMotion) return;
    const t = clock.elapsedTime + rail.phase;
    lineRef.current.position.y = Math.sin(t * 0.42) * 0.22;
    lineRef.current.rotation.z = Math.sin(t * 0.28) * 0.04;
  });

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color={rail.color}
        depthWrite={false}
        opacity={rail.opacity}
        transparent
      />
    </line>
  );
}

function InterfaceGrid({ reducedMotion }) {
  const gridRef = useRef(null);

  useFrame(({ clock }) => {
    if (!gridRef.current || reducedMotion) return;
    const t = clock.elapsedTime;
    gridRef.current.position.z = -4.4 + Math.sin(t * 0.16) * 0.34;
  });

  return (
    <group ref={gridRef} position={[0, -2.76, -4.4]}>
      <mesh position={[0, -0.02, -1.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[34, 24]} />
        <meshBasicMaterial
          color="#02100b"
          depthWrite={false}
          opacity={0.3}
          side={THREE.DoubleSide}
          transparent
        />
      </mesh>
      <gridHelper args={[36, 42, "#34d399", "#0f766e"]} />
    </group>
  );
}

function MotionScene({ isCompact, pointerTargetRef, reducedMotion }) {
  const rootRef = useRef(null);
  const panelList = isCompact ? PANELS.slice(0, 6) : PANELS;

  useFrame(({ clock }, delta) => {
    if (!rootRef.current) return;
    const pointer = pointerTargetRef.current;
    const motionScale = reducedMotion ? 0.25 : 1;
    rootRef.current.rotation.y = THREE.MathUtils.damp(
      rootRef.current.rotation.y,
      pointer.x * 0.055 * motionScale,
      2.4,
      delta
    );
    rootRef.current.rotation.x = THREE.MathUtils.damp(
      rootRef.current.rotation.x,
      -pointer.y * 0.03 * motionScale,
      2.2,
      delta
    );
    rootRef.current.position.y = reducedMotion ? 0 : Math.sin(clock.elapsedTime * 0.18) * 0.08;
  });

  return (
    <>
      <color attach="background" args={["#020504"]} />
      <fog attach="fog" args={["#020504", 7.5, 18]} />
      <ambientLight intensity={0.62} />
      <group ref={rootRef}>
        <InterfaceGrid reducedMotion={reducedMotion} />
        <ParticleField count={isCompact ? 120 : 240} reducedMotion={reducedMotion} />
        {RAILS.map((rail) => (
          <MotionRail key={`${rail.origin[0]}-${rail.phase}`} rail={rail} reducedMotion={reducedMotion} />
        ))}
        {panelList.map((panel) => (
          <FloatingPanel key={`${panel.position[0]}-${panel.position[1]}`} panel={panel} reducedMotion={reducedMotion} />
        ))}
      </group>
    </>
  );
}

export default function AnimatedWaveBackground() {
  const reducedMotion = useReducedMotion();
  const isCompact = useCompactViewport();
  const pointerTargetRef = usePointerParallax();

  return (
    <div className="animatedWaveBackground" aria-hidden="true">
      <Canvas
        camera={{ fov: isCompact ? 58 : 50, position: [0, 1.55, 8.8], near: 0.1, far: 30 }}
        className="animatedWaveBackgroundCanvas"
        dpr={[1, 1.45]}
        gl={{
          alpha: false,
          antialias: false,
          powerPreference: "high-performance",
        }}
      >
        <MotionScene
          isCompact={isCompact}
          pointerTargetRef={pointerTargetRef}
          reducedMotion={reducedMotion}
        />
      </Canvas>
      <span className="motionBackdropGlow motionBackdropGlowA" />
      <span className="motionBackdropGlow motionBackdropGlowB" />
      <span className="motionBackdropScan" />
      <span className="motionBackdropVignette" />
    </div>
  );
}
