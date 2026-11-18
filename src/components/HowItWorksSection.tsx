"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Camera,
  Scan,
  Cpu,
  ShieldCheck,
  Radio,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const ctx = gsap.context(() => {
      // 1. Header reveal — appears when section enters, stays while reading, disappears when scrolling away
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 80%",
              end: "bottom 30%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // 2. Bento cards entrance — appears when cards enter, gracefully fades out when scrolled away down
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          {
            opacity: 0,
            y: 30,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionEl.querySelector(".bento-grid-container"),
              start: "top 85%",
              endTrigger: sectionEl,
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative w-full bg-[#0F172A] text-white overflow-hidden pt-10 sm:pt-14 pb-10 sm:pb-14 lg:pb-16 px-6 sm:px-10 lg:px-16"
      style={{ backgroundColor: "#0F172A" }}
    >
      {/* Subtle background ambient gradients */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full pointer-events-none bg-radial from-[#10B981]/5 via-[#F97316]/4 to-transparent blur-3xl z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none bg-radial from-[#F97316]/8 via-transparent to-transparent blur-3xl z-0"
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

      <div className="relative max-w-7xl mx-auto z-10">
        {/* ================= SECTION HEADER ================= */}
        <div ref={headerRef} className="max-w-3xl mb-14 sm:mb-20 text-left">
          {/* Small Section Label */}
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse shadow-[0_0_10px_#F97316]" />
            <span className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-[0.28em] text-[#F97316]">
              02 — HOW IT WORKS
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black uppercase tracking-tight text-[#FFFFFF] leading-[1.08] mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            FROM VISUAL DATA TO{" "}
            <span className="text-[#F97316] drop-shadow-[0_0_20px_rgba(249,115,22,0.4)]">
              INTELLIGENT SAFETY.
            </span>
          </h2>

          {/* Supporting Description */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
            Discover how AEGIX transforms factory surveillance into real-time
            industrial safety intelligence through advanced computer vision.
          </p>
        </div>

        {/* ================= ASYMMETRIC BENTO GRID ================= */}
        {/* 2×2 asymmetric layout: row 1 = 8+4, row 2 = 5+7 */}
        <div className="bento-grid-container grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* ---------------- CARD 01 — CAPTURE (8 cols, shorter) ---------------- */}
          <div
            ref={(el) => {
              cardsRef.current[0] = el;
            }}
            className="md:col-span-8 group relative rounded-[24px] bg-gradient-to-b from-white/[0.07] via-white/[0.03] to-[#0a101f]/95 border border-white/10 hover:border-[#F97316]/60 p-5 sm:p-6 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:shadow-[0_12px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(249,115,22,0.2)] h-[300px] sm:h-[320px]"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[24px]">
              <Image
                src="/how-it-works/capture.jpg"
                alt="AEGIX Capture Stage - Continuous Factory Surveillance"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-center opacity-30 group-hover:opacity-45 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] via-[#0a101f]/70 to-[#0F172A]/40 z-10" />
            </div>

            {/* Top Telemetry */}
            <div className="relative z-20 flex items-center justify-between w-full">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-ping" />
                <span className="text-white font-semibold tracking-wider">
                  ● REC // LIVE MONITORING
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#F97316] tracking-widest px-3 py-1 rounded-full bg-[#F97316]/10 border border-[#F97316]/30">
                STAGE 01
              </span>
            </div>

            {/* HUD Details */}
            <div className="relative z-20 flex items-center gap-3 text-xs font-mono text-slate-400 pointer-events-none">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/40 border border-white/5">
                <Camera className="w-3.5 h-3.5 text-[#10B981]" />
                <span>CAM_04 [CONVEYOR_FACILITY]</span>
              </div>
              <div className="hidden sm:inline-block px-2.5 py-1 rounded bg-black/40 border border-white/5 text-[#10B981]">
                FOV: 135° // 1080P 60FPS
              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-20 flex items-end justify-between gap-4 pt-3 border-t border-white/10">
              <div className="max-w-md">
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-1 group-hover:text-[#F97316] transition-colors">
                  CAPTURE
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Continuous visual monitoring of factory environments through
                  surveillance cameras.
                </p>
              </div>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 group-hover:bg-[#F97316] group-hover:text-black flex items-center justify-center transition-all duration-300 flex-shrink-0 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                <ArrowRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>

          {/* ---------------- CARD 02 — DETECT (4 cols, taller) ---------------- */}
          <div
            ref={(el) => {
              cardsRef.current[1] = el;
            }}
            className="md:col-span-4 group relative rounded-[24px] bg-gradient-to-b from-white/[0.07] via-white/[0.03] to-[#0a101f]/95 border border-white/10 hover:border-[#F97316]/60 p-5 sm:p-6 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:shadow-[0_12px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(249,115,22,0.2)] h-[300px] sm:h-[320px]"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[24px]">
              <Image
                src="/how-it-works/detect.webp"
                alt="AEGIX Detect Stage - AI PPE Compliance"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-top opacity-30 group-hover:opacity-45 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] via-[#0a101f]/70 to-[#0F172A]/35 z-10" />
            </div>

            {/* Top Telemetry */}
            <div className="relative z-20 flex items-center justify-between w-full">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#10B981]/40 text-[10px] font-mono">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-[#10B981] font-semibold tracking-wider">
                  AI ACTIVE
                </span>
              </div>
              <span className="text-[10px] sm:text-xs font-mono font-bold text-[#F97316] tracking-widest px-2.5 py-1 rounded-full bg-[#F97316]/10 border border-[#F97316]/30">
                STAGE 02
              </span>
            </div>

            {/* PPE Detection Markers */}
            <div className="relative z-20 space-y-1.5 pointer-events-none">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#10B981]/20 border border-[#10B981]/50 text-[10px] font-mono text-[#10B981]">
                <CheckCircle2 className="w-3 h-3" />
                <span>HELMET // 99.4%</span>
              </div>
              <br />
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#10B981]/20 border border-[#10B981]/50 text-[10px] font-mono text-[#10B981]">
                <CheckCircle2 className="w-3 h-3" />
                <span>GLOVES // ACTIVE</span>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-20 pt-3 border-t border-white/10">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-1 group-hover:text-[#F97316] transition-colors">
                    DETECT
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-normal">
                    AI detects PPE compliance — helmets, vests, gloves, goggles,
                    and safety shoes.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-[#F97316] group-hover:text-black flex items-center justify-center transition-all duration-300 flex-shrink-0 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- CARD 03 — ANALYZE (5 cols) ---------------- */}
          <div
            ref={(el) => {
              cardsRef.current[2] = el;
            }}
            className="md:col-span-5 group relative rounded-[24px] bg-gradient-to-b from-white/[0.07] via-white/[0.03] to-[#0a101f]/95 border border-white/10 hover:border-[#F97316]/60 p-5 sm:p-6 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:shadow-[0_12px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(249,115,22,0.2)] h-[300px] sm:h-[320px]"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[24px]">
              <Image
                src="/how-it-works/analyze.jpg"
                alt="AEGIX Analyze Stage - Real-Time Safety Analysis"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center opacity-30 group-hover:opacity-45 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] via-[#0a101f]/70 to-[#0F172A]/35 z-10" />
            </div>

            {/* Top Telemetry */}
            <div className="relative z-20 flex items-center justify-between w-full">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#F97316]/40 text-[10px] font-mono">
                <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
                <span className="text-[#F97316] font-semibold tracking-wider">
                  ANALYZING
                </span>
              </div>
              <span className="text-[10px] sm:text-xs font-mono font-bold text-[#F97316] tracking-widest px-2.5 py-1 rounded-full bg-[#F97316]/10 border border-[#F97316]/30">
                STAGE 03
              </span>
            </div>

            {/* Analysis Details */}
            <div className="relative z-20 space-y-1.5 pointer-events-none text-xs font-mono">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-black/50 border border-white/10 text-slate-300">
                <Scan className="w-3.5 h-3.5 text-[#F97316]" />
                <span>RISK: 0.01 // OPTIMAL</span>
              </div>
              <br />
              <div className="inline-block px-2.5 py-1 rounded bg-black/50 border border-white/10 text-[#10B981]">
                INFERENCE: 12ms
              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-20 pt-3 border-t border-white/10">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-1 group-hover:text-[#F97316] transition-colors">
                    ANALYZE
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-normal">
                    Computer vision identifies potential safety violations and
                    risky situations in real time.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-[#F97316] group-hover:text-black flex items-center justify-center transition-all duration-300 flex-shrink-0 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- CARD 04 — RESPOND (7 cols) ---------------- */}
          <div
            ref={(el) => {
              cardsRef.current[3] = el;
            }}
            className="md:col-span-7 group relative rounded-[24px] bg-gradient-to-b from-white/[0.07] via-white/[0.03] to-[#0a101f]/95 border border-white/10 hover:border-[#F97316]/60 p-5 sm:p-6 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:shadow-[0_12px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(249,115,22,0.2)] h-[300px] sm:h-[320px]"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[24px]">
              <Image
                src="/how-it-works/respond.webp"
                alt="AEGIX Respond Stage - Actionable Safety Intelligence"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-top opacity-30 group-hover:opacity-45 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] via-[#0a101f]/70 to-[#0F172A]/35 z-10" />
            </div>

            {/* Top Telemetry */}
            <div className="relative z-20 flex items-center justify-between w-full">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#10B981]/40 text-[10px] sm:text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                <span className="text-[#10B981] font-semibold tracking-wider">
                  SAFETY INTELLIGENCE
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#F97316] tracking-widest px-3 py-1 rounded-full bg-[#F97316]/10 border border-[#F97316]/30">
                STAGE 04
              </span>
            </div>

            {/* Safety Insight */}
            <div className="relative z-20 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#10B981]/15 border border-[#10B981]/40 text-xs font-mono text-[#10B981]">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span>INCIDENT LOGGED: ZERO RISKS</span>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-20 flex items-end justify-between gap-4 pt-3 border-t border-white/10">
              <div className="max-w-md">
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-1 group-hover:text-[#F97316] transition-colors">
                  RESPOND
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Turn detected risks into actionable safety insights that
                  support faster decision-making.
                </p>
              </div>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 group-hover:bg-[#F97316] group-hover:text-black flex items-center justify-center transition-all duration-300 flex-shrink-0 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                <ArrowRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
