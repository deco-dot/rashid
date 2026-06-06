"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home",     path: "/" },
  { name: "About",    path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact",  path: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* ── DESKTOP: Side Rail ── */}
      <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-1 py-4 px-2 rounded-2xl bg-white border border-slate-100 shadow-sm">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              title={link.name}
              className={`group relative w-9 h-9 flex items-center justify-center rounded-xl transition-colors duration-200 ${
                isActive
                  ? "bg-[#89fb2b] text-black"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {/* Icon abbreviation */}
              <span className="text-[10px] font-black uppercase tracking-wider">
                {link.name.slice(0, 2)}
              </span>

              {/* Tooltip label */}
              <span className="pointer-events-none absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                {link.name}
              </span>
            </Link>
          );
        })}
      </aside>

      {/* ── MOBILE: Bottom Bar ── */}
      <nav className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-4 py-2 rounded-2xl bg-white border border-slate-100 shadow-md">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors duration-200 ${
                isActive
                  ? "bg-[#89fb2b] text-black"
                  : "text-slate-400 hover:text-slate-900"
              }`}
            >
              {link.name.slice(0, 2)}
            </Link>
          );
        })}
      </nav>
    </>
  );
}