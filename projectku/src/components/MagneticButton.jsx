import { useRef, useCallback } from "react";

/**
 * MagneticButton — Wraps children with subtle magnetic pull effect
 * Only active on desktop (fine pointer + hover)
 */
export default function MagneticButton({ children, strength = 0.3 }) {
  const ref = useRef(null);

  const onMouseMove = useCallback((event) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (event.clientX - centerX) * strength;
    const deltaY = (event.clientY - centerY) * strength;

    el.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
  }, [strength]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `translate3d(0px, 0px, 0)`;
  }, []);

  // Check for fine pointer support
  const isFinePointer =
    typeof window !== "undefined"
      ? window.matchMedia("(pointer: fine)").matches
      : false;

  if (!isFinePointer) {
    return <>{children}</>;
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ display: "inline-flex" }}
    >
      {children}
    </div>
  );
}
