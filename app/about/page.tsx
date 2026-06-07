"use client";

import React, { useEffect, useState } from "react";


interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  category: string;
  image: string;
  link: string;
}

const CERTIFICATES: Certificate[] = [
  {
    id: 1,
    title: "Google Ads Display Certification",
    issuer: "Google",
    date: "Mar 2024",
    category: "Ads",
    image: "/certificates/gadc.png",
    link: "/certificates/gadc.png",
  },
  {
    id: 2,
    title: "AI Powered Performance Ads Certification",
    issuer: "Google",
    date: "Jan 2024",
    category: "Ads",
    image: "/certificates/appac.png",
    link: "/certificates/appac.png",
  },
  {
    id: 3,
    title: "SEO Certification",
    issuer: "HubSpot Academy",
    date: "Dec 2023",
    category: "SEO",
    image: "/certificates/seo.png",
    link: "/certificates/seo.png",
  },
  {
    id: 4,
    title: "Social Media Marketing Certification",
    issuer: "HubSpot Academy",
    date: "Nov 2023",
    category: "Social Media",
    image: "/certificates/smmc.png",
    link: "/certificates/smmc.png",
  },
  {
    id: 5,
    title: "Google Ads Search Certification",
    issuer: "Google",
    date: "Oct 2023",
    category: "Ads",
    image: "/certificates/gasc.png",
    link: "/certificates/gasc.png",
  },
  {
    id: 6,
    title: "Digital Marketing Certificate",
    issuer: "HubSpot Academy",
    date: "Sep 2023",
    category: "Marketing",
    image: "/certificates/marketing.png",
    link: "/certificates/marketing.png",
  },
  {
    id: 7,
    title: "AI-Powered Shopping Ads Certification",
    issuer: "Google",
    date: "Sep 2023",
    category: "Ads",
    image: "/certificates/asac.png",
    link: "/certificates/asac.png",
  },
  {
    id: 8,
    title: "Digital Advertising Certification",
    issuer: "Google",
    date: "Sep 2023",
    category: "Ads",
    image: "/certificates/ads.png",
    link: "/certificates/ads.png",
  },
  {
    id: 9,
    title: "Google Ads Creative Certification",
    issuer: "Google",
    date: "Sep 2023",
    category: "Ads",
    image: "/certificates/gacc.png",
    link: "/certificates/gacc.png",
  },
  {
    id: 10,
    title: "Google Ads Video Certification",
    issuer: "Google",
    date: "Sep 2023",
    category: "Ads",
    image: "/certificates/gavc.png",
    link: "/certificates/gavc.png",
  },
];


const CATEGORIES = ["All", "SEO", "Social Media", "Ads", "Marketing"];

