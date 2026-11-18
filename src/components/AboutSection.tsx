"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Download, ShieldCheck, Activity } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AboutSectionProps {
  demoUrl?: string;
  downloadUrl?: string;
}

export default function AboutSection({
  demoUrl = "#demo",
  downloadUrl = "#download",
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);

  // Text element refs
  const labelRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const subHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const desc1Ref = useRef<HTMLParagraphElement | null>(null);
  const desc2Ref = useRef<HTMLParagraphElement | null>(null);
  const highlightRef = useRef<HTMLDivElement | null>(null);
  const ctaGroupRef = useRef<HTMLDivElement | null>(null);

  // Image & visual refs
  const imageCardRef = useRef<HTMLDivElement | null>(null);
  const imageVisualRef = useRef<HTMLDivElement | null>(null);
  const orangeGlowRef = useRef<HTMLDivElement | null>(null);
  const greenHudRef = useRef<HTMLDivElement | null>(null);

  // 3D Parallax Tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Mouse move handler for 3D holographic tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageCardRef.current) return;
    const rect = imageCardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Subtle tilt angles (max +/- 8 deg)
    const tiltX = (mouseY / (rect.height / 2)) * -6;
    const tiltY = (mouseX / (rect.width / 2)) * 6;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const ctx = gsap.context(() => {
      // Create master ScrollTrigger timeline for cinematic entrance
      // Smoothly enters when scrolling into view, and gently fades out when scrolled away
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      // 1. Text Animation Sequence
      // Animation 1: Label fades in with upward movement
      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.05
        );
      }

      // Animation 2: Main headline reveal
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
          0.15
        );
      }

      // Animation 3: Secondary heading fades in
      if (subHeadingRef.current) {
        tl.fromTo(
          subHeadingRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" },
          0.28
        );
      }

      // Animation 4: Description paragraphs staggered
      const descElements = [desc1Ref.current, desc2Ref.current].filter(Boolean);
      if (descElements.length > 0) {
        tl.fromTo(
          descElements,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
          },
          0.38
        );
      }

      // Animation 5: Highlight statement with orange accent animation
      if (highlightRef.current) {
        tl.fromTo(
          highlightRef.current,
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, duration: 0.85, ease: "power2.out" },
          0.52
        );
      }

      // Animation 6: CTA buttons fade in and upward
      if (ctaGroupRef.current) {
        tl.fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.65
        );
      }

      // 2. Right Image Cinematic Reveal Sequence
      if (orangeGlowRef.current) {
        tl.fromTo(
          orangeGlowRef.current,
          { opacity: 0, scale: 0.85 },
          { opacity: 0.7, scale: 1, duration: 1.3, ease: "power2.out" },
          0.1
        );
      }

      if (imageCardRef.current) {
        tl.fromTo(
          imageCardRef.current,
          {
            opacity: 0,
            scale: 0.95,
            x: 20,
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 1.1,
            ease: "power2.out",
          },
          0.2
        );
      }

      if (greenHudRef.current) {
        tl.fromTo(
          greenHudRef.current,
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
          0.5
        );
      }

      // Continuous subtle ambient float motion on worker image
      if (imageVisualRef.current) {
        gsap.to(imageVisualRef.current, {
          y: -10,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#0F172A] text-white overflow-hidden pt-24 sm:pt-32 lg:pt-36 pb-10 sm:pb-14 lg:pb-16 px-6 sm:px-10 lg:px-16"
      style={{
        backgroundColor: "#0F172A",
      }}
    >
      {/* Top transition gradient from deep Hero black (#080808) into Navy (#0F172A) */}
      <div
        className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#080808] to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Subtle high-tech background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(248, 250, 252, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(248, 250, 252, 0.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      {/* Atmospheric lighting accents */}
      <div
        className="absolute top-1/4 left-0 w-96 h-96 rounded-full pointer-events-none bg-radial from-[#F97316]/10 via-transparent to-transparent blur-3xl z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none bg-radial from-[#10B981]/8 via-transparent to-transparent blur-3xl z-0"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ================= LEFT COLUMN: TEXT CONTENT ================= */}
          <div
            ref={leftColRef}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Small Section Label */}
            <div ref={labelRef} className="inline-flex items-center gap-3 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse shadow-[0_0_10px_#F97316]" />
              <span className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-[0.28em] text-[#F97316]">
                01 — ABOUT AEGIX
              </span>
            </div>

            {/* Main Headline */}
            <h2
              ref={headingRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] font-black uppercase tracking-tight text-[#FFFFFF] leading-[1.08] mb-4 sm:mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
            >
              INTELLIGENCE BEHIND <br className="hidden sm:inline" />
              INDUSTRIAL SAFETY
            </h2>

            {/* Secondary Heading */}
            <h3
              ref={subHeadingRef}
              className="text-lg sm:text-xl md:text-2xl font-semibold text-[#F8FAFC] tracking-normal mb-6 text-slate-200"
            >
              Redefining the Future of Workplace Protection.
            </h3>

            {/* Description Paragraphs */}
            <div className="space-y-4 mb-8 text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              <p ref={desc1Ref}>
                AEGIX is an AI-powered industrial safety intelligence system
                designed to transform how factories monitor, understand, and
                manage workplace risks.
              </p>
              <p ref={desc2Ref}>
                By combining advanced computer vision with real-time video
                analysis, AEGIX identifies potential safety violations, monitors
                personal protective equipment (PPE), and provides actionable
                insights that help industrial environments become safer and
                smarter.
              </p>
            </div>

            {/* Highlight Statement with Orange Accent */}
            <div
              ref={highlightRef}
              className="relative mb-10 pl-5 py-2 border-l-2 border-[#F97316] bg-gradient-to-r from-[#F97316]/8 via-transparent to-transparent rounded-r-xl"
            >
              <p className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-[#F8FAFC] leading-snug">
                We don&apos;t just monitor factories.
                <br />
                <span className="text-[#F97316] drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                  We make them intelligent.
                </span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              ref={ctaGroupRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5"
            >
              {/* Primary: TRY DEMO */}
              <a
                href={demoUrl}
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white rounded-full bg-[#F97316] hover:bg-[#ea580c] transition-all duration-300 shadow-[0_0_24px_rgba(249,115,22,0.4)] hover:shadow-[0_0_32px_rgba(249,115,22,0.65)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>TRY DEMO</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              {/* Secondary: DOWNLOAD APP */}
              <a
                href={downloadUrl}
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F8FAFC] rounded-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/20 hover:border-[#10B981] hover:text-[#10B981] transition-all duration-300 hover:shadow-[0_0_24px_rgba(16,185,129,0.35)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                <span>DOWNLOAD APP</span>
              </a>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: ANIMATED IMAGE & HUD ================= */}
          <div
            ref={rightColRef}
            className="lg:col-span-5 relative flex items-center justify-center mt-8 lg:mt-0"
            style={{ perspective: "1000px" }}
          >
            {/* Ambient Orange Lighting Glow behind image */}
            <div
              ref={orangeGlowRef}
              className="absolute w-[340px] sm:w-[400px] md:w-[460px] h-[340px] sm:h-[400px] md:h-[460px] rounded-full bg-radial from-[#F97316]/35 via-[#F97316]/12 to-transparent blur-3xl pointer-events-none -z-10 transition-transform duration-300"
              style={{
                transform: `translate(${tilt.y * -2}px, ${tilt.x * 2}px)`,
              }}
              aria-hidden="true"
            />

            {/* Subtle Secure Green atmospheric halo */}
            <div
              className="absolute -bottom-6 -left-6 w-44 h-44 rounded-full bg-radial from-[#10B981]/25 via-transparent to-transparent blur-2xl pointer-events-none -z-10"
              aria-hidden="true"
            />

            {/* Cinematic Image Frame Container with 3D Tilt & Motion */}
            <div
              ref={imageCardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[400px] sm:max-w-[440px] lg:max-w-[460px] rounded-[28px] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-[#0a101f]/90 p-3 sm:p-3.5 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-md group overflow-hidden transition-transform duration-200 ease-out"
              style={{
                borderRadius: "28px",
                transform: isHovering
                  ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
                  : "rotateX(0deg) rotateY(0deg) scale(1)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Secure Green HUD Corner Accents */}
              <div
                ref={greenHudRef}
                className="absolute inset-0 rounded-[28px] pointer-events-none transition-all duration-500 border border-[#10B981]/35 group-hover:border-[#10B981]/70 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] z-20"
                style={{ borderRadius: "28px" }}
              >
                {/* HUD Corner tick marks */}
                <span className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-[#10B981]" />
                <span className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-[#10B981]" />
                <span className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-[#10B981]" />
                <span className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-[#10B981]" />
              </div>

              {/* Top HUD Status bar */}
              <div className="relative z-20 flex items-center justify-between px-3 sm:px-4 py-2 border-b border-white/10 text-[10px] font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                  <span className="text-[#10B981] font-semibold tracking-wider">
                    VISION SCAN // ACTIVE
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#F97316] animate-pulse" />
                  <span className="tracking-widest text-slate-300">FPS 60</span>
                </div>
              </div>

              {/* Main Worker Image Stage with Increased Robot Scale & Reduced Empty Space */}
              <div
                className="relative w-full h-[360px] sm:h-[420px] md:h-[450px] overflow-hidden rounded-[22px] flex items-center justify-center z-10"
                style={{ borderRadius: "22px" }}
              >
                {/* Holographic Laser Scanline Sweep */}
                <div
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#10B981] to-transparent shadow-[0_0_15px_#10B981] pointer-events-none z-30 animate-scanline"
                  aria-hidden="true"
                />

                {/* Worker Image with continuous floating breathing motion and increased displayed scale */}
                <div
                  ref={imageVisualRef}
                  className="relative w-full h-full flex items-center justify-center scale-[1.28] origin-center -translate-y-1.5"
                >
                  <Image
                    src="/about-worker.png"
                    alt="AEGIX AI Industrial Safety Worker with Smart Helmet HUD"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                    priority
                    className="object-contain object-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] transition-transform duration-700"
                  />
                </div>

                {/* Soft gradient bottom mask to eliminate any harsh chest cutoff */}
                <div
                  className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-[#0a101f] via-[#0a101f]/65 to-transparent pointer-events-none z-20"
                  aria-hidden="true"
                />

                {/* Clean Floating Telemetry Badges framing the visual */}
                <div className="absolute bottom-3 left-3 z-30 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0F172A]/85 backdrop-blur-md border border-[#10B981]/40 text-[10px] font-mono text-slate-300 shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>PPE DETECTION: 99.8%</span>
                </div>

                <div className="absolute bottom-3 right-3 z-30 px-3 py-1.5 rounded-lg bg-[#0F172A]/85 backdrop-blur-md border border-[#F97316]/40 text-[10px] font-mono text-[#F97316] font-semibold tracking-wider shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                  SECURE_LEVEL 01
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
