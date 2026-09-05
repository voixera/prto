import { useEffect } from "react";
import CustomCursor from "../components/CustomCursor";
import SiteHeader from "../components/SiteHeader";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import StackSection from "../components/StackSection";
import ProjectsSection from "../components/ProjectsSection";
import JourneySection from "../components/JourneySection";
import ContactSection from "../components/ContactSection";
import SiteFooter from "../components/SiteFooter";
import { Arc, FloatingOrb, OrganicShape, Ring } from "../components/ArtShapes";

export default function Home({ entered = true }) {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.startsWith("#/")) return;
    const id = hash.slice(1);
    const timer = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, entered ? 120 : 0);
    return () => window.clearTimeout(timer);
  }, [entered]);

  return (
    <div className="page">
      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Fixed navigation */}
      <SiteHeader />
      <div className="ambient-art" aria-hidden="true">
        <OrganicShape className="ambient-blob" size={320} color="rgba(216,255,101,.07)" />
        <Ring className="ambient-ring" size={300} color="rgba(216,255,101,.18)" />
        <Arc className="ambient-arc" size={180} color="rgba(241,239,232,.12)" />
        <FloatingOrb className="ambient-orb" size={9} />
      </div>

      {/* Main content */}
      <main>
        <HeroSection />
        <AboutSection />
        <StackSection />
        <ProjectsSection />
        <JourneySection />
        <ContactSection />
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
