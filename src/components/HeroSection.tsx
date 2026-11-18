"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollSequence, {
  ScrollSequenceHandle,
} from "./ScrollSequence";
import HeroContent, { HeroContentHandle } from "./HeroContent";
import { heroConfig } from "@/config/hero.config";

export default function HeroSection() {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const scrollSequenceRef = useRef<ScrollSequenceHandle | null>(null);
  const heroContentRef = useRef<HeroContentHandle | null>(null);

  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  // Jump to specific stage on indicator click
  const handleSelectStage = useCallback((stageIndex: number) => {
    if (!triggerRef.current) return;
    const trigger = triggerRef.current;
    const totalDistance = trigger.offsetHeight - window.innerHeight;
    const stageTargets = [0.02, 0.50, 0.95];
    const targetProgress = stageTargets[stageIndex] ?? 0;
    const scrollTarget = trigger.offsetTop + targetProgress * totalDistance;

    window.scrollTo({
      top: scrollTarget,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const triggerEl = triggerRef.current;
    const pinEl = pinRef.current;
    const contentHandle = heroContentRef.current;
    const sequenceHandle = scrollSequenceRef.current;

    if (!triggerEl || !pinEl || !contentHandle) return;

    const stageElements = contentHandle.stageElements;

    // Build timeline for pinning and synchronization
    const ctx = gsap.context(() => {
      // 1. Initial State
      if (stageElements[0]) {
        gsap.set(stageElements[0], { opacity: 1, y: 0, display: "flex" });
      }
      for (let i = 1; i < stageElements.length; i++) {
        if (stageElements[i]) {
          gsap.set(stageElements[i], { opacity: 0, y: 40, display: "none" });
        }
      }

      // Master ScrollTrigger
      const st = ScrollTrigger.create({
        trigger: triggerEl,
        start: "top top",
        end: "bottom bottom",
        pin: pinEl,
        scrub: 0.6, // Smooth scrubbing inertia for cinematic feel
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;

          // A. Drive Canvas Sequence Frame smoothly
          sequenceHandle?.renderFrame(p);

          // B. Determine Current Stage for indicators
          if (p < 0.33) {
            setCurrentStageIndex(0);
          } else if (p < 0.67) {
            setCurrentStageIndex(1);
          } else {
            setCurrentStageIndex(2);
          }

          // C. Stage 1 Transitions (Left-aligned)
          // 0.00 -> 0.20 : 100% visible
          // 0.20 -> 0.32 : gentle, smooth fade out
          if (stageElements[0]) {
            if (p <= 0.20) {
              gsap.set(stageElements[0], {
                opacity: 1,
                y: 0,
                display: "flex",
              });
            } else if (p > 0.20 && p < 0.33) {
              const fadeRatio = (p - 0.20) / 0.13;
              gsap.set(stageElements[0], {
                opacity: Math.max(0, 1 - fadeRatio),
                y: -20 * fadeRatio,
                display: "flex",
              });
            } else {
              gsap.set(stageElements[0], {
                opacity: 0,
                y: -20,
                display: "none",
              });
            }
          }

          // D. Stage 2 Transitions (Centered)
          // 0.28 -> 0.38 : gentle fade in
          // 0.38 -> 0.60 : 100% visible
          // 0.60 -> 0.70 : gentle fade out
          if (stageElements[1]) {
            if (p < 0.28) {
              gsap.set(stageElements[1], {
                opacity: 0,
                y: 20,
                display: "none",
              });
            } else if (p >= 0.28 && p < 0.38) {
              const inRatio = (p - 0.28) / 0.10;
              gsap.set(stageElements[1], {
                opacity: Math.min(1, inRatio),
                y: 20 * (1 - inRatio),
                display: "flex",
              });
            } else if (p >= 0.38 && p <= 0.60) {
              gsap.set(stageElements[1], {
                opacity: 1,
                y: 0,
                display: "flex",
              });
            } else if (p > 0.60 && p < 0.70) {
              const outRatio = (p - 0.60) / 0.10;
              gsap.set(stageElements[1], {
                opacity: Math.max(0, 1 - outRatio),
                y: -20 * outRatio,
                display: "flex",
              });
            } else {
              gsap.set(stageElements[1], {
                opacity: 0,
                y: -20,
                display: "none",
              });
            }
          }

          // E. Stage 3 Transitions (Centered)
          // 0.64 -> 0.75 : gentle fade in
          // 0.75 -> 1.00 : 100% visible
          if (stageElements[2]) {
            if (p < 0.64) {
              gsap.set(stageElements[2], {
                opacity: 0,
                y: 20,
                display: "none",
              });
            } else if (p >= 0.64 && p < 0.75) {
              const inRatio = (p - 0.64) / 0.11;
              gsap.set(stageElements[2], {
                opacity: Math.min(1, inRatio),
                y: 20 * (1 - inRatio),
                display: "flex",
              });
            } else {
              gsap.set(stageElements[2], {
                opacity: 1,
                y: 0,
                display: "flex",
              });
            }
          }
        },
      });

      return () => {
        st.kill();
      };
    }, triggerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="home"
      ref={triggerRef}
      className="relative w-full bg-[#080808]"
      style={{
        height: `${heroConfig.frames.scrollMultiplierVh}vh`,
      }}
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinRef}
        className="relative w-full h-screen overflow-hidden bg-[#080808]"
      >
        {/* Layer 0: Cinematic Background Canvas */}
        <div className="absolute inset-0 w-full h-full z-0">
          <ScrollSequence
            ref={scrollSequenceRef}
            config={heroConfig.frames}
          />
        </div>

        {/* Layer 1: Storytelling Typography & HUD Elements */}
        <HeroContent
          ref={heroContentRef}
          stages={heroConfig.stages}
          currentStageIndex={currentStageIndex}
          onSelectStage={handleSelectStage}
        />
      </div>
    </section>
  );
}
