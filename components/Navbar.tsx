"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home",     path: "/" },
  { name: "About",    path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Blog",     path: "/blog" },
  { name: "Contact",  path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* ── DESKTOP: Side Rail (Apple-Style Minimalist Light Contrast Rail) ── */}
      <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-2.5 py-5 px-2 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.7)] animate-fade-in">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              title={link.name}
              className={`group relative w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300 ease-out ${
                isActive
                  ? "bg-[#9ffb2b] text-black font-semibold scale-100 shadow-[0_0_20px_rgba(159,251,43,0.3)]"
                  : "text-gray-400 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <span className="text-[11px] font-bold tracking-wider uppercase font-mono">
                {link.name.slice(0, 2)}
              </span>

              {/* Elegant Hover Tooltip */}
              <span className="pointer-events-none absolute left-full ml-4 px-3 py-1.5 rounded-lg bg-[#0c0c0c] text-gray-200 text-xs font-medium border border-white/[0.08] whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-xl">
                {link.name}
              </span>
            </Link>
          );
        })}
      </aside>

      {/* ── MOBILE: Bottom Floating Bar (Fluid Width Glassmorphic Dock) ── */}
      <div className="lg:hidden fixed bottom-6 left-0 right-0 w-full z-[9999] isolate flex justify-center items-center px-4 pointer-events-none">
        <nav className="pointer-events-auto w-full max-w-sm h-14 flex items-center justify-between gap-1 p-1.5 rounded-2xl bg-[#090909]/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.8)] relative overflow-hidden">
          
          {/* Subtle top edge glow for modern detail */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex-1 h-11 flex flex-col items-center justify-center rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all duration-200 active:scale-95 whitespace-nowrap select-none font-sans relative ${
                  isActive
                    ? "bg-[#9ffb2b] text-black font-extrabold shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                    : "text-gray-400 hover:text-gray-200 active:bg-white/[0.03]"
                }`}
              >
                {link.name}
                
                {/* Active Under-dot Micro-indicator */}
                {isActive && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-black/60" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}