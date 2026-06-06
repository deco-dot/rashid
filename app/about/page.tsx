"use client";
import React, { useEffect, useState, useCallback } from "react";

// ─────────────────────────────────────────────
//  ADD YOUR CERTIFICATES HERE
//  image: direct URL to the certificate image
//  link:  verification / credential URL (optional, use "#" if none)
// ─────────────────────────────────────────────
const CERTIFICATES = [
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
    title: "AI Powered Performence Ads Certification",
    issuer: "Google",
    date: "Jan 2024",
    category: "Ads",
    image: "/certificates/appac.png",
    link: "/certificates/appac.png",
  },
  {
    id: 3,
    title: "SEO",
    issuer: "Hubspot Academy",
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
    category: "Content",
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
    category: "ads",
    image: "/certificates/asac.png",
    link: "/certificates/asac.png",
  },
  {
    id: 8,
    title: "Digital Advertising Certification",
    issuer: "Google",
    date: "Sep 2023",
    category: "ads",
    image: "/certificates/ads.png",
    link: "/certificates/ads.png",
  },
  {
    id: 9,
    title: "Google Ads Creative Certification",
    issuer: "Google",
    date: "Sep 2023",
    category: "ads",
    image: "/certificates/gacc.png",
    link: "/certificates/gacc.png",
  },
  {
    id: 10,
    title: "Google Ads Video Certification",
    issuer: "Google",
    date: "Sep 2023",
    category: "ads",
    image: "/certificates/gavc.png",
    link: "/certificates/gavc.png",
  },
  
];

const CATEGORIES = ["All", "SEO", "Analytics", "Social Media", "Content", "Ads", "Email"];

const CAT_COLOR: Record<string, string> = {
  SEO: "#9ffb2b",
  Analytics: "#60a5fa",
  "Social Media": "#f472b6",
  Content: "#fb923c",
  Ads: "#a78bfa",
  Email: "#34d399",
};

