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

export default function Home({ entered = true }) {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.startsWith("#/")) return;
    const id = hash.slice(1);
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, entered ? 80 : 0);
    return () => window.clearTimeout(timer);
  }, [entered]);

  return (
    <div className="page">
      <CustomCursor />
      <div className="page-grid" aria-hidden="true" />
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <StackSection />
        <ProjectsSection />
        <JourneySection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
