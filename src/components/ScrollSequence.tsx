"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import { FrameSequenceConfig } from "@/types/hero";

export interface ScrollSequenceHandle {
  renderFrame: (progress: number) => void;
  getLoadedRatio: () => number;
}

interface ScrollSequenceProps {
  config: FrameSequenceConfig;
  onLoaded?: () => void;
}

const ScrollSequence = forwardRef<ScrollSequenceHandle, ScrollSequenceProps>(
  ({ config, onLoaded }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
    const loadedCountRef = useRef<number>(0);
    const lastDrawnIndexRef = useRef<number>(-1);
    const currentProgressRef = useRef<number>(0);
    const [isInitialReady, setIsInitialReady] = useState(false);
    const [loadPercent, setLoadPercent] = useState(0);

    const {
      basePath,
      filePrefix,
      fileExtension,
      totalFrames,
      padLength,
    } = config;

    // Helper to format frame path: e.g. /scroll_frames/ezgif-frame-001.jpg
    const getFrameUrl = useCallback(
      (index: number) => {
        const frameNum = (index + 1).toString().padStart(padLength, "0");
        return `${basePath}/${filePrefix}${frameNum}${fileExtension}`;
      },
      [basePath, filePrefix, padLength, fileExtension]
    );

    // Render a specific frame image onto the canvas with cover scaling
    const drawImageToCanvas = useCallback((img: HTMLImageElement) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || img.width || 1920;
      const ih = img.naturalHeight || img.height || 1080;

      // Cover aspect ratio
      const hRatio = cw / iw;
      const vRatio = ch / ih;
      const ratio = Math.max(hRatio, vRatio);

      const renderW = iw * ratio;
      const renderH = ih * ratio;
      const renderX = (cw - renderW) / 2;
      const renderY = (ch - renderH) / 2;

      ctx.drawImage(img, renderX, renderY, renderW, renderH);
    }, []);

    // Draw the closest loaded frame to targetIndex
    const drawFrameByIndex = useCallback(
      (targetIndex: number) => {
        const clampedIndex = Math.max(
          0,
          Math.min(totalFrames - 1, Math.round(targetIndex))
        );

        const images = imagesRef.current;
        let imgToDraw = images[clampedIndex];

        // If target frame is not ready yet, search outward for nearest loaded frame
        if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
          let found = false;
          for (let offset = 1; offset < totalFrames; offset++) {
            const prev = clampedIndex - offset;
            if (
              prev >= 0 &&
              images[prev] &&
              images[prev]!.complete &&
              images[prev]!.naturalWidth > 0
            ) {
              imgToDraw = images[prev];
              found = true;
              break;
            }
            const next = clampedIndex + offset;
            if (
              next < totalFrames &&
              images[next] &&
              images[next]!.complete &&
              images[next]!.naturalWidth > 0
            ) {
              imgToDraw = images[next];
              found = true;
              break;
            }
          }
          if (!found) return;
        }

        if (imgToDraw) {
          drawImageToCanvas(imgToDraw);
          lastDrawnIndexRef.current = clampedIndex;
        }
      },
      [totalFrames, drawImageToCanvas]
    );

    // Resize canvas with high DPI support
    const handleResize = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const newWidth = Math.floor(rect.width * dpr);
      const newHeight = Math.floor(rect.height * dpr);

      if (canvas.width !== newWidth || canvas.height !== newHeight) {
        canvas.width = newWidth;
        canvas.height = newHeight;
      }

      // Re-draw current frame
      const currentIdx = Math.round(
        currentProgressRef.current * (totalFrames - 1)
      );
      drawFrameByIndex(currentIdx);
    }, [drawFrameByIndex, totalFrames]);

    // Imperative API exposed to GSAP controller
    useImperativeHandle(
      ref,
      () => ({
        renderFrame: (progress: number) => {
          currentProgressRef.current = Math.max(0, Math.min(1, progress));
          const targetIndex = Math.round(
            currentProgressRef.current * (totalFrames - 1)
          );
          drawFrameByIndex(targetIndex);
        },
        getLoadedRatio: () => {
          return loadedCountRef.current / totalFrames;
        },
      }),
      [totalFrames, drawFrameByIndex]
    );

    // Initial setup & progressive preloading
    useEffect(() => {
      const images: (HTMLImageElement | null)[] = new Array(totalFrames).fill(
        null
      );
      imagesRef.current = images;

      handleResize();
      window.addEventListener("resize", handleResize);

      let isMounted = true;

      // 1. Load First Frame with maximum priority
      const firstImg = new Image();
      firstImg.src = getFrameUrl(0);
      firstImg.onload = () => {
        if (!isMounted) return;
        images[0] = firstImg;
        loadedCountRef.current += 1;
        setIsInitialReady(true);
        drawFrameByIndex(0);
      };

      // 2. Load Second and Third frames early for immediate interaction
      [1, 2, 3, 4, 5].forEach((idx) => {
        if (idx < totalFrames) {
          const img = new Image();
          img.src = getFrameUrl(idx);
          img.onload = () => {
            if (!isMounted) return;
            images[idx] = img;
            loadedCountRef.current += 1;
          };
        }
      });

      // 3. Batch load remaining frames with controlled concurrency
      const batchSize = 6;
      let nextIndexToLoad = 6;

      const loadNextQueue = () => {
        if (!isMounted || nextIndexToLoad >= totalFrames) {
          return;
        }

        const currentBatchLimit = Math.min(
          totalFrames,
          nextIndexToLoad + batchSize
        );
        for (let i = nextIndexToLoad; i < currentBatchLimit; i++) {
          const img = new Image();
          img.src = getFrameUrl(i);
          img.onload = () => {
            if (!isMounted) return;
            images[i] = img;
            loadedCountRef.current += 1;

            const percent = Math.floor(
              (loadedCountRef.current / totalFrames) * 100
            );
            setLoadPercent(percent);

            if (loadedCountRef.current >= totalFrames) {
              onLoaded?.();
            }
          };
          img.onerror = () => {
            if (!isMounted) return;
            // Retry once or allow fallback
            loadedCountRef.current += 1;
          };
        }

        nextIndexToLoad = currentBatchLimit;
        if (nextIndexToLoad < totalFrames) {
          setTimeout(loadNextQueue, 40);
        }
      };

      // Start queue after first frame kicks off
      const timer = setTimeout(loadNextQueue, 100);

      return () => {
        isMounted = false;
        clearTimeout(timer);
        window.removeEventListener("resize", handleResize);
      };
    }, [getFrameUrl, totalFrames, handleResize, drawFrameByIndex, onLoaded]);

    return (
      <div className="relative w-full h-full overflow-hidden select-none">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block"
          style={{ willChange: "transform" }}
        />

        {/* Ambient Gradient Overlays for Cinematic Depth and Perfect Text Legibility */}
        {/* Left scrim gradient to ensure typography pop */}
        <div
          className="absolute inset-y-0 left-0 w-full md:w-3/5 lg:w-1/2 pointer-events-none bg-gradient-to-r from-[#080808] via-[#080808]/75 to-transparent z-10"
          aria-hidden="true"
        />

        {/* Center ambient atmospheric scrim to ensure readability for centered scenes */}
        <div
          className="absolute inset-0 pointer-events-none bg-radial from-black/35 via-black/20 to-transparent z-10"
          aria-hidden="true"
        />

        {/* Top vignette for floating navbar backdrop */}
        <div
          className="absolute top-0 inset-x-0 h-36 pointer-events-none bg-gradient-to-b from-[#080808]/90 via-[#080808]/40 to-transparent z-10"
          aria-hidden="true"
        />

        {/* Bottom fade into deep black */}
        <div
          className="absolute bottom-0 inset-x-0 h-40 pointer-events-none bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent z-10"
          aria-hidden="true"
        />

        {/* Atmospheric orange ambient lighting on right side */}
        <div
          className="absolute top-1/2 -translate-y-1/2 right-0 w-[500px] h-[500px] rounded-full pointer-events-none bg-radial from-[#FF6A00]/12 via-[#FF9D24]/5 to-transparent blur-3xl z-0"
          aria-hidden="true"
        />

        {/* Minimal Subtle Preloader Badge during initial streaming */}
        {!isInitialReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080808] z-30 transition-opacity duration-500">
            <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-[#FF6A00] animate-spin mb-4" />
            <div className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#A0A0A0]">
              INITIALIZING CINEMATIC STREAM
            </div>
          </div>
        )}

        {loadPercent > 0 && loadPercent < 100 && (
          <div className="absolute bottom-6 right-8 z-20 pointer-events-none hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/5 text-[10px] font-mono text-[#A0A0A0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-ping" />
            <span>BUFFERING {loadPercent}%</span>
          </div>
        )}
      </div>
    );
  }
);

ScrollSequence.displayName = "ScrollSequence";

export default ScrollSequence;
