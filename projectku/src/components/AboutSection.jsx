import { useRef } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { profile } from "../content/profile";
import aboutLandscape from "../../gallery/download (1).jpg";

const storyLines = [
  "I'm an Information System student",
  "and developer focused on modern UI,",
  "performance, and user experience.",
];

function StoryLine({ children, index }) {
  return <motion.span className="about-story-line" initial={{ y: "105%" }} whileInView={{ y: 0 }} viewport={{ once: true, amount: .7 }} transition={{ delay: index * .09, duration: .8, ease: [0.16, 1, .3, 1] }}>{children}</motion.span>;
}

function InfoLink({ label, value, href }) {
  return <motion.a className="about-info-link" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} whileHover={{ x: 6 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}><span>{label}</span><strong>{value}</strong><i aria-hidden="true">↗</i></motion.a>;
}

export default function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useSpring(useTransform(scrollYProgress, [0, 1], [-28, 28]), { stiffness: 65, damping: 24 });
  const imageScale = useSpring(useTransform(scrollYProgress, [0, 1], [1.04, 1.09]), { stiffness: 65, damping: 24 });
  const pointerX = useSpring(useMotionValue(0), { stiffness: 120, damping: 24 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 120, damping: 24 });
  const discord = profile.socials.find((social) => social.label === "Discord");
  const group = profile.groups[0];

  return <section ref={ref} id="about" className="about-story">
    <div className="about-story-index">01 <span>/ ABOUT</span></div>
    <div className="about-story-portrait-wrap">
      <motion.div className="about-story-portrait" style={{ y: imageY, scale: imageScale, rotateX: pointerY, rotateY: pointerX }} onPointerMove={(event) => { const box = event.currentTarget.getBoundingClientRect(); pointerX.set((event.clientX - box.left - box.width / 2) / 150); pointerY.set(-(event.clientY - box.top - box.height / 2) / 150); }} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
        <img src={aboutLandscape} alt="Mountain landscape" loading="lazy" />
        <span className="about-portrait-mark">AF / 01</span>
      </motion.div>
    </div>
    <div className="about-story-copy">
      <motion.p className="about-story-kicker" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>A LITTLE ABOUT ME</motion.p>
      <h2 className="about-story-title"><span>Learning by</span><em>building.</em></h2>
      <p className="about-story-lede">{profile.tagline}</p>
      <div className="about-story-body">{storyLines.map((line, index) => <StoryLine key={line} index={index}>{line}</StoryLine>)}<span className="about-story-line"><span className="about-story-muted">Currently exploring animation, WebGL, and interactive web experiences.</span></span></div>
      <div className="about-facts">
        <div><strong>{profile.age}</strong><span>years old</span></div>
        <div><strong>{String(profile.yearsExperience).padStart(2, "0")}</strong><span>years building</span></div>
        <div><strong>ID</strong><span>{profile.location}</span></div>
      </div>
      <div className="about-info-links"><InfoLink label="DISCORD" value={profile.discordHandle} href={discord?.href || profile.discordInvite} /><InfoLink label="COMMUNITY" value={group.name} href={group.inviteUrl} /></div>
    </div>
  </section>;
}
