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
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans antialiased selection:bg-[#9ffb2b] selection:text-black">
      <main className="max-w-6xl mx-auto px-6 py-24">
        
        {/* Profile Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Side: Profile Intro */}
          <div className={`lg:col-span-4 lg:sticky lg:top-24 space-y-6 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="space-y-1">
              <span className="text-xs font-bold tracking-wider text-[#9ffb2b] uppercase block">
                About Me
              </span>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Rashid Irfan KC
              </h1>
            </div>

            <div className="w-full max-w-xs mx-auto lg:mx-0">
              <img
                src="/photo.png"
                alt="Rashid Irfan KC"
                className="w-full h-auto object-contain block"
              />
            </div>

            <div className="space-y-4 text-sm text-gray-400 font-light leading-relaxed">
              <p>
                I always wanted to understand why some businesses succeed online while others get left behind. That curiosity led me to learn everything I can about search algorithms, customer data, and paid advertising campaigns.
              </p>
              <p>
                Based in Kerala, India, I help businesses grow their online performance, optimize their ad budgets, and get clear results that matter.
              </p>
            </div>
          </div>

          {/* Right Side: Creative Dynamic Timeline Showcase */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Filter Navigation */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-gray-600 uppercase block tracking-wider">
                Explore Focus Areas
              </span>
              <div className="flex flex-wrap gap-3">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveFilter(category);
                      const first = category === "All" ? CERTIFICATES[0] : CERTIFICATES.find(c => c.category === category);
                      if (first) setSelectedId(first.id);
                    }}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      activeFilter === category 
                        ? "bg-[#9ffb2b] text-black font-semibold border-[#9ffb2b]" 
                        : "bg-transparent border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Horizontal Timeline Track */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-gray-600 uppercase block tracking-wider">
                Timeline Index ({filtered.length})
              </span>
              
              <div className="relative flex gap-4 overflow-x-auto pb-4 pt-2 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent snap-x">
                {filtered.map((cert) => {
                  const isSelected = currentCert?.id === cert.id;
                  return (
                    <button
                      key={cert.id}
                      onClick={() => setSelectedId(cert.id)}
                      className={`snap-center shrink-0 w-48 p-4 rounded-xl border text-left transition-all flex flex-col justify-between h-32 ${
                        isSelected 
                          ? "bg-white border-white text-black shadow-lg shadow-white/5 scale-[1.02]" 
                          : "bg-[#111] border-gray-900 text-gray-400 hover:border-gray-800 hover:text-gray-200"
                      }`}
                    >
                      <span className={`text-[10px] font-mono font-medium block uppercase tracking-wider ${
                        isSelected ? "text-emerald-700" : "text-gray-600"
                      }`}>
                        {cert.date}
                      </span>
                      <h3 className="text-xs font-semibold line-clamp-3 leading-snug uppercase tracking-tight">
                        {cert.title}
                      </h3>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Media Stage Box */}
            {currentCert && (
              <div className="relative border-t border-gray-900 pt-8 space-y-4">
                
                {/* Visual Connector Dot */}
                <div className="absolute top-0 left-10 transform -translate-y-1/2 flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-[#9ffb2b]" />
                  <div className="w-[1px] h-8 bg-gradient-to-b from-[#9ffb2b] to-transparent" />
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#111] p-6 rounded-2xl border border-gray-900">
                  <div className="space-y-1 max-w-md">
                    <span className="text-[10px] font-mono text-[#9ffb2b] uppercase tracking-widest block">
                      Active Preview // {currentCert.category}
                    </span>
                    <h2 className="text-lg font-bold text-white uppercase tracking-tight leading-tight">
                      {currentCert.title}
                    </h2>
                    <p className="text-xs text-gray-500">
                      Verified credential issued directly by <span className="text-gray-300 font-medium">{currentCert.issuer}</span>.
                    </p>
                  </div>

                  {currentCert.link !== "#" && (
                    <a
                      href={currentCert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-xs text-black bg-[#9ffb2b] hover:bg-white hover:text-black font-semibold px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-1.5 self-start md:self-auto"
                    >
                      Verify original asset ↗
                    </a>
                  )}
                </div>

                {/* Clean, Raw Document Display Area */}
                <div className="bg-[#111] p-4 rounded-2xl border border-gray-900 shadow-2xl flex items-center justify-center min-h-[300px]">
                  <img
                    key={currentCert.id}
                    src={currentCert.image}
                    alt={currentCert.title}
                    className="w-full h-auto object-contain block rounded-lg max-h-[380px] animate-fade-in"
                  />
                </div>
              </div>
            )}

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-12 text-xs text-gray-600 border-t border-gray-900/40 font-mono tracking-wider">
        © {new Date().getFullYear()} RASHID IRFAN KC. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}