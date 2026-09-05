import { motion, useReducedMotion } from "framer-motion";

export function OrganicShape({ className = "", size = 240, color = "var(--accent)", rotate = 0 }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={`organic-shape ${className}`}
      style={{ width: size, height: size, background: color, rotate }}
      animate={reduced ? undefined : { borderRadius: ["46% 54% 63% 37% / 42% 38% 62% 58%", "63% 37% 42% 58% / 55% 48% 52% 45%", "46% 54% 63% 37% / 42% 38% 62% 58%"] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function FloatingOrb({ className = "", size = 16, color = "var(--accent)" }) {
  return <span aria-hidden="true" className={`floating-orb ${className}`} style={{ width: size, height: size, background: color }} />;
}

export function Ring({ className = "", size = 180, color = "var(--accent)" }) {
  return <span aria-hidden="true" className={`art-ring ${className}`} style={{ width: size, height: size, borderColor: color }} />;
}

export function Arc({ className = "", size = 260, color = "var(--accent)" }) {
  return <span aria-hidden="true" className={`art-arc ${className}`} style={{ width: size, height: size, borderColor: color }} />;
}

export function FloatingBadge({ children, className = "" }) {
  return <span className={`floating-badge ${className}`}>{children}</span>;
}
