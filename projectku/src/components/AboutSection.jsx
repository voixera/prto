import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { profile } from "../content/profile";
import profileImage from "../../gallery/profil.jpeg";

function RevealText({ children }) {
  return <motion.span className="about-story-line" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .65, ease: [0.16, 1, .3, 1] }}>{children}</motion.span>;
}

export default function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useSpring(useTransform(scrollYProgress, [0, 1], [-28, 28]), { stiffness: 65, damping: 24 });
  const imageScale = useSpring(useTransform(scrollYProgress, [0, 1], [1.04, 1.09]), { stiffness: 65, damping: 24 });
  const pointerX = useSpring(useMotionValue(0), { stiffness: 120, damping: 24 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 120, damping: 24 });
  return <section ref={ref} id="about" className="about-story">
    <aside className="about-identity">
      <div className="about-story-portrait-wrap">
        <motion.div className="about-story-portrait" style={{ y: imageY, scale: imageScale, rotateX: pointerY, rotateY: pointerX }} onPointerMove={(event) => { const box = event.currentTarget.getBoundingClientRect(); pointerX.set((event.clientX - box.left - box.width / 2) / 150); pointerY.set(-(event.clientY - box.top - box.height / 2) / 150); }} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
          <img src={profileImage} alt="Faisal" loading="lazy" />
          <span className="about-online-status" aria-label="Online"><i aria-hidden="true" /></span>
        </motion.div>
      </div>
      <div className="about-identity-details"><h2>{profile.name}</h2><p>{profile.role}</p><span>{profile.location}</span></div>
      <div className="about-facts">
        <div><strong>{profile.age}</strong><span>years old</span></div>
        <div><strong>{String(profile.yearsExperience).padStart(2, "0")}</strong><span>years building</span></div>
        <div><strong>ID</strong><span>Indonesia</span></div>
      </div>
    </aside>
    <div className="about-story-copy">
      <h2 className="about-story-title">Hello I'm <em>Faisal.</em></h2>
      <div className="about-story-block"><span className="about-story-label">PROFILE</span><div className="about-story-content"><RevealText>I enjoy making things that are both useful and fun, from Discord bots to clean, interactive interfaces.</RevealText><RevealText>My approach stays focused on thoughtful UI, performance, and the details that make digital experiences feel good to use.</RevealText></div></div>
      <div className="about-story-block about-currently"><span className="about-story-label">CURRENTLY</span><div className="about-story-content"><RevealText>Exploring animation, WebGL, and interactive web experiences.</RevealText></div></div>
    </div>
  </section>;
}
