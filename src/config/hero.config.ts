import { HeroConfig } from "@/types/hero";

export const heroConfig: HeroConfig = {
  frames: {
    basePath: "/scroll_frames",
    filePrefix: "ezgif-frame-",
    fileExtension: ".jpg",
    totalFrames: 300,
    padLength: 3,
    scrollMultiplierVh: 400, // Provides balanced 400vh scroll depth for 300 frames
  },
  stages: [
    {
      id: 1,
      stageCode: "01",
      category: "AI-POWERED INDUSTRIAL SAFETY",
      headline: "THE FUTURE OF INDUSTRIAL SAFETY",
      description:
        "Step into a smarter world where artificial intelligence transforms how industrial environments are monitored and protected.",
      ctaText: "DISCOVER AEGIX",
      ctaLink: "#about",
    },
    {
      id: 2,
      stageCode: "02",
      category: "ADVANCED COMPUTER VISION",
      headline: "SEE BEYOND THE ORDINARY",
      description:
        "Advanced computer vision continuously analyzes factory environments, monitors workers, and identifies potential safety violations in real time.",
      ctaText: "EXPLORE TECHNOLOGY",
      ctaLink: "#technology",
    },
    {
      id: 3,
      stageCode: "03",
      category: "PREDICT. DETECT. PROTECT.",
      headline: "SAFETY THROUGH INTELLIGENCE",
      description:
        "AEGIX transforms visual data into actionable safety insights, helping industries build safer and smarter workplaces.",
      ctaText: "GET STARTED",
      ctaLink: "#contact",
    },
  ],
};
