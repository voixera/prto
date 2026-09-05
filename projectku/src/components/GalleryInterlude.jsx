import { motion, useScroll, useTransform } from "framer-motion";
import first from "../../gallery/download (1).jpg";
import second from "../../gallery/PWS 211 Hardscape Materials Handbook.jpg";

export default function GalleryInterlude() {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, .35], [0, -90]);
  return <section className="gallery-interlude" aria-label="Visual direction">
    <motion.div className="gallery-word" style={{ x }}>OBSERVE / BUILD / REPEAT</motion.div>
    <div className="gallery-frames" aria-hidden="true">
      <motion.img className="gallery-frame gallery-frame-one" src={first} alt="" loading="lazy" style={{ y: useTransform(scrollYProgress, [.03, .35], [50, -40]) }} />
      <motion.img className="gallery-frame gallery-frame-two" src={second} alt="" loading="lazy" style={{ y: useTransform(scrollYProgress, [.05, .4], [-30, 70]) }} />
    </div>
    <p className="gallery-caption">A developer's practice is part logic, part landscape.<br />The rest is attention.</p>
  </section>;
}
