import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { profile } from "../content/profile";
import heroLandscape from "../../gallery/download.jpg";
import { FloatingBadge, OrganicShape } from "./ArtShapes";

const reveal = { hidden: { opacity: 0, y: 42 }, visible: { opacity: 1, y: 0 } };

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const photoY = useSpring(useTransform(scrollY, [0, 900], [0, 150]), { stiffness: 70, damping: 24 });
  const orbitY = useSpring(useTransform(scrollY, [0, 900], [0, -90]), { stiffness: 70, damping: 24 });
  const words = profile.name.split(" ");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from(".overview-photo", { scale: 1.16, duration: 1.8, opacity: 0 })
        .from(".overview-orbit", { scale: .5, rotation: -25, opacity: 0, duration: 1.2 }, "-=1.2")
        .from(".overview-kicker, .overview-title-line, .overview-intro, .overview-meta", { y: 24, opacity: 0, stagger: .08, duration: .75 }, "-=.75");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="home" className="overview-hero">
      <motion.div className="overview-photo-wrap" style={{ y: photoY }} aria-hidden="true">
        <img className="overview-photo" src={heroLandscape} alt="" />
      </motion.div>
      <div className="overview-wash" aria-hidden="true" />
      <div className="overview-orbit" aria-hidden="true">
        <OrganicShape className="overview-blob" size={300} color="rgba(216,255,101,.84)" />
        <motion.div className="overview-line" style={{ y: orbitY }} />
        <FloatingBadge className="overview-badge">JAWA TIMUR / ID</FloatingBadge>
      </div>

      <div className="overview-kicker"><span className="hero-availability-dot" />FULL STACK / CREATIVE ENGINEERING</div>
      <div className="overview-title" aria-label={profile.name}>
        {words.map((word, index) => <motion.span key={word} className={`overview-title-line ${index === 1 ? "is-accent" : ""}`} variants={reveal} initial="hidden" animate="visible" transition={{ delay: .18 + index * .12, duration: .9, ease: [0.16, 1, .3, 1] }}>{word.toUpperCase()}</motion.span>)}
      </div>
      <motion.div className="overview-intro" variants={reveal} initial="hidden" animate="visible" transition={{ delay: .55, duration: .8 }}>
        <p>{profile.tagline}</p>
        <div className="overview-actions"><a href="#work" className="overview-link" data-cursor-label="EXPLORE">Explore work <span>↘</span></a><a href={profile.discordInvite} target="_blank" rel="noreferrer" className="overview-link overview-link-muted">{profile.discordHandle}</a></div>
      </motion.div>
      <motion.div className="overview-meta" variants={reveal} initial="hidden" animate="visible" transition={{ delay: .75, duration: .8 }}>
        <span>SCROLL TO EXPLORE</span><span>{profile.location}</span><span>{new Date().getFullYear()} / AVAILABLE</span>
      </motion.div>
      <div className="overview-index" aria-hidden="true">00<span>/06</span></div>
    </section>
  );
}
