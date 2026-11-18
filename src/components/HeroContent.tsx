"use client";

import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { TextStage } from "@/types/hero";
import { ArrowRight, ChevronDown } from "lucide-react";

export interface HeroContentHandle {
  stageElements: (HTMLDivElement | null)[];
}

interface HeroContentProps {
  stages: TextStage[];
  currentStageIndex: number;
  onSelectStage?: (index: number) => void;
}

const HeroContent = forwardRef<HeroContentHandle, HeroContentProps>(
  ({ stages, currentStageIndex, onSelectStage }, ref) => {
    const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

    useImperativeHandle(ref, () => ({
      stageElements: stageRefs.current,
    }));

    return (
      <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-10 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        {/* Main Stage Text Container */}
        <div className="relative flex-1 flex items-center justify-center w-full min-h-0">
          <div className="relative w-full h-full flex items-center justify-center">
            {stages.map((stage, idx) => {
              // Scene 1 (idx === 0) is Left-Aligned
              // Scene 2 & Scene 3 (idx === 1, 2) are Centered on the page
              const isCentered = idx > 0;

              return (
                <div
                  key={stage.id}
                  ref={(el) => {
                    stageRefs.current[idx] = el;
                  }}
                  className={`absolute inset-x-0 flex flex-col transition-none ${
                    isCentered
                      ? "items-center justify-center text-center max-w-3xl mx-auto"
                      : "items-start justify-center text-left max-w-2xl mr-auto"
                  } ${
                    idx === 0
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8 pointer-events-none"
                  }`}
                  style={{
                    willChange: "opacity, transform",
                    display: idx === 0 ? "flex" : "none",
                  }}
                >
                  {/* Subtle radial ambient backing for centered stages to enhance readability */}
                  {isCentered && (
                    <div
                      className="absolute -inset-10 -z-10 rounded-full bg-radial from-black/70 via-black/40 to-transparent blur-2xl pointer-events-none"
                      aria-hidden="true"
                    />
                  )}

                  {/* Stage Category / Over-title */}
                  <div
                    className={`inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full glass-badge mb-4 sm:mb-5 border border-white/10 shadow-[0_0_15px_rgba(255,106,0,0.15)] ${
                      isCentered ? "mx-auto" : ""
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse glow-orange" />
                    <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[#FF9D24]">
                      {stage.category}
                    </span>
                  </div>

                  {/* Main Headline */}
                  <h1
                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.08] mb-4 sm:mb-5 drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] ${
                      isCentered ? "text-center mx-auto" : "text-left"
                    }`}
                  >
                    {stage.headline}
                  </h1>

                  {/* Subtitle / Description */}
                  <p
                    className={`text-sm sm:text-base md:text-lg text-[#A0A0A0] max-w-xl font-normal leading-relaxed mb-6 sm:mb-7 drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)] ${
                      isCentered ? "text-center mx-auto" : "text-left"
                    }`}
                  >
                    {stage.description}
                  </p>

                  {/* Interactive CTA Capsule */}
                  <div
                    className={`pointer-events-auto inline-flex items-center ${
                      isCentered ? "justify-center mx-auto" : "justify-start"
                    }`}
                  >
                    <a
                      href={stage.ctaLink}
                      className="group relative inline-flex items-center gap-3 px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#181818] to-[#121212] hover:from-[#FF6A00] hover:to-[#FF9D24] text-white hover:text-black border border-white/12 hover:border-[#FF6A00] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(255,106,0,0.5)]"
                    >
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                        {stage.ctaText}
                      </span>
                      <span className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-black/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Edge: Vertical Stage Indicator Dots / Pills */}
        <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-20 pointer-events-auto flex flex-col items-center gap-3">
          {stages.map((stg, i) => {
            const isActive = currentStageIndex === i;
            return (
              <button
                key={stg.id}
                onClick={() => onSelectStage?.(i)}
                className="group relative flex items-center justify-center py-1 cursor-pointer focus:outline-none"
                aria-label={`Jump to stage ${stg.stageCode}`}
              >
                <div
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "h-8 bg-[#FF6A00] shadow-[0_0_12px_#FF6A00]"
                      : "h-3 bg-white/20 group-hover:bg-white/50"
                  }`}
                />
                {/* Tooltip on hover */}
                <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none px-2 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono whitespace-nowrap text-white">
                  STAGE {stg.stageCode}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom Elements: Social Links, Scroll Badge, and Direction Controls */}
        <div className="relative w-full flex items-end justify-between pt-4 border-t border-white/5 text-xs text-[#A0A0A0]">
          {/* Bottom Left: Social Media Links */}
          <div className="pointer-events-auto hidden sm:flex items-center space-x-4 font-mono text-[11px] uppercase tracking-wider">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A0A0A0] hover:text-[#FF6A00] transition-colors"
            >
              f
            </a>
            <span className="text-white/10">/</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A0A0A0] hover:text-[#FF6A00] transition-colors"
            >
              ig
            </a>
            <span className="text-white/10">/</span>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A0A0A0] hover:text-[#FF6A00] transition-colors"
            >
              x
            </a>
          </div>

          {/* Bottom Center: Cinematic "SCROLL TO EXPLORE" Circular Badge */}
          <div className="pointer-events-auto mx-auto sm:mx-0 flex items-center justify-center">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center group cursor-pointer">
              {/* Rotating SVG circular text */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full animate-spin-slow opacity-60 group-hover:opacity-100 transition-opacity"
              >
                <path
                  id="circlePath"
                  d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                  fill="none"
                />
                <text
                  fill="#ffffff"
                  fontSize="8.5"
                  letterSpacing="2.5"
                  className="font-mono uppercase font-semibold"
                >
                  <textPath href="#circlePath" startOffset="0%">
                    • SCROLL TO EXPLORE • AEGIX INTELLIGENCE
                  </textPath>
                </text>
              </svg>

              {/* Center Down Arrow Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#FF6A00] transition-colors">
                  <ChevronDown className="w-4 h-4 text-[#FF9D24] animate-bounce" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Right: Stage Counter & Step Navigation */}
          <div className="pointer-events-auto hidden sm:flex items-center space-x-3 font-mono text-xs">
            <span className="text-white font-bold">
              0{currentStageIndex + 1}
            </span>
            <span className="text-white/20">/</span>
            <span className="text-[#A0A0A0]">0{stages.length}</span>

            <div className="flex items-center space-x-1 pl-2">
              <button
                onClick={() =>
                  onSelectStage?.(Math.max(0, currentStageIndex - 1))
                }
                disabled={currentStageIndex === 0}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous Stage"
              >
                <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              </button>
              <button
                onClick={() =>
                  onSelectStage?.(
                    Math.min(stages.length - 1, currentStageIndex + 1)
                  )
                }
                disabled={currentStageIndex === stages.length - 1}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Next Stage"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

HeroContent.displayName = "HeroContent";

export default HeroContent;
