"use client";

import React, { useState } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-7 sm:right-7 z-50 select-none">
      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 mb-3 w-[300px] sm:w-[340px] rounded-2xl bg-[#0B1120]/95 border border-white/10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(249,115,22,0.15)] overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  AEGIX Assistant
                </h4>
                <p className="text-[9px] font-mono text-slate-400">
                  AI SAFETY INTELLIGENCE
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-3.5 space-y-3 min-h-[140px] flex flex-col justify-end text-xs">
            <div className="flex items-start gap-2 max-w-[88%]">
              <div className="w-5 h-5 rounded-md bg-[#F97316]/20 border border-[#F97316]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-3 h-3 text-[#F97316]" />
              </div>
              <div className="p-2.5 rounded-xl rounded-tl-xs bg-white/[0.05] border border-white/10 text-slate-200 leading-relaxed font-normal text-[11px]">
                Hello. How can AEGIX intelligent safety assist your factory operations today?
              </div>
            </div>
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSend}
            className="p-2.5 border-t border-white/10 bg-black/40 flex items-center gap-2"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask AEGIX AI..."
              className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#F97316]/60 transition-colors"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-[#F97316] text-black hover:bg-[#FB923C] transition-all duration-200 flex-shrink-0"
              aria-label="Send"
            >
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>
      )}

      {/* Entire Button Animated with Slow, Low Micro-Float */}
      <div className="animate-slow-micro-float">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Open AI Safety Chat"
          className="group relative flex items-center justify-center w-11 h-11 sm:w-11.5 sm:h-11.5 rounded-full bg-[#18181b] border border-[#F97316]/70 shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_12px_rgba(249,115,22,0.25)] hover:border-[#F97316] hover:shadow-[0_0_20px_rgba(249,115,22,0.45)] transition-all duration-300 focus:outline-none active:scale-95"
        >
          {/* Subtle quiet breathing ambient glow */}
          <span
            className="absolute -inset-1 rounded-full bg-[#F97316]/15 animate-pulse-glow pointer-events-none blur-[3px]"
            aria-hidden="true"
          />

          {isOpen ? (
            <X className="w-4 h-4 text-[#F97316] transition-transform duration-300 group-hover:rotate-90 relative z-10" />
          ) : (
            <MessageSquare className="w-4 h-4 text-[#F97316] fill-[#F97316]/20 transition-transform duration-300 group-hover:scale-105 relative z-10" />
          )}

          {/* Connected Green Status Dot (matching reference image) */}
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#10B981] border-[1.5px] border-[#18181b] z-20 shadow-[0_0_4px_rgba(16,185,129,0.6)]" />
        </button>
      </div>
    </div>
  );
}
