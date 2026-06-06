import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const PANELS = [
  {
    position: [-5.95, 2.06, -4.3],
    rotation: [0.02, 0.36, -0.08],
    size: [2.12, 0.94],
    delay: 0.1,
    accent: "#34d399",
    variant: "console",
    title: "portfolio.config",
    kicker: "/src/home",
    lines: ["role: Full Stack Developer", "stack: Next, React, Lua", "ship: SinyalKita"],
    chips: ["Next.js", "React"],
  },
  {
    position: [-4.82, 0.42, -3.1],
    rotation: [-0.03, 0.2, 0.05],
    size: [1.42, 0.72],
    delay: 0.8,
    accent: "#8ff7d2",
    variant: "module",
    title: "SyncedC0de",
    kicker: "A7OMIC space",
    lines: ["learn", "build", "share"],
    chips: ["web", "bot"],
  },
  {
    position: [-1.68, 1.86, -4.8],
    rotation: [0.04, -0.12, 0.08],
    size: [1.54, 0.68],
    delay: 1.4,
    accent: "#5eead4",
    variant: "route",
    title: "contact.api",
    kicker: "server/contact.js",
    lines: ["POST /api/contact", "validate payload", "send message"],
    chips: ["node", "json"],
  },
  {
    position: [0.6, 2.62, -6.1],
    rotation: [0.05, 0.05, -0.04],
    size: [1.74, 0.8],
    delay: 2.1,
    accent: "#f8fafc",
    variant: "stack",
    title: "motion.stack",
    kicker: "currently sharpening",
    lines: ["WebGL", "Animation", "UI systems"],
    chips: ["three", "gsap", "lenis"],
  },
  {
    position: [2.8, 1.3, -3.6],
    rotation: [-0.02, -0.34, 0.07],
    size: [2.12, 0.98],
    delay: 0.5,
    accent: "#60a5fa",
    variant: "project",
    title: "ClarityX.web",
    kicker: "react + vercel",
    lines: ["clean interface", "fast deploy", "responsive web"],
    chips: ["Vite", "Vercel"],
  },
  {
    position: [5.55, 2.18, -5.4],
    rotation: [0.04, -0.42, 0.1],
    size: [1.54, 0.7],
    delay: 1.8,
    accent: "#34d399",
    variant: "terminal",
    title: "bot.filter",
    kicker: "discord.js",
    lines: ["guildMemberAdd", "mod.log", "welcome.flow"],
    chips: ["Node", "Bot"],
  },
  {
    position: [4.66, -0.08, -2.2],
    rotation: [-0.04, -0.22, -0.06],
    size: [1.34, 0.74],
    delay: 2.6,
    accent: "#a7f3d0",
    variant: "lua",
    title: "roblox.lua",
    kicker: "ui helper",
    lines: ["local Frame", "TweenService", "ScreenGui"],
    chips: ["Lua", "GUI"],
  },
  {
    position: [-5.12, -0.94, -2.5],
    rotation: [0.05, 0.3, 0.12],
    size: [1.58, 0.74],
    delay: 3.0,
    accent: "#67e8f9",
    variant: "project",
    title: "HelloEnglish",
    kicker: "lesson flow",
    lines: ["quiz cards", "daily practice", "mobile first"],
    chips: ["React", "Vite"],
  },
  {
    position: [-3.22, -1.66, -2.2],
    rotation: [-0.02, 0.1, -0.1],
    size: [1.92, 0.82],
    delay: 1.0,
    accent: "#34d399",
    variant: "console",
    title: "sinyalkita.site",
    kicker: "public web",
    lines: ["route: /", "status: online", "deploy: vercel"],
    chips: ["web", "responsive"],
  },
  {
    position: [1.42, -1.24, -2.6],
    rotation: [0.03, -0.18, 0.08],
    size: [1.36, 0.64],
    delay: 2.3,
    accent: "#f8fafc",
    variant: "module",
    title: "SharpnessAI",
    kicker: "image utility",
    lines: ["upload", "enhance", "preview"],
    chips: ["AI", "React"],
  },
  {
    position: [3.86, -1.78, -3.4],
    rotation: [-0.03, -0.28, -0.04],
    size: [1.78, 0.78],
    delay: 3.4,
    accent: "#5eead4",
    variant: "route",
    title: "dashboard.ui",
    kicker: "quiet system",
    lines: ["scan", "compare", "repeat"],
    chips: ["CSS", "UX"],
  },
];

