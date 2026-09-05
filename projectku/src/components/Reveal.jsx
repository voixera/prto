import { motion } from "framer-motion";
import useReducedMotion from "../hooks/useReducedMotion";

export default function Reveal({ children, className = "", delay = 0, as: Tag = "div", variant = "fade" }) {
  const reduced = useReducedMotion();
  const Component = motion[Tag] || motion.div;
  const hidden = reduced ? {} : variant === "clip"
    ? { opacity: 0, clipPath: "inset(0 0 100% 0)" }
    : { opacity: 0, y: 28 };
  const shown = reduced ? {} : { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" };
  return (
    <Component
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.8, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}
