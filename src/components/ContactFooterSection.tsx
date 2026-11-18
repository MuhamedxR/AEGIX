"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Send, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface NavFooterItem {
  label: string;
  href: string;
}

const footerNav: NavFooterItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Technology", href: "#technology" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "Facebook", shortLabel: "Fb", href: "https://facebook.com" },
  { label: "Instagram", shortLabel: "Ig", href: "https://instagram.com" },
  { label: "X (Twitter)", shortLabel: "X", href: "https://x.com" },
];

export default function ContactFooterSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contactHeaderRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Basic validation
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // TODO: Replace with actual backend submission handler
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ fullName: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  // Smooth scroll for footer nav
  const handleFooterNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const targetEl = document.getElementById(href.replace("#", ""));
      if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // GSAP Scroll Animations
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const ctx = gsap.context(() => {
      // 1. Contact heading reveal
      if (contactHeaderRef.current) {
        gsap.fromTo(
          contactHeaderRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.14,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contactHeaderRef.current,
              start: "top 85%",
              end: "bottom top",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // 2. Form staggered reveal
      if (formRef.current) {
        const formFields = formRef.current.querySelectorAll(".form-field");
        gsap.fromTo(
          formFields,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 88%",
              end: "bottom top",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // 3. Footer reveal
      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Shared input style
  const inputBaseClass =
    "form-field w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-slate-500 font-normal outline-none transition-all duration-300 focus:border-[#10B981]/60 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(16,185,129,0.12)] hover:border-white/20";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #05080F 0%, #04060c 40%, #030408 75%, #020306 100%)",
      }}
    >
      {/* Subtle ambient lighting */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full pointer-events-none bg-radial from-[#F97316]/4 via-[#10B981]/3 to-transparent blur-3xl z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full pointer-events-none bg-radial from-[#10B981]/5 via-transparent to-transparent blur-3xl z-0"
        aria-hidden="true"
      />

      {/* Subtle high-tech grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(248, 250, 252, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(248, 250, 252, 0.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      {/* ===================== CONTACT AREA ===================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Left: Section Header & Description */}
          <div ref={contactHeaderRef} className="max-w-lg">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse shadow-[0_0_10px_#F97316]" />
              <span className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-[0.28em] text-[#F97316]">
                04 — GET IN TOUCH
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-[1.08] mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
              LET&apos;S BUILD A{" "}
              <span className="text-[#F97316] drop-shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                SAFER FUTURE.
              </span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              Have questions about AEGIX? Let&apos;s explore how intelligent
              safety can transform your industrial environment.
            </p>

            {/* Decorative separator */}
            <div className="hidden lg:flex items-center gap-4 mt-10">
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#F97316] to-transparent" />
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">
                AEGIX COMMUNICATIONS
              </span>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="relative">
            {/* Success Overlay */}
            {submitted && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-[#0a101f]/95 backdrop-blur-xl border border-[#10B981]/40 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                <div className="w-14 h-14 rounded-full bg-[#10B981]/20 border border-[#10B981]/50 flex items-center justify-center mb-4">
                  <Send className="w-6 h-6 text-[#10B981]" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">
                  Message Sent
                </h4>
                <p className="text-sm text-slate-400 text-center max-w-xs">
                  Thank you for reaching out. We&apos;ll get back to you
                  shortly.
                </p>
              </div>
            )}

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="relative space-y-5 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm"
            >
              {/* Full Name */}
              <div className="form-field">
                <label
                  htmlFor="fullName"
                  className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={`${inputBaseClass} ${
                    errors.fullName ? "border-[#EF4444]/60" : ""
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-[#EF4444]">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="form-field">
                <label
                  htmlFor="email"
                  className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className={`${inputBaseClass} ${
                    errors.email ? "border-[#EF4444]/60" : ""
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-[#EF4444]">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div className="form-field">
                <label
                  htmlFor="subject"
                  className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject of your message"
                  className={`${inputBaseClass} ${
                    errors.subject ? "border-[#EF4444]/60" : ""
                  }`}
                />
                {errors.subject && (
                  <p className="mt-1.5 text-xs text-[#EF4444]">
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="form-field">
                <label
                  htmlFor="message"
                  className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us about your project..."
                  className={`${inputBaseClass} resize-none ${
                    errors.message ? "border-[#EF4444]/60" : ""
                  }`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-[#EF4444]">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-field pt-2">
                <button
                  type="submit"
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#F97316] text-black font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-[#FB923C] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] active:scale-[0.98]"
                >
                  SEND MESSAGE
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ===================== FOOTER ===================== */}
      <div className="relative z-10 mt-6">
        {/* Subtle divider */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div
          ref={footerRef}
          className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-16"
        >
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">
            {/* Brand Area */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/logo.png"
                  alt="AEGIX Logo"
                  width={120}
                  height={34}
                  className="h-9 w-auto object-contain"
                  priority={false}
                />
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
                AI-powered intelligence for safer industrial environments.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-xs font-mono text-slate-400 uppercase tracking-wider hover:text-[#F97316] hover:border-[#F97316]/40 hover:bg-[#F97316]/10 transition-all duration-300"
                  >
                    {social.shortLabel}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="md:col-span-3 md:col-start-7">
              <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-[0.2em] mb-5">
                Navigation
              </h4>
              <ul className="space-y-3">
                {footerNav.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => handleFooterNav(e, item.href)}
                      className="text-sm text-slate-400 hover:text-white hover:pl-1 transition-all duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Contact Details */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-[0.2em] mb-5">
                Connect
              </h4>
              <div className="space-y-3 text-sm text-slate-400">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  Systems Online
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                  Demo Available
                </p>
                <a
                  href="#contact"
                  onClick={(e) => handleFooterNav(e, "#contact")}
                  className="inline-flex items-center gap-1.5 text-[#F97316] hover:text-[#FB923C] transition-colors duration-200 mt-2"
                >
                  Get in touch
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono">
            <p>&copy; 2026 AEGIX. All rights reserved.</p>
            <p className="text-slate-600 tracking-wider uppercase">
              AI-Powered Industrial Safety
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