export default function About() {
  const [loaded, setLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedId, setSelectedId] = useState<number>(1);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const filtered = activeFilter === "All" ? [...CERTIFICATES] : CERTIFICATES.filter((c) => c.category === activeFilter);
  const currentCert = filtered.find((c) => c.id === selectedId) || filtered[0];

  return (
    <div className="h-screen max-h-screen flex flex-col bg-[#0a0a0a] text-gray-300 font-sans antialiased selection:bg-[#9ffb2b] selection:text-black overflow-hidden">
      <main className="flex-1 min-h-0 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 pb-2 flex flex-col overflow-hidden">
        
        {/* Main Grid Viewport Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 flex-1 min-h-0 overflow-hidden">
          
          {/* Left Side Panel (Bio & Photo Info) - Scrolls internally if needed on tiny viewports */}
          <div className={`lg:col-span-4 flex flex-col lg:h-full lg:overflow-y-auto pr-2 pb-2 scrollbar-none space-y-4 shrink-0 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="space-y-1">
              <span className="text-xs font-bold tracking-wider text-[#9ffb2b] uppercase block">
                About Me
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Rashid Irfan KC
              </h1>
            </div>

            {/* Profile image container - scaled down on small heights to prevent overflow */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-full lg:h-auto max-w-xs mx-auto lg:mx-0 shrink-0">
              <img
                src="/photo.png"
                alt="Rashid Irfan KC"
                className="w-full h-full lg:h-auto object-contain block rounded-full lg:rounded-none"
              />
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
              <p>
                I always wanted to understand why some businesses succeed online while others get left behind. That curiosity led me to learn everything I can about search algorithms, customer data, and paid advertising campaigns.
              </p>
              <p className="hidden sm:block">
                Based in Kerala, India, I help businesses grow their online performance, optimize their ad budgets, and get clear results that matter.
              </p>
            </div>
          </div>

          {/* Right Side Panel (Dynamic Showcase) - Viewport locked, internal flex grids */}
          <div className="lg:col-span-8 flex flex-col h-full min-h-0 overflow-hidden space-y-4">
            
            {/* Filter Navigation */}
            <div className="space-y-1 shrink-0">
              <span className="text-[10px] font-semibold text-gray-600 uppercase block tracking-wider">
                Explore Focus Areas
              </span>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveFilter(category);
                      const first = category === "All" ? CERTIFICATES[0] : CERTIFICATES.find(c => c.category === category);
                      if (first) setSelectedId(first.id);
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-full border transition-all duration-200 ${
                      activeFilter === category 
                        ? "bg-[#9ffb2b] text-black font-semibold border-[#9ffb2b]" 
                        : "bg-transparent border-gray-900 text-gray-400 hover:border-gray-700 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Smart Non-Scrolling Responsive Grid Matrix - Fixed-height block with internal scroll */}
            <div className="space-y-1.5 shrink-0">
              <span className="text-[10px] font-semibold text-gray-600 uppercase block tracking-wider">
                Select Certificate ({filtered.length})
              </span>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[140px] sm:max-h-[180px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-transparent">
                {filtered.map((cert) => {
                  const isSelected = currentCert?.id === cert.id;
                  return (
                    <button
                      key={cert.id}
                      onClick={() => setSelectedId(cert.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between h-20 shrink-0 ${
                        isSelected 
                          ? "bg-white border-white text-black shadow-md scale-[1.01]" 
                          : "bg-[#111] border-gray-900 text-gray-400 hover:border-gray-800 hover:text-gray-200"
                      }`}
                    >
                      <span className={`text-[8px] font-mono font-medium block uppercase tracking-wider ${
                        isSelected ? "text-emerald-800" : "text-gray-500"
                      }`}>
                        {cert.date}
                      </span>
                      <h3 className="text-[11px] font-medium line-clamp-2 leading-tight uppercase tracking-tight mt-1">
                        {cert.title}
                      </h3>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Media Stage Box - Automatically expands to occupy remaining vertical space */}
            {currentCert && (
              <div className="relative border-t border-gray-900 pt-4 flex-1 min-h-0 flex flex-col overflow-hidden space-y-3">
                
                {/* Visual Connector Dot */}
                <div className="absolute top-0 left-6 transform -translate-y-1/2 flex flex-col items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9ffb2b]" />
                  <div className="w-[1px] h-4 bg-gradient-to-b from-[#9ffb2b] to-transparent" />
                </div>

                {/* Status Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#111] px-4 py-3 rounded-xl border border-gray-900 shrink-0">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-[#9ffb2b] uppercase tracking-widest block">
                      Active Preview  {currentCert.category}
                    </span>
                    <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight leading-tight line-clamp-1">
                      {currentCert.title}
                    </h2>
                  </div>

                  {currentCert.link !== "#" && (
                    <a
                      href={currentCert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-[10px] text-black bg-[#9ffb2b] hover:bg-white hover:text-black font-semibold px-3 py-1.5 rounded-md transition-colors inline-flex items-center justify-center gap-1 w-full sm:w-auto"
                    >
                      View ↗
                    </a>
                  )}
                </div>

                {/* Image Stage Container - Scales inside parent boundaries */}
                <div className="bg-[#111] p-2 rounded-xl border border-gray-900 shadow-2xl flex-1 min-h-0 flex items-center justify-center overflow-hidden">
                  <img
                    key={currentCert.id}
                    src={currentCert.image}
                    alt={currentCert.title}
                    className="max-w-full max-h-full object-contain block rounded-md"
                  />
                </div>
              </div>
            )}

          </div>

        </div>
      </main>

      {/* Footer - Sits strictly at bottom */}
      <footer className="shrink-0 w-full text-center py-4 text-[10px] text-gray-600 border-t border-gray-900/40 font-mono tracking-wider bg-[#0a0a0a]">
        © {new Date().getFullYear()} RASHID IRFAN KC. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}