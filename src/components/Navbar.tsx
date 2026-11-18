"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Technology", href: "#technology" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll spy to automatically highlight active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const contactEl = document.getElementById("contact");
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= 150) {
          setActiveItem("Contact");
          return;
        }
      }

      const technologyEl = document.getElementById("technology");
      if (technologyEl) {
        const rect = technologyEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= 150) {
          setActiveItem("Technology");
          return;
        }
      }

      const howItWorksEl = document.getElementById("how-it-works");
      if (howItWorksEl) {
        const rect = howItWorksEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= 150) {
          setActiveItem("How It Works");
          return;
        }
      }

      const aboutEl = document.getElementById("about");
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect();
        // If the About section is in view
        if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= 150) {
          setActiveItem("About");
          return;
        }
      }

      // If in Hero section
      if (window.scrollY < window.innerHeight * 2.5) {
        setActiveItem("Home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scroll on click
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    e.preventDefault();
    setActiveItem(item.label);
    setMobileMenuOpen(false);

    if (item.href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const targetId = item.href.replace("#", "");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pointer-events-none transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Floating pill navigation container */}
        <nav
          className={`pointer-events-auto w-full flex items-center justify-between px-5 sm:px-7 py-2.5 sm:py-3 rounded-full glass-nav transition-all duration-300 ${
            scrolled
              ? "bg-[#0c0c0c]/90 shadow-[0_12px_40px_rgba(0,0,0,0.85)] border-white/12"
              : "bg-[#121212]/75 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border-white/10"
          }`}
          aria-label="Main Navigation"
        >
          {/* Left Side: AEGIX Logo */}
          <Link
            href="/"
            className="flex items-center group relative z-10 transition-transform duration-200 hover:scale-[1.03]"
          >
            <div className="relative h-9 sm:h-11 md:h-12 w-32 sm:w-40 md:w-44 flex items-center">
              <Image
                src="/logo.png"
                alt="AEGIX Logo"
                fill
                priority
                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 176px"
                className="object-contain object-left drop-shadow-[0_2px_16px_rgba(255,255,255,0.2)]"
              />
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const isActive = activeItem === item.label;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`relative px-3.5 py-1.5 text-xs xl:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-[#A0A0A0] hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#FF6A00] rounded-full glow-orange" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Side: LOGIN & REGISTER Buttons & Mobile Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Login Link */}
            <a
              href="#login"
              className="hidden sm:inline-flex items-center justify-center px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#A0A0A0] hover:text-white transition-colors duration-200"
            >
              LOGIN
            </a>

            {/* Register CTA Button */}
            <a
              href="#register"
              className="relative group hidden sm:inline-flex items-center justify-center px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white rounded-full overflow-hidden transition-all duration-300 bg-[#1a1a1a] hover:bg-[#FF6A00] hover:text-black border border-white/10 hover:border-[#FF6A00] shadow-[0_2px_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(255,106,0,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-1.5 font-semibold">
                REGISTER
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#A0A0A0] hover:text-white rounded-full bg-white/5 border border-white/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden pointer-events-auto max-w-7xl mx-auto mt-2 px-4 py-4 rounded-2xl glass-nav bg-[#0e0e0e]/95 border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.8)] flex flex-col space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeItem === item.label
                  ? "text-[#FF6A00] bg-white/5 font-semibold"
                  : "text-[#A0A0A0] hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              href="#login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors"
            >
              LOGIN
            </a>
            <a
              href="#register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-[#FF6A00] hover:bg-[#FF9D24] rounded-full transition-colors shadow-[0_0_15px_rgba(255,106,0,0.4)]"
            >
              REGISTER
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
