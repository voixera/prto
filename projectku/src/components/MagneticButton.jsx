import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * MagneticButton — Wraps children with subtle magnetic pull effect
 * Only active on desktop (fine pointer + hover)
 */
export default function MagneticButton({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 24 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 24 });
  const onMouseMove = (event) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (event.clientX - centerX) * strength;
    const deltaY = (event.clientY - centerY) * strength;

    x.set(deltaX); y.set(deltaY);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  // Check for fine pointer support
  const isFinePointer =
    typeof window !== "undefined"
      ? window.matchMedia("(pointer: fine)").matches
      : false;

  if (!isFinePointer) {
    return <>{children}</>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ display: "inline-flex", x, y }}
    >
      {children}
    </motion.div>
  );
}
