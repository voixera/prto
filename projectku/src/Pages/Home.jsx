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
import landscapeBackground from "../../gallery/download.jpg";

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
    <div className="page" style={{ "--landscape-background": `url("${landscapeBackground}")` }}>
      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Fixed navigation */}
      <SiteHeader />
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
