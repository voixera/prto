import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "../content/profile";

export default function HeroSection() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-anim", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 30;
        const yPos = (clientY / window.innerHeight - 0.5) * 30;

        gsap.to(".hero-parallax-layer", {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: "power2.out"
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="home" className="section hero-wrapper">
      {/* Background AI Landscape Visual Accent */}
      <div className="hero-landscape-bg hero-parallax-layer">
        <svg viewBox="0 0 1440 600" fill="none" width="100%" height="100%">
          <path d="M0 450 L300 250 L600 400 L900 180 L1200 350 L1440 200 V600 H0 Z" fill="rgba(15, 23, 42, 0.4)" />
          <path d="M0 500 L400 350 L800 480 L1200 300 L1440 420 V600 H0 Z" fill="rgba(30, 41, 59, 0.6)" />
          <line x1="0" y1="200" x2="1440" y2="200" stroke="rgba(56, 189, 248, 0.15)" strokeDasharray="6 6" />
        </svg>
      </div>

      <div className="hero-badge hero-anim">
        <span className="brand-dot" />
        <span>AVAILABLE FOR PROJECTS & BOT DEVS</span>
      </div>

      <h1 ref={titleRef} className="hero-title hero-anim">
        <span className="text-gradient">{profile.name.split(' ')[0]}</span>{' '}
        <span className="text-highlight">{profile.name.split(' ').slice(1).join(' ')}</span>
      </h1>

      <p className="lede hero-anim" style={{ maxWidth: '54ch' }}>
        {profile.tagline}
      </p>

      <div className="hero-anim" style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <a className="btn btn-solid" href="#work">
          EXPLORE WORK
        </a>
        <a
          className="btn btn-glass"
          href={profile.discordInvite}
          target="_blank"
          rel="noreferrer"
        >
          DISCORD COMMUNITY
        </a>
      </div>

      <div className="hero-meta-grid hero-anim">
        <div className="hero-meta-item">
          <label>LOCATION</label>
          <span>{profile.location}</span>
        </div>
        <div className="hero-meta-item">
          <label>ROLE</label>
          <span>{profile.role}</span>
        </div>
        <div className="hero-meta-item">
          <label>DISCORD</label>
          <span>{profile.discordHandle}</span>
        </div>
        <div className="hero-meta-item">
          <label>EDUCATION</label>
          <span>Universitas Terbuka</span>
        </div>
      </div>
    </section>
  );
}