export default function About() {
  const [loaded, setLoaded]           = useState(false);
  const [scrollY, setScrollY]         = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox]       = useState<number | null>(null); // cert id
  const [imgLoaded, setImgLoaded]     = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // keyboard nav for lightbox
  const filtered = activeFilter === "All" ? CERTIFICATES : CERTIFICATES.filter(c => c.category === activeFilter);
  const lbIndex  = lightbox !== null ? filtered.findIndex(c => c.id === lightbox) : -1;
  const lbCert   = lbIndex !== -1 ? filtered[lbIndex] : null;

  const prev = useCallback(() => {
    if (lbIndex > 0) { setImgLoaded(false); setLightbox(filtered[lbIndex - 1].id); }
  }, [lbIndex, filtered]);

  const next = useCallback(() => {
    if (lbIndex < filtered.length - 1) { setImgLoaded(false); setLightbox(filtered[lbIndex + 1].id); }
  }, [lbIndex, filtered]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")     setLightbox(null);
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prev, next]);

  // lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --green: #9ffb2b;
          --green-soft: rgba(159,251,43,0.09);
          --green-border: rgba(159,251,43,0.18);
          --bg: #0a0a0a;
          --card: #111111;
          --border: rgba(255,255,255,0.07);
          --text: #f0f0f0;
          --muted: #666;
          --subtle: #1a1a1a;
        }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; }

        /* NAV */
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: 64px; display: flex; align-items: center; padding: 0 48px; }
        .nav.scrolled { background: rgba(10,10,10,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
        .nav-inner { max-width: 1100px; margin: 0 auto; width: 100%; display: flex; align-items: center; justify-content: space-between; }
        .logo { font-size: 15px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #fff; text-decoration: none; }
        .logo span { color: var(--green); }
        .nav-links { display: flex; gap: 36px; list-style: none; }
        .nav-links a { font-size: 12px; font-weight: 500; letter-spacing: 0.06em; color: var(--muted); text-decoration: none; transition: color 0.2s; }
        .nav-links a:hover, .nav-links a.active { color: #fff; }
        .btn-hire { padding: 8px 20px; border-radius: 6px; border: 1px solid var(--green); color: var(--green); font-size: 12px; font-weight: 600; text-decoration: none; transition: background 0.2s, color 0.2s; }
        .btn-hire:hover { background: var(--green); color: #000; }

        /* ENTRY */
        .fade-up { opacity: 0; transform: translateY(22px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-up.show { opacity: 1; transform: translateY(0); }
        .d1{transition-delay:.1s} .d2{transition-delay:.22s} .d3{transition-delay:.34s} .d4{transition-delay:.46s}
        .reveal { opacity: 0; transform: translateY(18px); transition: opacity 0.55s ease, transform 0.55s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        /* PAGE HERO */
        .page-hero { padding: 140px 48px 80px; max-width: 1100px; margin: 0 auto; }
        .eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--green); margin-bottom: 20px; }
        .eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: blink 2s infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .page-title { font-size: clamp(2.4rem,5vw,4rem); font-weight: 700; line-height: 1.1; letter-spacing: -0.02em; color: #fff; margin-bottom: 18px; }
        .page-sub { font-size: 16px; color: var(--muted); line-height: 1.8; max-width: 520px; }

        /* SECTION */
        .section { padding: 80px 48px; }
        .section-inner { max-width: 1100px; margin: 0 auto; }
        .section-label { font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--green); display: block; margin-bottom: 10px; }
        .section-heading { font-size: clamp(1.6rem,2.8vw,2.2rem); font-weight: 700; color: #fff; line-height: 1.15; letter-spacing: -0.01em; margin-bottom: 40px; }
        .hr { border: none; border-top: 1px solid var(--border); margin: 0; }

        /* ABOUT SPLIT */
        .about-split { display: grid; grid-template-columns: 360px 1fr; gap: 72px; align-items: start; }
        .photo-wrap { border-radius: 14px; overflow: hidden; aspect-ratio: 3/4; background: #1a1a1a; border: 1px solid var(--border); }
        .photo-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; filter: grayscale(100%); opacity: 0.72; transition: filter 0.4s, opacity 0.4s; }
        .photo-wrap:hover img { filter: grayscale(50%); opacity: 0.9; }
        .photo-placeholder { width: 100%; height: 100%; min-height: 340px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; color: #333; text-align: center; padding: 32px; }
        .photo-placeholder p { font-size: 12px; line-height: 1.6; }
        .photo-placeholder code { color: var(--green); font-size: 11px; }
        .photo-meta { margin-top: 14px; }
        .photo-name { font-size: 15px; font-weight: 700; color: #fff; }
        .photo-role { font-size: 13px; color: var(--muted); margin-top: 3px; }

        .bio-text { font-size: 15px; color: #888; line-height: 1.85; margin-bottom: 18px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 36px; }
        .info-item { padding: 14px 16px; border-radius: 10px; background: var(--card); border: 1px solid var(--border); }
        .info-key { font-size: 10px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
        .info-val { font-size: 14px; font-weight: 600; color: #ddd; }
        .skills-wrap { display: flex; flex-direction: column; gap: 18px; margin-bottom: 40px; }
        .skill-row-head { display: flex; justify-content: space-between; margin-bottom: 7px; }
        .skill-name { font-size: 13px; color: #bbb; font-weight: 500; }
        .skill-pct { font-size: 12px; color: var(--green); font-weight: 600; }
        .skill-track { height: 2px; border-radius: 1px; background: rgba(255,255,255,0.06); overflow: hidden; }
        .skill-fill { height: 100%; background: var(--green); border-radius: 1px; }
        .timeline { display: flex; flex-direction: column; position: relative; padding-left: 28px; }
        .timeline::before { content:''; position: absolute; left: 0; top: 8px; bottom: 8px; width: 1px; background: var(--border); }
        .tl-item { position: relative; padding: 0 0 30px 28px; }
        .tl-item:last-child { padding-bottom: 0; }
        .tl-dot { position: absolute; left: -34px; top: 5px; width: 12px; height: 12px; border-radius: 50%; background: var(--bg); border: 2px solid var(--green); }
        .tl-date { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--green); margin-bottom: 5px; }
        .tl-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 3px; }
        .tl-org { font-size: 13px; color: var(--muted); margin-bottom: 7px; }
        .tl-desc { font-size: 13px; color: #777; line-height: 1.7; }

        /* ════════════════════════════════════
           CERTIFICATE GALLERY
        ════════════════════════════════════ */
        .cert-section { padding: 80px 48px; }
        .cert-inner { max-width: 1100px; margin: 0 auto; }

        /* filter bar */
        .cert-topbar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; margin-bottom: 40px; }
        .cert-filters { display: flex; flex-wrap: wrap; gap: 8px; }
        .flt-btn { padding: 7px 16px; border-radius: 6px; border: 1px solid var(--border); background: transparent; color: var(--muted); font-size: 12px; font-weight: 500; cursor: pointer; font-family: 'Inter',sans-serif; transition: all 0.18s; }
        .flt-btn:hover { border-color: rgba(255,255,255,0.18); color: #ccc; }
        .flt-btn.active { background: var(--green); color: #000; border-color: var(--green); font-weight: 700; }
        .cert-tally { font-size: 12px; color: var(--muted); }

        /* masonry-style grid */
        .cert-gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

        /* thumbnail card */
        .cert-thumb {
          border-radius: 12px; overflow: hidden;
          background: var(--card); border: 1px solid var(--border);
          cursor: pointer; position: relative;
          transition: border-color 0.2s, transform 0.22s;
          group: true;
        }
        .cert-thumb:hover { border-color: rgba(255,255,255,0.16); transform: translateY(-3px); }
        .cert-thumb:hover .thumb-overlay { opacity: 1; }
        .cert-thumb:hover .thumb-zoom { transform: scale(1); opacity: 1; }

        /* image area */
        .thumb-img-wrap { position: relative; aspect-ratio: 16/11; overflow: hidden; background: #0f0f0f; }
        .thumb-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
        .cert-thumb:hover .thumb-img-wrap img { transform: scale(1.04); }

        /* hover overlay */
        .thumb-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.55);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.22s;
        }
        .thumb-zoom {
          width: 44px; height: 44px; border-radius: 50%;
          background: var(--green); display: flex; align-items: center; justify-content: center;
          transform: scale(0.8); opacity: 0; transition: transform 0.22s, opacity 0.22s;
        }
        .thumb-zoom svg { width: 18px; height: 18px; }

        /* accent bar */
        .thumb-accent { height: 2px; width: 100%; }

        /* meta below image */
        .thumb-meta { padding: 14px 16px; }
        .thumb-cat {
          display: inline-block; font-size: 9px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 3px 9px; border-radius: 4px; margin-bottom: 8px;
        }
        .thumb-title { font-size: 13px; font-weight: 700; color: #fff; line-height: 1.35; margin-bottom: 4px; }
        .thumb-issuer-date { display: flex; align-items: center; justify-content: space-between; }
        .thumb-issuer { font-size: 11px; color: var(--muted); }
        .thumb-date { font-size: 11px; color: #444; }

        /* ══ LIGHTBOX ══ */
        .lb-backdrop {
          position: fixed; inset: 0; z-index: 999;
          background: rgba(0,0,0,0.92);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: lb-in 0.2s ease;
        }
        @keyframes lb-in { from{opacity:0} to{opacity:1} }

        .lb-panel {
          position: relative; max-width: 860px; width: 100%;
          display: flex; flex-direction: column; gap: 0;
          animation: lb-up 0.22s ease;
        }
        @keyframes lb-up { from{transform:translateY(16px);opacity:0} to{transform:translateY(0);opacity:1} }

        /* close */
        .lb-close {
          position: absolute; top: -44px; right: 0;
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15); background: transparent;
          color: #aaa; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.18s, color 0.18s; font-family: 'Inter',sans-serif;
        }
        .lb-close:hover { background: rgba(255,255,255,0.08); color: #fff; }

        /* nav arrows */
        .lb-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 40px; height: 40px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.12); background: rgba(0,0,0,0.6);
          color: #aaa; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.18s, color 0.18s; font-family: 'Inter',sans-serif; z-index: 2;
        }
        .lb-arrow:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .lb-arrow.left { left: -56px; }
        .lb-arrow.right { right: -56px; }
        .lb-arrow:disabled { opacity: 0.2; cursor: default; pointer-events: none; }

        /* image */
        .lb-img-wrap {
          border-radius: 12px; overflow: hidden;
          background: #0f0f0f; border: 1px solid var(--border);
          position: relative;
        }
        .lb-img-wrap img {
          width: 100%; display: block;
          transition: opacity 0.2s;
        }
        .lb-img-wrap img.loading { opacity: 0; }

        /* spinner */
        .lb-spinner {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
        }
        .spinner { width: 28px; height: 28px; border: 2px solid rgba(255,255,255,0.08); border-top-color: var(--green); border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to{transform:rotate(360deg)} }

        /* meta bar below image */
        .lb-meta {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 4px 0; gap: 16px; flex-wrap: wrap;
        }
        .lb-left {}
        .lb-title { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 4px; }
        .lb-issuer { font-size: 13px; color: var(--muted); }
        .lb-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .lb-counter { font-size: 12px; color: #444; }
        .lb-link {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 18px; border-radius: 6px;
          border: 1px solid var(--green-border); color: var(--green);
          font-size: 12px; font-weight: 600; text-decoration: none; letter-spacing: 0.04em;
          transition: background 0.18s, color 0.18s; white-space: nowrap;
        }
        .lb-link:hover { background: var(--green); color: #000; }

        /* CTA / footer */
        .btn-primary { display: inline-flex; align-items: center; gap: 6px; padding: 12px 24px; border-radius: 6px; background: var(--green); color: #000; font-size: 13px; font-weight: 600; text-decoration: none; transition: opacity 0.2s, transform 0.15s; }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
        .footer { padding: 28px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; max-width: 1100px; margin: 0 auto; }
        .footer-logo { font-size: 14px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #fff; }
        .footer-logo span { color: var(--green); }
        .footer-copy { font-size: 12px; color: var(--muted); }
        .footer-links { display: flex; gap: 24px; list-style: none; }
        .footer-links a { font-size: 12px; color: var(--muted); text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: #fff; }

        @media(max-width:960px){
          .about-split { grid-template-columns:1fr; gap:48px; }
          .cert-gallery { grid-template-columns:1fr 1fr; }
          .section,.cert-section{padding:60px 24px;}
          .nav,.footer{padding-left:24px;padding-right:24px;}
          .page-hero{padding:120px 24px 60px;}
          .nav-links,.btn-hire{display:none;}
          .lb-arrow.left{left:-14px;} .lb-arrow.right{right:-14px;}
        }
        @media(max-width:560px){
          .cert-gallery{grid-template-columns:1fr;}
          .info-grid{grid-template-columns:1fr;}
          .lb-arrow{display:none;}
        }
      `}</style>

    

      <main>

        {/* PAGE HERO */}
        <div className="page-hero">
          <div className={`eyebrow fade-up d1 ${loaded ? "show" : ""}`}><span className="eyebrow-dot" />About Me</div>
          <h1 className={`page-title fade-up d2 ${loaded ? "show" : ""}`}>The person behind<br />the strategy</h1>
          <p className={`page-sub fade-up d3 ${loaded ? "show" : ""}`}>I'm a digital marketer from Kerala who believes good marketing is honest, data-backed, and built to last.</p>
        </div>

        <hr className="hr" />

        {/* ABOUT SPLIT */}
        <section className="section">
          <div className="section-inner">
            <div className="about-split">

              {/* PHOTO */}
              <div className="reveal">
                <div className="photo-wrap">
                  {
                    <img src="/photo.png"/>
                  }
                  <div className="photo-placeholder">
                    <svg width="48" height="48" viewBox="0 0 52 52" fill="none">
                      <circle cx="26" cy="20" r="11" stroke="#9ffb2b" strokeWidth="1.5"/>
                      <path d="M4 48c0-12.15 9.85-22 22-22s22 9.85 22 22" stroke="#9ffb2b" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <p>Your photo goes here.<br/>Replace with:<br/><code>&lt;img src="/photo.jpg" /&gt;</code></p>
                  </div>
                </div>
                <div className="photo-meta">
                  <div className="photo-name">Rashid Irfan KC</div>
                  <div className="photo-role">Digital Marketer · Kerala, India</div>
                </div>
              </div>

              {/* RIGHT */}
              <div>
                <div className="reveal">
                  <span className="section-label">My Story</span>
                  <p className="bio-text">Hi — I'm Rashid Irfan KC. I started this journey with one question: why do some businesses get found online and others don't? That curiosity led me deep into SEO, content marketing, social media, and paid advertising.</p>
                  <p className="bio-text">I work with small businesses and founders in Kerala who want to grow their online presence without wasting money on things that don't work. Everything I do is transparent and results-focused.</p>
                </div>
                <div className="info-grid reveal">
                  {[["Location","Kerala, India"],["Availability","Open to Projects"],["Experience","2+ Years"],["Languages","Malayalam, English"],["Focus","Organic Growth"],["Education","Pursuing BBA"]].map(([k,v]) => (
                    <div key={k} className="info-item"><div className="info-key">{k}</div><div className="info-val">{v}</div></div>
                  ))}
                </div>
                <div className="reveal">
                  <span className="section-label">Skills</span>
                  <div className="skills-wrap">
                    {[{s:"Content Writing & Copywriting",l:90},{s:"Search Engine Optimization",l:85},{s:"Social Media Marketing",l:80},{s:"Google Analytics",l:75},{s:"Email Marketing",l:70},{s:"Meta Ads",l:65}].map(item => (
                      <div key={item.s}>
                        <div className="skill-row-head"><span className="skill-name">{item.s}</span><span className="skill-pct">{item.l}%</span></div>
                        <div className="skill-track"><div className="skill-fill" style={{width:`${item.l}%`}} /></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="reveal" style={{marginTop:"40px"}}>
                  <span className="section-label">Journey</span>
                  <div className="timeline">
                    {[
                      {date:"2024 – Present",title:"Freelance Digital Marketer",org:"Self-employed · Remote",desc:"Working with Kerala-based SMBs on SEO, content strategy, and social media growth."},
                      {date:"2023",title:"Digital Marketing Intern",org:"Local Agency · Kerala",desc:"Assisted with SEO audits, social media content calendars, and Google Ads campaigns."},
                      {date:"2022",title:"Started Learning",org:"Self-taught",desc:"Completed multiple online certifications in SEO, content marketing, and analytics."},
                      {date:"2021",title:"Started BBA",org:"College · Kerala",desc:"Began formal education in business administration with a focus on marketing."},
                    ].map((item,i) => (
                      <div key={i} className="tl-item">
                        <span className="tl-dot" />
                        <div className="tl-date">{item.date}</div>
                        <div className="tl-title">{item.title}</div>
                        <div className="tl-org">{item.org}</div>
                        <div className="tl-desc">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="hr" />

        {/* ════ CERTIFICATE GALLERY ════ */}
        <section className="cert-section">
          <div className="cert-inner">

            <div className="reveal">
              <span className="section-label">Certifications</span>
              <h2 className="section-heading">Credentials & certificates</h2>
            </div>

            <div className="cert-topbar reveal">
              <div className="cert-filters">
                {CATEGORIES.map(cat => (
                  <button key={cat} className={`flt-btn ${activeFilter === cat ? "active" : ""}`} onClick={() => setActiveFilter(cat)}>{cat}</button>
                ))}
              </div>
              <span className="cert-tally">{filtered.length} certificate{filtered.length !== 1 ? "s" : ""}</span>
            </div>

            {/* THUMBNAIL GRID */}
            <div className="cert-gallery">
              {filtered.map((cert, i) => {
                const color = CAT_COLOR[cert.category] || "#9ffb2b";
                return (
                  <div
                    key={cert.id}
                    className="cert-thumb reveal"
                    style={{transitionDelay:`${i * 0.07}s`}}
                    onClick={() => { setImgLoaded(false); setLightbox(cert.id); }}
                  >
                    <div className="thumb-img-wrap">
                      <img src={cert.image} alt={cert.title} loading="lazy" />
                      <div className="thumb-overlay">
                        <div className="thumb-zoom">
                          {/* expand icon */}
                          <svg viewBox="0 0 18 18" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round">
                            <path d="M11 2h5v5M7 16H2v-5M16 2l-6 6M2 16l6-6"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="thumb-accent" style={{background: color}} />
                    <div className="thumb-meta">
                      <span className="thumb-cat" style={{background:`${color}15`,color,border:`1px solid ${color}28`}}>{cert.category}</span>
                      <div className="thumb-title">{cert.title}</div>
                      <div className="thumb-issuer-date">
                        <span className="thumb-issuer">{cert.issuer}</span>
                        <span className="thumb-date">{cert.date}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        <hr className="hr" />

        {/* CTA */}
        <section className="section" style={{paddingTop:"72px",paddingBottom:"72px"}}>
          <div className="section-inner" style={{textAlign:"center"}}>
            <h2 className="reveal" style={{fontSize:"1.8rem",fontWeight:700,color:"#fff",marginBottom:"14px",letterSpacing:"-0.01em"}}>Want to work together?</h2>
            <p className="reveal" style={{color:"var(--muted)",fontSize:"15px",marginBottom:"32px"}}>I'm open to new projects — let's talk.</p>
            <div className="reveal"><a href="/#contact" className="btn-primary">Get In Touch →</a></div>
          </div>
        </section>

      </main>

      <hr className="hr" />
      <footer>
        <div className="footer">
          <span className="footer-logo">Rashid<span>.</span>KC</span>
          <span className="footer-copy">© {new Date().getFullYear()} Rashid Irfan KC. All rights reserved.</span>
          <ul className="footer-links">
            {["Home","Services","Contact"].map(l => (
              <li key={l}><a href={l === "Home" ? "/" : `/#${l.toLowerCase()}`}>{l}</a></li>
            ))}
          </ul>
        </div>
      </footer>

      {/* ════ LIGHTBOX ════ */}
      {lightbox !== null && lbCert && (
        <div className="lb-backdrop" onClick={() => setLightbox(null)}>
          <div className="lb-panel" onClick={e => e.stopPropagation()}>

            {/* close */}
            <button className="lb-close" onClick={() => setLightbox(null)}>×</button>

            {/* prev */}z
            <button className="lb-arrow left" disabled={lbIndex === 0} onClick={prev}>‹</button>

            {/* image */}
            <div className="lb-img-wrap">
              {!imgLoaded && <div className="lb-spinner"><div className="spinner" /></div>}
              <img
                key={lbCert.image}
                src={lbCert.image}
                alt={lbCert.title}
                className={imgLoaded ? "" : "loading"}
                onLoad={() => setImgLoaded(true)}
              />
            </div>

            {/* next */}
            <button className="lb-arrow right" disabled={lbIndex === filtered.length - 1} onClick={next}>›</button>

            {/* meta */}
            <div className="lb-meta">
              <div className="lb-left">
                <div className="lb-title">{lbCert.title}</div>
                <div className="lb-issuer">{lbCert.issuer} · {lbCert.date}</div>
              </div>
              <div className="lb-right">
                <span className="lb-counter">{lbIndex + 1} / {filtered.length}</span>
                {lbCert.link !== "#" && (
                  <a href={lbCert.link} target="_blank" rel="noopener noreferrer" className="lb-link">
                    View Credential
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H5M10 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}