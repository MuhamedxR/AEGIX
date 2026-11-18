"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Video,
  Scan,
  GitBranch,
  Gauge,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TechStage {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const techStages: TechStage[] = [
  {
    id: "video-input",
    number: "01",
    title: "Video Input",
    description:
      "Captures live video streams from factory surveillance cameras.",
    icon: Video,
    tag: "RTSP / 60 FPS",
  },
  {
    id: "yolo-detection",
    number: "02",
    title: "YOLO Detection",
    description:
      "Detects workers and identifies their safety equipment using AI.",
    icon: Scan,
    tag: "NEURAL PPE SCAN",
  },
  {
    id: "scenario-engine",
    number: "03",
    title: "Scenario Engine",
    description:
      "Evaluates detected objects and identifies potential safety violations.",
    icon: GitBranch,
    tag: "LOGIC CORRELATION",
  },
  {
    id: "risk-scoring",
    number: "04",
    title: "Risk Scoring",
    description:
      "Assesses detected risks and assigns severity levels.",
    icon: Gauge,
    tag: "REAL-TIME MATRIX",
  },
  {
    id: "dashboard",
    number: "05",
    title: "Dashboard",
    description:
      "Displays safety insights, alerts, and monitoring results in one place.",
    icon: LayoutDashboard,
    tag: "TELEMETRY HUB",
  },
];

export default function TechnologySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const trackWrapperRef = useRef<HTMLDivElement | null>(null);
  const lineProgressRef = useRef<HTMLDivElement | null>(null);
  const lineProgressMobileRef = useRef<HTMLDivElement | null>(null);
  const stageNodesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Mobile/desktop active stage index for details card
  const [activeStage, setActiveStage] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const ctx = gsap.context(() => {
      // 1. Header Reveal — plays once and stays permanently
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 2. Two-Phase Animation: All stages appear together, then line draws (once, never disappears)
      const validNodes = stageNodesRef.current.filter(Boolean);

      if (timelineRef.current) {
        // Initial state: hide all stages and connecting line
        if (validNodes.length > 0) {
          gsap.set(validNodes, { opacity: 0, y: 18, scale: 0.97 });
        }
        if (trackWrapperRef.current) {
          gsap.set(trackWrapperRef.current, { opacity: 0 });
        }
        if (lineProgressRef.current) {
          gsap.set(lineProgressRef.current, { scaleX: 0 });
        }
        if (lineProgressMobileRef.current) {
          gsap.set(lineProgressMobileRef.current, { scaleY: 0 });
        }

        // -----------------------------------------------------------
        // PHASE 1 — All 5 stages appear simultaneously (runs once, never disappears)
        // -----------------------------------------------------------
        if (validNodes.length > 0) {
          gsap.to(validNodes, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 85%",
              once: true,
            },
            onComplete: () => {
              drawLine();
            },
          });
        }

        // -----------------------------------------------------------
        // PHASE 2 — Connecting Line Reveal
        // Draws left to right after all stages are visible
        // -----------------------------------------------------------
        function drawLine() {
          const lineTl = gsap.timeline();

          if (trackWrapperRef.current) {
            lineTl.to(trackWrapperRef.current, {
              opacity: 1,
              duration: 0.15,
              ease: "power1.inOut",
            });
          }

          if (lineProgressRef.current) {
            lineTl.to(
              lineProgressRef.current,
              {
                scaleX: 1,
                duration: 0.6,
                ease: "power2.inOut",
              },
              "-=0.15"
            );
          }

          if (lineProgressMobileRef.current) {
            lineTl.to(
              lineProgressMobileRef.current,
              {
                scaleY: 1,
                duration: 0.6,
                ease: "power2.inOut",
              },
              "<"
            );
          }
        }
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleStageInteraction = (index: number) => {
    setActiveStage((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="relative w-full text-white overflow-hidden pt-10 sm:pt-14 pb-16 sm:pb-20 lg:pb-24 px-6 sm:px-10 lg:px-16"
      style={{
        background:
          "linear-gradient(to bottom, #0F172A 0%, #0F172A 30%, #0c1322 55%, #080d1a 80%, #05080F 100%)",
      }}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none bg-radial from-[#10B981]/5 via-[#F97316]/5 to-transparent blur-3xl z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full pointer-events-none bg-radial from-[#0F172A] via-[#10B981]/5 to-transparent blur-3xl z-0"
        aria-hidden="true"
      />

      {/* Subtle high-tech grid background overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(248, 250, 252, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(248, 250, 252, 0.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* ================= SECTION HEADER ================= */}
        <div ref={headerRef} className="max-w-3xl mb-16 sm:mb-24 text-left">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse shadow-[0_0_10px_#F97316]" />
            <span className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-[0.28em] text-[#F97316]">
              03 — OUR TECHNOLOGY
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black uppercase tracking-tight text-[#FFFFFF] leading-[1.08] mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            THE INTELLIGENCE BEHIND{" "}
            <span className="text-[#F97316] drop-shadow-[0_0_20px_rgba(249,115,22,0.4)]">
              AEGIX.
            </span>
          </h2>

          {/* Supporting Description */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
            From live video streams to intelligent safety decisions, discover
            the technology powering AEGIX.
          </p>
        </div>

        {/* ================= 5-STAGE INTERACTIVE TIMELINE ================= */}
        <div
          ref={timelineRef}
          className="relative w-full pt-4 pb-16 lg:py-14"
        >
          {/* 5 Stages Grid / Horizontal Flex on md+, Stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-4 lg:gap-6 relative">
            {/* Connecting Line Track Wrapper (Animated in Phase 2) */}
            <div ref={trackWrapperRef} className="contents">
              {/* Desktop / Tablet: Continuous Horizontal Track Line centered from center of Stage 01 to Stage 05 */}
              <div
                className="hidden md:block absolute top-10 sm:top-11 left-[10%] right-[10%] h-[2.5px] -translate-y-1/2 z-0 pointer-events-none"
                aria-hidden="true"
              >
                {/* Dim Inactive Base Track */}
                <div className="absolute inset-0 bg-white/10 rounded-full" />
                {/* Animated Glowing Gradient Fill (Draws left to right in Phase 2) */}
                <div
                  ref={lineProgressRef}
                  className="w-full h-full rounded-full bg-gradient-to-r from-[#38BDF8] via-[#10B981] to-[#F97316] shadow-[0_0_14px_rgba(56,189,248,0.5)] origin-left"
                />
              </div>

              {/* Mobile: Continuous Vertical Track Line */}
              <div
                className="md:hidden absolute left-1/2 -translate-x-1/2 top-10 bottom-24 w-[2px] z-0 pointer-events-none"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-white/10 rounded-full" />
                <div
                  ref={lineProgressMobileRef}
                  className="w-full h-full rounded-full bg-gradient-to-b from-[#38BDF8] via-[#10B981] to-[#F97316] shadow-[0_0_14px_rgba(56,189,248,0.5)] origin-top"
                />
              </div>
            </div>

            {techStages.map((stage, idx) => {
              const IconComponent = stage.icon;
              const isActive = activeStage === idx;

              return (
                <div
                  key={stage.id}
                  ref={(el) => {
                    stageNodesRef.current[idx] = el;
                  }}
                  className="group relative flex flex-col items-center text-center cursor-pointer select-none focus:outline-none z-10"
                  tabIndex={0}
                  role="button"
                  aria-expanded={isActive}
                  aria-label={`${stage.number} ${stage.title}`}
                  onMouseEnter={() => setActiveStage(idx)}
                  onMouseLeave={() => setActiveStage(null)}
                  onClick={() => handleStageInteraction(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleStageInteraction(idx);
                    }
                  }}
                >
                  {/* Icon Node Container (Centered over the connecting line, elevated with z-10) */}
                  <div className="relative mb-3 flex items-center justify-center">
                    {/* Ambient Glow behind Icon Card */}
                    <div
                      className={`absolute -inset-2 rounded-[24px] sm:rounded-[26px] transition-all duration-500 blur-md pointer-events-none ${
                        isActive
                          ? "bg-[#10B981]/30 opacity-100 scale-105"
                          : "bg-[#38BDF8]/15 opacity-60 group-hover:opacity-100 group-hover:scale-105 group-hover:bg-[#38BDF8]/25"
                      }`}
                      aria-hidden="true"
                    />

                    {/* Dark Glass Container (Completely clean - no corner decorative dots) */}
                    <div
                      className={`relative w-20 h-20 sm:w-22 sm:h-22 rounded-[22px] sm:rounded-[24px] flex items-center justify-center transition-all duration-300 backdrop-blur-xl ${
                        isActive
                          ? "bg-[#0F172A]/95 border-2 border-[#10B981] shadow-[0_0_24px_rgba(16,185,129,0.35),inset_0_0_14px_rgba(16,185,129,0.15)] scale-[1.04]"
                          : "bg-[rgba(15,23,42,0.88)] border border-[rgba(56,189,248,0.45)] shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_18px_rgba(56,189,248,0.18),inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:bg-[rgba(15,23,42,0.95)] group-hover:border-[#38BDF8] group-hover:shadow-[0_0_22px_rgba(56,189,248,0.35),inset_0_0_12px_rgba(56,189,248,0.12)] group-hover:scale-[1.03]"
                      }`}
                    >
                      {/* Icon */}
                      <IconComponent
                        className={`w-8 h-8 sm:w-9 sm:h-9 transition-all duration-300 ${
                          isActive
                            ? "text-[#10B981] scale-110 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                            : "text-[#38BDF8] group-hover:text-white group-hover:scale-105 drop-shadow-[0_0_6px_rgba(56,189,248,0.3)]"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Stage Number Indicator */}
                  <div className="mb-2">
                    <span
                      className={`inline-block font-mono text-[11px] uppercase tracking-widest px-2.5 py-0.5 rounded-full border transition-all duration-300 ${
                        isActive
                          ? "bg-[#F97316]/15 border-[#F97316] text-[#F97316] shadow-[0_0_10px_rgba(249,115,22,0.3)]"
                          : "bg-white/5 border-white/10 text-slate-400 group-hover:text-white group-hover:border-white/20"
                      }`}
                    >
                      STAGE {stage.number}
                    </span>
                  </div>

                  {/* Stage Title */}
                  <h3
                    className={`text-base sm:text-lg font-bold uppercase tracking-tight transition-colors duration-300 mb-1 ${
                      isActive
                        ? "text-[#F97316]"
                        : "text-white group-hover:text-slate-100"
                    }`}
                  >
                    {stage.title}
                  </h3>

                  {/* Minimal Sub-tag */}
                  <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                    {stage.tag}
                  </span>

                  {/* ================= COMPACT FLOATING DESCRIPTION CARD ================= */}
                  <div
                    className={`absolute z-30 w-64 sm:w-72 p-4 rounded-2xl bg-[#0a101f]/95 border border-[#10B981]/50 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300 pointer-events-none ${
                      isActive
                        ? "opacity-100 translate-y-0 scale-100 visible"
                        : "opacity-0 translate-y-3 scale-95 invisible"
                    } ${
                      "top-full mt-4 left-1/2 -translate-x-1/2"
                    } ${
                      idx === 0
                        ? "md:left-0 md:translate-x-0"
                        : idx === techStages.length - 1
                        ? "md:left-auto md:right-0 md:translate-x-0"
                        : ""
                    }`}
                  >
                    {/* Top card indicator */}
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#10B981]">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AEGIX PIPELINE // {stage.number}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        ACTIVE
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed text-left font-normal">
                      {stage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
