import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TechnologySection from "@/components/TechnologySection";
import ContactFooterSection from "@/components/ContactFooterSection";
import FloatingChat from "@/components/FloatingChat";

export default function Home() {
  return (
    <main className="relative w-full bg-[#080808] text-white selection:bg-[#FF6A00] selection:text-black min-h-screen">
      {/* Floating Navigation Bar */}
      <Navbar />

      {/* Cinematic Scroll-Driven Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Technology Section */}
      <TechnologySection />

      {/* Contact & Footer Section */}
      <ContactFooterSection />

      {/* Static Floating Chat Button */}
      <FloatingChat />
    </main>
  );
}
