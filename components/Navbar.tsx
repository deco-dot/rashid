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
      {/* ── DESKTOP: Side Rail ── */}
      <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-2 py-4 px-2 rounded-2xl bg-[#ebebeb] border border-gray-900/60 shadow-xl">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              title={link.name}
              className={`group relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-[#9ffb2b] text-black font-semibold"
                  : "text-gray-500 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-[11px] font-medium tracking-wider uppercase">
                {link.name.slice(0, 2)}
              </span>

              <span className="pointer-events-none absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-gray-900 text-gray-200 text-xs font-medium border border-gray-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow-md">
                {link.name}
              </span>
            </Link>
          );
        })}
      </aside>

      {/* ── MOBILE: Bottom Bar ── */}
      {/* High-priority isolated layout container */}
      <div className="lg:hidden fixed bottom-6 left-0 right-0 w-full z-[9999] isolate flex justify-center items-center pointer-events-none">
        <nav className="pointer-events-auto w-[320px] min-w-[320px] max-w-[320px] h-[54px] min-h-[54px] flex items-center justify-between gap-1 p-1.5 rounded-2xl bg-[#111] border border-gray-900/80 shadow-2xl backdrop-blur-md appearance-none">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`w-[74px] min-w-[74px] max-w-[74px] h-[42px] min-h-[42px] flex items-center justify-center rounded-xl text-xs font-medium tracking-wider uppercase transition-all duration-150 whitespace-nowrap select-none border border-transparent ${
                  isActive
                    ? "bg-[#9ffb2b] text-black font-semibold shadow-inner"
                    : "text-gray-500 hover:text-gray-200"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}