"use client";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 320);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --green: #9ffb2b;
          --green-soft: rgba(159,251,43,0.1);
          --green-border: rgba(159,251,43,0.18);
          --bg: #0a0a0a;
          --card: #111111;
          --border: rgba(255,255,255,0.07);
          --text: #f2f2f2;
          --muted: #666;
          --subtle: #333;
        }

        html { scroll-behavior: smooth; }
        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        /* ── NAV ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: 64px; display: flex; align-items: center; padding: 0 48px;
        }
        .nav.scrolled {
          background: rgba(10,10,10,0.92);
          backdrop-filter: blur(12px);
          box-shadow: 0 18px 60px rgba(0,0,0,0.25);
        }
        .nav-inner {
          max-width: 1100px; margin: 0 auto; width: 100%;
          display: flex; align-items: center; justify-content: space-between;
        }
        .logo {
          font-size: 15px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: #fff;
        }
        .logo span { color: var(--green); }
        .nav-links { display: flex; gap: 36px; list-style: none; }
        .nav-links a {
          font-size: 12px; font-weight: 500; letter-spacing: 0.06em;
          color: var(--muted); text-decoration: none; transition: color 0.2s;
        }
        .nav-links a:hover { color: #fff; }
        .btn-hire {
          padding: 8px 20px; border-radius: 999px;
          background: rgba(159,251,43,0.16);
          color: var(--green);
          font-size: 12px; font-weight: 600; letter-spacing: 0.06em;
          text-decoration: none; transition: background 0.2s, color 0.2s, transform 0.2s;
        }
        .btn-hire:hover { transform: translateY(-1px); background: var(--green); color: #000; }

        /* ── ENTRY ANIMATIONS ── */
        .fade-up {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.show { opacity: 1; transform: translateY(0); }
        .d1 { transition-delay: 0.1s; }
        .d2 { transition-delay: 0.22s; }
        .d3 { transition-delay: 0.34s; }
        .d4 { transition-delay: 0.46s; }
        .d5 { transition-delay: 0.58s; }

        /* ── SCROLL REVEAL ── */
        .reveal {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        /* ── HERO ── */
        .hero {
          min-height: 100vh; display: flex; align-items: center;
          padding-top: 64px;
        }
        .hero-inner {
          max-width: 1100px; margin: 0 auto;
          padding: 80px 48px; width: 100%;
          background: transparent;
          border-radius: 40px;
          box-shadow: none;
        }
        .hero-layout {
          display: grid; grid-template-columns: 1fr 380px;
          gap: 80px; align-items: center;
        }

        /* LEFT TEXT */
        .eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--green);
          margin-bottom: 28px;
        }
        .eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--green); animation: blink 2s infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .hero-heading {
          font-size: clamp(2.8rem, 5.5vw, 5rem);
          font-weight: 700; line-height: 1.08; letter-spacing: -0.02em;
          color: #fff; margin-bottom: 24px;
        }
        .hero-heading .green { color: var(--green); }

        .hero-sub {
          font-size: 16px; color: var(--muted); line-height: 1.8;
          font-weight: 400; max-width: 440px; margin-bottom: 40px;
        }
        .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 12px 26px; border-radius: 6px;
          background: var(--green); color: #000;
          font-size: 13px; font-weight: 600; letter-spacing: 0.04em;
          text-decoration: none; transition: opacity 0.2s, transform 0.15s;
        }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn-outline {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 12px 26px; border-radius: 999px;
          background: rgba(255,255,255,0.08);
          color: #ddd;
          font-size: 13px; font-weight: 500; letter-spacing: 0.04em;
          text-decoration: none; transition: background 0.2s, color 0.2s, transform 0.2s;
        }
        .btn-outline:hover { background: rgba(255,255,255,0.12); color: #fff; transform: translateY(-1px); }

        /* RIGHT — PHOTO */
        .photo-col { display: flex; flex-direction: column; gap: 0; }
        .photo-wrap {
          position: relative; overflow: hidden;
          aspect-ratio: 3 / 4;
          border-radius: 40px;
          background: transparent;
          border: none;
          box-shadow: 0 28px 70px rgba(0,0,0,0.20);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .photo-wrap img {
          position: relative; z-index: 2;
          width: 100%; height: 100%; object-fit: cover; display: block;
          filter: none;
          opacity: 1;
          transition: transform 0.45s ease, box-shadow 0.45s ease;
          border-radius: 40px;
        }
        .photo-wrap:hover {
          transform: translateY(-4px);
          box-shadow: 0 50px 130px rgba(0,0,0,0.34);
        }
        .photo-wrap:hover img {
          transform: scale(1.03);
          box-shadow: 0 18px 45px rgba(0,0,0,0.25);
        }
        .photo-placeholder {
          width: 100%; height: 100%; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 14px;
          color: var(--subtle); text-align: center; padding: 32px;
          min-height: 340px;
        }
        .photo-placeholder svg { opacity: 0.25; }
        .photo-placeholder p {
          font-size: 12px; color: var(--subtle); line-height: 1.6;
        }
        .photo-placeholder code { color: var(--green); font-size: 11px; }
        .photo-name-tag {
          margin-top: 14px; font-size: 13px; font-weight: 600; color: #888;
          letter-spacing: 0.06em;
        }
        .photo-name-tag span { color: var(--green); }

        /* ── SECTION ── */
        .section {
          padding: 100px 48px;
          background: rgba(255,255,255,0.02);
          border-radius: 40px;
          box-shadow: 0 35px 100px rgba(0,0,0,0.17);
        }
        .section-inner { max-width: 1100px; margin: 0 auto; }
        .section-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--green);
          display: block; margin-bottom: 12px;
        }
        .section-heading {
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 700; color: #fff; line-height: 1.15;
          letter-spacing: -0.01em; margin-bottom: 48px;
        }

        /* ── ABOUT ── */
        .about-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 72px; align-items: start;
        }
        .about-text {
          font-size: 15px; color: #888; line-height: 1.85;
          font-weight: 400; margin-bottom: 16px;
        }
        .info-row {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px; margin-top: 32px;
        }
        .info-item {
          padding: 20px; border-radius: 28px;
          background: rgba(255,255,255,0.08);
          border: none;
          backdrop-filter: blur(16px);
          box-shadow: 0 28px 70px rgba(0,0,0,0.16);
        }
        .info-key {
          font-size: 10px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--muted); margin-bottom: 5px;
        }
        .info-val { font-size: 14px; font-weight: 600; color: #ddd; }

        .skills-wrap { display: flex; flex-direction: column; gap: 20px; margin-top: 4px; }
        .skill-item {}
        .skill-row { display: flex; justify-content: space-between; margin-bottom: 7px; }
        .skill-name { font-size: 13px; color: #bbb; font-weight: 500; }
        .skill-pct { font-size: 12px; color: var(--green); font-weight: 600; }
        .skill-track {
          height: 2px; border-radius: 1px;
          background: rgba(255,255,255,0.06); overflow: hidden;
        }
        .skill-fill { height: 100%; background: var(--green); border-radius: 1px; }

        /* ── SERVICES ── */
        .services-top {
          display: flex; justify-content: space-between;
          align-items: flex-end; flex-wrap: wrap; gap: 16px; margin-bottom: 40px;
        }
        .services-note { font-size: 13px; color: var(--muted); max-width: 260px; line-height: 1.6; }
        .services-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
        }
        .svc-card {
          padding: 28px; border-radius: 30px;
          background: rgba(255,255,255,0.06);
          border: none;
          backdrop-filter: blur(20px);
          box-shadow: 0 24px 72px rgba(0,0,0,0.18);
          position: relative; transition: transform 0.25s, background 0.25s;
        }
        .svc-card:hover { transform: translateY(-3px); background: rgba(255,255,255,0.08); }
        .svc-badge {
          position: absolute; top: 18px; right: 18px;
          padding: 3px 10px; border-radius: 4px;
          background: var(--green); color: #000;
          font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
        }
        .svc-num {
          font-size: 11px; color: var(--muted); font-weight: 600;
          letter-spacing: 0.1em; margin-bottom: 14px; display: block;
        }
        .svc-title { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 10px; line-height: 1.3; }
        .svc-desc { font-size: 13px; color: var(--muted); line-height: 1.7; margin-bottom: 20px; }
        .svc-list { list-style: none; padding-top: 16px; display: flex; flex-direction: column; gap: 7px; }
        .svc-li { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #888; }
        .svc-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--green); flex-shrink: 0; }

        /* ── WORK ── */
        .work-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
        }
        .work-card {
          padding: 26px; border-radius: 30px;
          background: rgba(255,255,255,0.06);
          border: none;
          backdrop-filter: blur(20px);
          box-shadow: 0 24px 72px rgba(0,0,0,0.18);
          transition: transform 0.25s, background 0.25s;
        }
        .work-card:hover { transform: translateY(-3px); background: rgba(255,255,255,0.08); }
        .work-cat {
          font-size: 10px; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--green); display: block; margin-bottom: 10px;
        }
        .work-title { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 8px; line-height: 1.3; }
        .work-result { font-size: 13px; color: #999; margin-bottom: 16px; }
        .work-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .work-tag {
          padding: 4px 10px; border-radius: 4px;
          background: rgba(255,255,255,0.04); font-size: 11px; color: #666;
        }

        /* ── PROCESS ── */
        .process-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
        }
        .process-card {
          padding: 28px; border-radius: 30px;
          background: rgba(255,255,255,0.06);
          border: none;
          backdrop-filter: blur(20px);
          box-shadow: 0 24px 72px rgba(0,0,0,0.18);
          transition: transform 0.25s, background 0.25s;
        }
        .process-card:hover { transform: translateY(-2px); background: rgba(255,255,255,0.08); }
        .process-step {
          display: inline-flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 8px;
          background: var(--green); color: #000;
          font-size: 12px; font-weight: 700; margin-bottom: 20px;
        }
        .process-time { font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
        .process-title { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .process-desc { font-size: 13px; color: var(--muted); line-height: 1.65; }

        /* ── WHY ME ── */
        .whyme-layout {
          display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: start;
        }
        .whyme-lead {
          font-size: 15px; color: #888; line-height: 1.8; margin-bottom: 32px;
        }
        .why-cards { display: flex; flex-direction: column; gap: 10px; }
        .why-card {
          display: flex; align-items: flex-start; gap: 16px;
          padding: 24px 26px; border-radius: 30px;
          background: rgba(255,255,255,0.06);
          border: none;
          backdrop-filter: blur(20px);
          box-shadow: 0 24px 72px rgba(0,0,0,0.18);
          transition: transform 0.25s, background 0.25s;
        }
        .why-card:hover { transform: translateY(-2px); background: rgba(255,255,255,0.08); }
        .why-icon { font-size: 20px; flex-shrink: 0; }
        .why-title { font-size: 13px; font-weight: 700; color: #ddd; margin-bottom: 4px; }
        .why-desc { font-size: 12px; color: var(--muted); line-height: 1.6; }

        /* ── TOOLS ── */
        .tools-pills { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 36px; }
        .tool-pill {
          padding: 10px 20px; border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: none;
          font-size: 13px; font-weight: 500; color: var(--muted);
          transition: color 0.25s, background 0.25s, transform 0.25s;
        }
        .tool-pill:hover { color: var(--green); background: rgba(255,255,255,0.12); transform: translateY(-1px); }

        /* ── CONTACT ── */
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; }
        .contact-lead { font-size: 15px; color: #888; line-height: 1.8; margin-bottom: 36px; }
        .contact-items { display: flex; flex-direction: column; gap: 18px; }
        .contact-item { display: flex; align-items: center; gap: 14px; }
        .contact-icon {
          width: 42px; height: 42px; border-radius: 16px;
          background: rgba(159,251,43,0.12);
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; flex-shrink: 0;
        }
        .contact-key { font-size: 10px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-bottom: 3px; }
        .contact-val { font-size: 14px; font-weight: 600; color: #ddd; text-decoration: none; transition: color 0.2s; }
        .contact-val:hover { color: var(--green); }

        .form-box {
          padding: 38px; border-radius: 34px;
          background: rgba(255,255,255,0.08);
          border: none;
          backdrop-filter: blur(20px);
          box-shadow: 0 24px 70px rgba(0,0,0,0.18);
        }
        .form-title { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 24px; }
        .form-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .fg { display: flex; flex-direction: column; gap: 7px; margin-bottom: 14px; }
        .fl { font-size: 10px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
        .fi, .fs, .ft {
          padding: 12px 14px; border-radius: 18px;
          border: none; background: rgba(255,255,255,0.06);
          color: #ddd; font-size: 13px; font-family: 'Inter', sans-serif;
          outline: none; width: 100%; transition: box-shadow 0.2s, background 0.2s;
        }
        .fi::placeholder, .ft::placeholder { color: #aaa; }
        .fi:focus, .fs:focus, .ft:focus {
          box-shadow: 0 0 0 1px rgba(159,251,43,0.22);
          background: rgba(255,255,255,0.08);
        }
        .fs { color: #777; }
        .ft { resize: none; }
        .btn-send {
          width: 100%; padding: 14px; border-radius: 8px;
          background: var(--green); color: #000; border: none;
          font-size: 13px; font-weight: 700; letter-spacing: 0.06em;
          cursor: pointer; transition: opacity 0.2s, transform 0.15s;
          margin-top: 4px;
        }
        .btn-send:hover { opacity: 0.88; transform: translateY(-1px); }

        /* ── DIVIDER LINE ── */
        .hr { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 0; }

        /* ── FOOTER ── */
        .footer {
          padding: 28px 48px; display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 14px;
          max-width: 1100px; margin: 0 auto;
        }
        .footer-logo { font-size: 14px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #fff; }
        .footer-logo span { color: var(--green); }
        .footer-copy { font-size: 12px; color: var(--muted); }
        .footer-links { display: flex; gap: 24px; list-style: none; }
        .footer-links a { font-size: 12px; color: var(--muted); text-decoration: none; letter-spacing: 0.06em; transition: color 0.2s; }
        .footer-links a:hover { color: #fff; }

        @media (max-width: 960px) {
          .hero-layout, .about-grid, .whyme-layout, .contact-grid { grid-template-columns: 1fr; gap: 48px; }
          .services-grid, .work-grid { grid-template-columns: 1fr 1fr; }
          .process-grid { grid-template-columns: 1fr 1fr; }
          .section { padding: 72px 24px; }
          .nav, .footer { padding-left: 24px; padding-right: 24px; }
          .hero-inner { padding: 60px 24px; }
          .nav-links, .btn-hire { display: none; }
          .photo-wrap { max-height: 300px; }
        }
        @media (max-width: 600px) {
          .services-grid, .work-grid, .process-grid { grid-template-columns: 1fr; }
          .form-row2 { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── NAV ── */}
      <header className={`nav ${scrollY > 40 ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <span className="logo">Rashid<span>.</span>KC</span>
          <nav><ul className="nav-links">
            {["About","Services","Work","Process","Contact"].map(l => (
              <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
            ))}
          </ul></nav>
          <a href="#contact" className="btn-hire">Hire Me</a>
        </div>
      </header>

      <main>

        {/* ── HERO ── */}
        <section id="home" className="hero">
          <div className="hero-inner">
            <div className="hero-layout">

              {/* LEFT */}
              <div>
                <div className={`eyebrow fade-up d1 ${loaded ? "show" : ""}`}>
                  <span className="eyebrow-dot" />
                  Digital Marketer · Kerala, India
                </div>

                <h1 className={`hero-heading fade-up d2 ${loaded ? "show" : ""}`}>
                  Hi, I&apos;m<br />
                  Rashid Irfan<br />
                  <span className="green">KC</span>
                </h1>

                <p className={`hero-sub fade-up d3 ${loaded ? "show" : ""}`}>
                  I help businesses grow online with SEO, content, and social media strategies that actually work.
                </p>

                <div className={`hero-btns fade-up d4 ${loaded ? "show" : ""}`}>
                  <a href="#contact" className="btn-primary">
                    Work With Me
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 3l5 4-5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                  <a href="#services" className="btn-outline">See Services</a>
                </div>
              </div>

              {/* RIGHT — PHOTO */}
   {/* RIGHT — PHOTO */}
<div className={`photo-col fade-up bg-transparent ${loaded ? "show" : ""}`}>
  <div className="photo-wrap w-full max-w-sm mx-auto p-0 bg-transparent border-0 shadow-none rounded-none overflow-visible">
    
    {/* Raw profile asset with all bounding boxes completely stripped */}
    <img 
      src="/photo.png" 
      alt="Rashid Irfan KC" 
      className="w-full h-auto object-contain block mix-blend-normal transform transition-transform duration-500 hover:scale-[1.02]"
    />
    
  </div>
  <p className="photo-name-tag text-center mt-4 text-xs tracking-widest uppercase font-semibold text-neutral-400">
    Rashid Irfan KC — <span className="text-[#89fb2b]">Digital Marketer</span>
  </p>
</div>


            </div>
          </div>
        </section>

        <hr className="hr" />

        {/* ── ABOUT ── */}
        <section id="about" className="section">
          <div className="section-inner">
            <span className="section-label reveal">About Me</span>
            <h2 className="section-heading reveal">A marketer who gets<br />real results</h2>
            <div className="about-grid">
              <div className="reveal">
                <p className="about-text">
                  Hi, I&apos;m Rashid Irfan KC — a digital marketing student from Kerala, India. I combine data, creativity, and strategy to help businesses attract more customers and grow online.
                </p>
                <p className="about-text">
                  My focus is on organic growth — SEO, content, and social media that bring lasting results, not just quick spikes.
                </p>
                <div className="info-row">
                  {[["Location","Kerala, India"],["Availability","Open to Projects"],["Focus","Organic Growth"]].map(([k,v]) => (
                    <div key={k} className="info-item">
                      <div className="info-key">{k}</div>
                      <div className="info-val">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="reveal">
                <div className="skills-wrap">
                  {[
                    {skill:"Content Writing & Copywriting", level:90},
                    {skill:"Search Engine Optimization",    level:85},
                    {skill:"Social Media Marketing",        level:80},
                    {skill:"Google Analytics & Reporting",  level:75},
                    {skill:"Email Marketing",               level:70},
                    {skill:"Paid Advertising (Meta Ads)",   level:65},
                  ].map(item => (
                    <div key={item.skill} className="skill-item">
                      <div className="skill-row">
                        <span className="skill-name">{item.skill}</span>
                        <span className="skill-pct">{item.level}%</span>
                      </div>
                      <div className="skill-track">
                        <div className="skill-fill" style={{width:`${item.level}%`}} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="hr" />

        {/* ── SERVICES ── */}
        <section id="services" className="section">
          <div className="section-inner">
            <div className="services-top">
              <div className="reveal">
                <span className="section-label">Services</span>
                <h2 className="section-heading" style={{marginBottom:0}}>What I do for<br />your business</h2>
              </div>
              <p className="services-note reveal">Tailored to your goals — no guesswork, just measurable results.</p>
            </div>
            <div className="services-grid">
              {[
                {num:"01",title:"Search Engine Optimization",desc:"Get found on Google by people searching for your services — from keyword research to technical fixes.",features:["Technical SEO audit","Keyword strategy","On-page optimization","Local SEO"],tag:"Popular"},
                {num:"02",title:"Social Media Marketing",desc:"Build presence on Instagram, Facebook & LinkedIn with content plans and targeted ad campaigns.",features:["Content calendar","Audience targeting","Paid ad campaigns","Monthly reports"],tag:""},
                {num:"03",title:"Content Marketing",desc:"Blog posts, website copy, and social content that connects with your audience and drives action.",features:["Blog writing","Website copywriting","Email newsletters","Video scripts"],tag:""},
                {num:"04",title:"Google Ads Management",desc:"Show your business at the top of Google. Quality leads at a low cost per click.",features:["Campaign setup","Ad copywriting","Bid management","Performance tracking"],tag:""},
                {num:"05",title:"Email Marketing",desc:"Automated email sequences and newsletters that keep your audience engaged and buying.",features:["List building","Automation flows","Newsletter design","Open rate optimization"],tag:""},
                {num:"06",title:"Marketing Consultation",desc:"1-on-1 session to review your strategy and build a clear, actionable growth roadmap.",features:["Competitor analysis","Strategy roadmap","Tool recommendations","Q&A session"],tag:"New"},
              ].map((svc,i) => (
                <div key={svc.num} className="svc-card reveal" style={{transitionDelay:`${i*0.07}s`}}>
                  {svc.tag && <span className="svc-badge">{svc.tag}</span>}
                  <span className="svc-num">{svc.num}</span>
                  <div className="svc-title">{svc.title}</div>
                  <p className="svc-desc">{svc.desc}</p>
                  <ul className="svc-list">
                    {svc.features.map(f => (
                      <li key={f} className="svc-li"><span className="svc-dot" />{f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="hr" />

        {/* ── WORK ── */}
        <section id="work" className="section">
          <div className="section-inner">
            <span className="section-label reveal">Portfolio</span>
            <h2 className="section-heading reveal">Recent work</h2>
            <div className="work-grid">
              {[
                {cat:"SEO",title:"Local Restaurant SEO",result:"+180% organic traffic in 3 months",tags:["On-page SEO","Google My Business","Local Keywords"]},
                {cat:"Social Media",title:"Clothing Brand Instagram",result:"0 → 2,400 followers in 60 days",tags:["Instagram","Reels Strategy","Content Calendar"]},
                {cat:"Content",title:"EdTech Blog Strategy",result:"12 articles · 5,000 monthly readers",tags:["Blog Writing","Keyword Research","SEO"]},
                {cat:"Email",title:"E-commerce Email Campaign",result:"38% open rate · 12% click-through",tags:["Mailchimp","Segmentation","Automation"]},
                {cat:"Ads",title:"Real Estate Google Ads",result:"₹15 cost-per-lead · 22 leads/month",tags:["Google Ads","Search Campaigns","Landing Page"]},
                {cat:"Strategy",title:"Coaching Business Launch",result:"Full strategy · 3 clients in week 1",tags:["Brand Voice","Multi-channel","Content Plan"]},
              ].map((p,i) => (
                <div key={p.title} className="work-card reveal" style={{transitionDelay:`${i*0.07}s`}}>
                  <span className="work-cat">{p.cat}</span>
                  <div className="work-title">{p.title}</div>
                  <p className="work-result">{p.result}</p>
                  <div className="work-tags">
                    {p.tags.map(t => <span key={t} className="work-tag">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="hr" />

        {/* ── PROCESS ── */}
        <section id="process" className="section">
          <div className="section-inner">
            <span className="section-label reveal">Process</span>
            <h2 className="section-heading reveal">How we work together</h2>
            <div className="process-grid">
              {[
                {step:"01",title:"Discovery Call",desc:"Free 30-min call to understand your business, goals, and current marketing situation.",time:"Week 1"},
                {step:"02",title:"Strategy & Plan",desc:"Custom marketing plan with clear goals, timelines, and the right channels for your business.",time:"Week 1–2"},
                {step:"03",title:"Execution",desc:"Launch SEO, ads, content, and social media — with full transparency throughout.",time:"Week 2–4"},
                {step:"04",title:"Review & Scale",desc:"Weekly analytics, shared reports, and ongoing improvements so results keep growing.",time:"Ongoing"},
              ].map((item,i) => (
                <div key={item.step} className="process-card reveal" style={{transitionDelay:`${i*0.1}s`}}>
                  <div className="process-step">{item.step}</div>
                  <div className="process-time">{item.time}</div>
                  <div className="process-title">{item.title}</div>
                  <p className="process-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="hr" />

        {/* ── WHY ME ── */}
        <section className="section">
          <div className="section-inner">
            <div className="whyme-layout">
              <div className="reveal">
                <span className="section-label">Why Work With Me?</span>
                <h2 className="section-heading">Simple. Honest.<br />Results-focused.</h2>
                <p className="whyme-lead">
                  No jargon. No inflated charges. I communicate clearly and focus on what actually moves the needle for your business.
                </p>
                <a href="#contact" className="btn-primary">Start a Conversation →</a>
              </div>
              <div className="why-cards reveal">
                {[
                  {icon:"📊",title:"Data-Driven Decisions",desc:"Every strategy is backed by analytics. I track what works and cut what doesn't."},
                  {icon:"🤝",title:"Clear Communication",desc:"Weekly updates, simple reports, always available to answer questions."},
                  {icon:"💡",title:"Fresh Perspective",desc:"I bring the latest strategies and tools — no outdated thinking."},
                  {icon:"🎯",title:"Focused on Your ROI",desc:"I care about your return on investment, not vanity metrics."},
                ].map(item => (
                  <div key={item.title} className="why-card">
                    <span className="why-icon">{item.icon}</span>
                    <div>
                      <div className="why-title">{item.title}</div>
                      <div className="why-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <hr className="hr" />

        {/* ── TOOLS ── */}
        <section className="section" style={{paddingTop:"72px",paddingBottom:"72px"}}>
          <div className="section-inner" style={{textAlign:"center"}}>
            <span className="section-label reveal">Tools I Use</span>
            <h2 className="section-heading reveal" style={{fontSize:"1.8rem"}}>Platforms & Technologies</h2>
            <div className="tools-pills reveal">
              {["Google Search Console","Google Analytics 4","SEMrush","Ahrefs","Canva","Meta Ads Manager","Google Ads","Mailchimp","Notion","WordPress","HubSpot","Buffer","Zapier"].map(tool => (
                <span key={tool} className="tool-pill">{tool}</span>
              ))}
            </div>
          </div>
        </section>

        <hr className="hr" />

        {/* ── CONTACT ── */}
        <section id="contact" className="section">
          <div className="section-inner">
            <span className="section-label reveal">Get In Touch</span>
            <h2 className="section-heading reveal">Ready to grow<br />your business?</h2>
            <div className="contact-grid">
              <div className="reveal">
                <p className="contact-lead">
                  Whether you have a project in mind or just want to explore — I&apos;d love to hear from you. I reply within 24 hours.
                </p>
                <div className="contact-items">
                  {[
                    {icon:"📧",label:"Email",value:"hello@rashidirfankc.com",href:"mailto:hello@rashidirfankc.com"},
                    {icon:"💬",label:"WhatsApp",value:"+91 98765 43210",href:"https://wa.me/919876543210"},
                    {icon:"📍",label:"Location",value:"Kerala, India · Remote",href:"#"},
                  ].map(item => (
                    <div key={item.label} className="contact-item">
                      <div className="contact-icon">{item.icon}</div>
                      <div>
                        <div className="contact-key">{item.label}</div>
                        <a href={item.href} className="contact-val">{item.value}</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-box reveal">
                <div className="form-title">Send a Message</div>
                <form action="https://formspree.io/f/mojzeayk" method="POST">
                  <div className="form-row2">
                    <div className="fg">
                      <label className="fl" htmlFor="fn">Name</label>
                      <input id="fn" name="name" type="text" placeholder="Your name" required className="fi" />
                    </div>
                    <div className="fg">
                      <label className="fl" htmlFor="fe">Email</label>
                      <input id="fe" name="email" type="email" placeholder="you@email.com" required className="fi" />
                    </div>
                  </div>
                  <div className="fg">
                    <label className="fl" htmlFor="fs2">Service</label>
                    <select id="fs2" name="service" className="fs">
                      <option value="">Select a service</option>
                      <option>Search Engine Optimization</option>
                      <option>Social Media Marketing</option>
                      <option>Content Marketing</option>
                      <option>Google Ads</option>
                      <option>Email Marketing</option>
                      <option>Marketing Consultation</option>
                    </select>
                  </div>
                  <div className="fg">
                    <label className="fl" htmlFor="fm">Message</label>
                    <textarea id="fm" name="message" rows={4} placeholder="Tell me about your business and goals..." required className="ft" />
                  </div>
                  <button type="submit" className="btn-send">Send Message →</button>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>

      <hr className="hr" />

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer">
          <span className="footer-logo">Rashid<span>.</span>KC</span>
          <span className="footer-copy">© {new Date().getFullYear()} Rashid Irfan KC. All rights reserved.</span>
          <ul className="footer-links">
            {["About","Services","Contact"].map(l => (
              <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
            ))}
          </ul>
        </div>
      </footer>

      <ScrollReveal />
    </>
  );
}

function ScrollReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return null;
} 
