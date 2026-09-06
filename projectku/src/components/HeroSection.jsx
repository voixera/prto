import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { profile } from "../content/profile";
import heroLandscape from "../../gallery/download.jpg";
import { FloatingBadge } from "./ArtShapes";

const reveal = { hidden: { opacity: 0, y: 42 }, visible: { opacity: 1, y: 0 } };

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const photoY = useSpring(useTransform(scrollYProgress, [0, 0.3], [0, 100]), { stiffness: 70, damping: 24 });
  const photoScale = useSpring(useTransform(scrollYProgress, [0, 0.3], [1.04, 1.15]), { stiffness: 70, damping: 24 });
  const photoFilter = useTransform(scrollYProgress, [0, 0.3], [0, 3], (value) => `blur(${value}px)`);
  const words = profile.name.split(" ");

  return (
    <section id="home" className="overview-hero">
      <motion.div className="overview-photo-wrap" style={{ y: photoY, scale: photoScale, filter: photoFilter }} aria-hidden="true">
        <img className="overview-photo" src={heroLandscape} alt="" />
      </motion.div>
      <div className="overview-wash" aria-hidden="true" />
      <div className="overview-orbit" aria-hidden="true"><FloatingBadge className="overview-badge">JAWA TIMUR / ID</FloatingBadge></div>

      <div className="overview-kicker"><span className="hero-availability-dot" />FULL STACK / CREATIVE ENGINEERING</div>
      <div className="overview-title" aria-label={profile.name}>
        {words.map((word, index) => <motion.span key={word} className={`overview-title-line ${index === 1 ? "is-accent" : ""}`} variants={reveal} initial="hidden" animate="visible" transition={{ delay: .18 + index * .12, duration: .9, ease: [0.16, 1, .3, 1] }}>{word.toUpperCase()}</motion.span>)}
      </div>
       <motion.div className="overview-intro" variants={reveal} initial="hidden" animate="visible" transition={{ delay: .55, duration: .8 }}>
        <div className="overview-actions"><a href="#project" className="overview-link" data-cursor-label="EXPLORE">Explore projects <span>↘</span></a><a href={profile.discordInvite} target="_blank" rel="noreferrer" className="overview-link overview-link-muted">{profile.discordHandle}</a></div>
      </motion.div>
    </section>
  );
}
