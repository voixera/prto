import { useEffect, useRef, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion";

export default function Reveal({ children, className = "", delay = 0, as: Tag = "div", variant = "fade", duration = 400 }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  // compute style based on variant and visibility
  const baseStyle = delay ? { transitionDelay: `${delay}ms` } : {};
  const variantStyle = (() => {
    if (variant === "clip") {
      return {
        clipPath: visible ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
        transition: `clip-path ${duration}ms ease`,
      };
    }
    return {};
  })();
  const combinedStyle = { ...baseStyle, ...variantStyle };

  return (
    <Tag
      ref={ref}
      className={`reveal ${variant === "clip" ? "clip-reveal" : ""} ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={combinedStyle}
    >
      {children}
    </Tag>
  );
}