const RAILS = [
  { origin: [-5.8, -1.6, -3.6], height: 4.1, amp: 0.54, phase: 0.2, color: "#34d399", opacity: 0.36 },
  { origin: [-2.6, -2.1, -4.8], height: 5.3, amp: 0.36, phase: 1.4, color: "#67e8f9", opacity: 0.28 },
  { origin: [0.1, -2.3, -5.7], height: 5.8, amp: 0.46, phase: 2.4, color: "#f8fafc", opacity: 0.18 },
  { origin: [2.8, -1.7, -4.1], height: 4.4, amp: 0.5, phase: 3.6, color: "#34d399", opacity: 0.32 },
  { origin: [5.4, -2.2, -5.2], height: 5.1, amp: 0.42, phase: 4.8, color: "#60a5fa", opacity: 0.24 },
];

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  const bigint = parseInt(value, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function rgba(hex, alpha) {
  const color = hexToRgb(hex);
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function fillRoundedRect(ctx, x, y, width, height, radius, fillStyle) {
  roundedRect(ctx, x, y, width, height, radius);
  ctx.fillStyle = fillStyle;
  ctx.fill();
}

function strokeRoundedRect(ctx, x, y, width, height, radius, strokeStyle, lineWidth = 2) {
  roundedRect(ctx, x, y, width, height, radius);
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

function drawTruncatedText(ctx, text, x, y, maxWidth) {
  let label = text;
  while (ctx.measureText(label).width > maxWidth && label.length > 4) {
    label = `${label.slice(0, -4)}...`;
  }
  ctx.fillText(label, x, y);
}

function drawChip(ctx, label, x, y, accent) {
  ctx.font = "700 18px Inter, Arial, sans-serif";
  const width = Math.max(72, ctx.measureText(label).width + 28);
  fillRoundedRect(ctx, x, y, width, 34, 6, rgba(accent, 0.13));
  strokeRoundedRect(ctx, x, y, width, 34, 6, rgba(accent, 0.32), 1.5);
  ctx.fillStyle = rgba("#f8fafc", 0.84);
  ctx.fillText(label, x + 14, y + 23);
  return width;
}

function drawPanelGrid(ctx, width, height, accent) {
  ctx.save();
  ctx.globalAlpha = 0.55;
  ctx.strokeStyle = rgba(accent, 0.08);
  ctx.lineWidth = 1;
  for (let x = 32; x < width; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 42; y < height; y += 42) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPanelChrome(ctx, width, height, panel) {
  const accent = panel.accent;
  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, "rgba(3, 12, 10, 0.82)");
  bg.addColorStop(0.52, "rgba(5, 20, 16, 0.68)");
  bg.addColorStop(1, "rgba(2, 6, 6, 0.5)");

  fillRoundedRect(ctx, 10, 10, width - 20, height - 20, 8, bg);
  drawPanelGrid(ctx, width, height, accent);
  strokeRoundedRect(ctx, 12, 12, width - 24, height - 24, 8, rgba(accent, 0.42), 2);
  strokeRoundedRect(ctx, 24, 24, width - 48, height - 48, 4, "rgba(255, 255, 255, 0.05)", 1);

  ctx.fillStyle = rgba(accent, 0.78);
  ctx.fillRect(24, 30, 5, height - 60);
  ctx.fillRect(width - 92, 30, 48, 3);
  ctx.fillRect(width - 92, height - 34, 48, 3);

  const notchSize = 26;
  ctx.strokeStyle = rgba(accent, 0.5);
  ctx.lineWidth = 2;
  [
    [30, 30, 1, 1],
    [width - 30, 30, -1, 1],
    [30, height - 30, 1, -1],
    [width - 30, height - 30, -1, -1],
  ].forEach(([x, y, sx, sy]) => {
    ctx.beginPath();
    ctx.moveTo(x, y + sy * notchSize);
    ctx.lineTo(x, y);
    ctx.lineTo(x + sx * notchSize, y);
    ctx.stroke();
  });
}

function drawVariantBody(ctx, width, height, panel) {
  const accent = panel.accent;
  const contentX = 52;
  const contentTop = 102;
  const titleMaxWidth = width - 136;

  ctx.fillStyle = rgba(accent, 0.92);
  ctx.font = "800 18px Inter, Arial, sans-serif";
  ctx.letterSpacing = "0px";
  ctx.fillText(panel.kicker.toUpperCase(), contentX, 61);

  ctx.fillStyle = "rgba(248, 250, 252, 0.96)";
  ctx.font = "900 36px Inter, Arial, sans-serif";
  drawTruncatedText(ctx, panel.title, contentX, 94, titleMaxWidth);

  if (panel.variant === "stack") {
    const chipRows = [...panel.lines, ...panel.chips];
    chipRows.forEach((label, index) => {
      const x = contentX + (index % 3) * 132;
      const y = contentTop + Math.floor(index / 3) * 52;
      drawChip(ctx, label, x, y, accent);
    });
    return;
  }

  if (panel.variant === "route") {
    ctx.strokeStyle = rgba(accent, 0.34);
    ctx.lineWidth = 2;
    const nodes = [
      [contentX + 8, contentTop + 20],
      [contentX + 170, contentTop + 64],
      [contentX + 336, contentTop + 28],
    ];
    ctx.beginPath();
    ctx.moveTo(nodes[0][0], nodes[0][1]);
    ctx.bezierCurveTo(contentX + 92, contentTop + 4, contentX + 146, contentTop + 92, nodes[1][0], nodes[1][1]);
    ctx.bezierCurveTo(contentX + 226, contentTop + 92, contentX + 278, contentTop + 10, nodes[2][0], nodes[2][1]);
    ctx.stroke();
    nodes.forEach(([x, y], index) => {
      fillRoundedRect(ctx, x - 34, y - 18, 68, 36, 6, index === 1 ? rgba(accent, 0.22) : "rgba(255, 255, 255, 0.055)");
      strokeRoundedRect(ctx, x - 34, y - 18, 68, 36, 6, rgba(accent, 0.26), 1);
      ctx.fillStyle = index === 1 ? rgba(accent, 0.88) : "rgba(248, 250, 252, 0.72)";
      ctx.font = "900 17px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
      ctx.fillText(String(index + 1).padStart(2, "0"), x - 12, y + 6);
    });
  }

  if (panel.variant === "project" || panel.variant === "module") {
    const blockY = contentTop + 4;
    const blockW = width - 104;
    fillRoundedRect(ctx, contentX, blockY, blockW, 96, 8, "rgba(255, 255, 255, 0.045)");
    strokeRoundedRect(ctx, contentX, blockY, blockW, 96, 8, rgba(accent, 0.18), 1);
    panel.lines.forEach((line, index) => {
      const y = blockY + 26 + index * 24;
      const lineWidth = (blockW - 64) * (0.44 + index * 0.16);
      ctx.fillStyle = index === 0 ? rgba(accent, 0.54) : "rgba(248, 250, 252, 0.2)";
      fillRoundedRect(ctx, contentX + 24, y, lineWidth, 7, 3, ctx.fillStyle);
      ctx.font = "700 15px Inter, Arial, sans-serif";
      ctx.fillStyle = index === 0 ? rgba(accent, 0.96) : "rgba(248, 250, 252, 0.68)";
      drawTruncatedText(ctx, line, contentX + 24, y + 18, blockW - 48);
    });
  } else {
    ctx.font = "700 20px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    panel.lines.forEach((line, index) => {
      const y = contentTop + index * 34;
      ctx.fillStyle = index === 0 ? rgba(accent, 0.95) : "rgba(248, 250, 252, 0.74)";
      ctx.fillText(index === 0 ? ">" : "$", contentX, y);
      drawTruncatedText(ctx, line, contentX + 34, y, width - 112);
    });

    const cursorX = contentX + 34 + Math.min(360, ctx.measureText(panel.lines[0] ?? "").width + 12);
    fillRoundedRect(ctx, cursorX, contentTop - 20, 11, 24, 3, rgba(accent, 0.82));
  }

  let chipX = contentX;
  const chipY = height - 72;
  panel.chips.forEach((chip) => {
    chipX += drawChip(ctx, chip, chipX, chipY, accent) + 12;
  });
}

function createPanelTexture(panel, panelWidth, panelHeight) {
  if (typeof document === "undefined") return new THREE.Texture();

  const canvas = document.createElement("canvas");
  const width = 768;
  const height = Math.round(width * (panelHeight / panelWidth));
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture(canvas);

  ctx.clearRect(0, 0, width, height);
  drawPanelChrome(ctx, width, height, panel);
  drawVariantBody(ctx, width, height, panel);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

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
  const texture = useMemo(() => createPanelTexture(panel, width, height), [height, panel, width]);
  const edgeGeometry = useMemo(() => {
    const plane = new THREE.PlaneGeometry(width, height);
    return new THREE.EdgesGeometry(plane);
  }, [height, width]);

  useEffect(() => {
    return () => {
      edgeGeometry.dispose();
      texture.dispose();
    };
  }, [edgeGeometry, texture]);

  useFrame(({ clock }) => {
    if (!groupRef.current || reducedMotion) return;
    const t = clock.elapsedTime + panel.delay;
    groupRef.current.position.y = panel.position[1] + Math.sin(t * 0.78) * 0.11;
    groupRef.current.rotation.z = panel.rotation[2] + Math.sin(t * 0.52) * 0.025;
  });

  return (
    <group ref={groupRef} position={panel.position} rotation={panel.rotation}>
      <mesh position={[0.045, -0.045, -0.025]} scale={[1.025, 1.025, 1]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          color="#000000"
          depthWrite={false}
          opacity={0.26}
          side={THREE.DoubleSide}
          transparent
        />
      </mesh>

      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          color="#ffffff"
          depthWrite={false}
          map={texture}
          opacity={0.92}
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

      <mesh position={[-width * 0.49, 0, 0.024]}>
        <planeGeometry args={[0.024, height * 0.72]} />
        <meshBasicMaterial color={panel.accent} depthWrite={false} opacity={0.72} transparent />
      </mesh>

      <mesh position={[-width * 0.42, height * 0.36, 0.028]}>
        <circleGeometry args={[0.032, 18]} />
        <meshBasicMaterial color={panel.accent} depthWrite={false} opacity={0.82} transparent />
      </mesh>
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
          opacity={0.12}
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
