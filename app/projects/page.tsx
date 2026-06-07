'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

interface SlideItem {
  id: number;
  image: string;
  text: string;
}

const slides: SlideItem[] = [
  { id: 1, image: '/projects/1.png', text: 'Project 1' },
  { id: 2, image: '/projects/2.png', text: 'Project 2' },
  { id: 3, image: '/projects/3.png', text: 'Project 3' },
  { id: 4, image: '/projects/4.png', text: 'Project 4' },
  { id: 5, image: '/projects/5.png', text: 'Project 5' },
  { id: 6, image: '/projects/6.png', text: 'Project 6' },
  { id: 7, image: '/projects/7.png', text: 'Project 7' },
  { id: 8, image: '/projects/8.png', text: 'Project 8' },
  { id: 9, image: '/projects/9.png', text: 'Project 9' },
  { id: 10, image: '/projects/10.png', text: 'Project 10' },
  { id: 11, image: '/projects/11.png', text: 'Project 11' },
  { id: 12, image: '/projects/12.png', text: 'Project 12' },
  { id: 13, image: '/projects/13.png', text: 'Project 13' },
  { id: 14, image: '/projects/14.png', text: 'Project 14' }
];

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000); 

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleDragEnd = (_event: any, info: PanInfo) => {
    const swipeThreshold = 40; 
    if (info.offset.x < -swipeThreshold) {
      handleNext(); 
    } else if (info.offset.x > swipeThreshold) {
      handlePrev(); 
    }
  };

  return (
    <div className="relative w-full h-[100dvh] bg-black flex flex-col justify-between items-center text-white overflow-hidden select-none">
      
      {/* ── BACKGROUND IMAGE SHOWCASE ── */}
      <div className="absolute inset-0 w-full h-full z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/50 z-10" />
      </div>

      {/* ── GESTURE DRAG SURFACE LAYER ── */}
      <motion.div 
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing w-full h-full"
      />

      {/* ── TOP DECORATION HEADER ── */}
      <header className="z-30 w-full max-w-6xl px-4 sm:px-6 pt-6 sm:pt-8 flex justify-between items-center mix-blend-difference">
        <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase opacity-80">
          Project Showcase
        </span>
        
        <div className="flex items-center">
          <div className="sm:hidden text-xs font-mono tracking-widest text-white/80">
            {String(currentIndex + 1).padStart(2, '0')} <span className="text-white/40">/</span> {String(slides.length).padStart(2, '0')}
          </div>
          
          <div className="hidden sm:flex gap-1.5">
            {slides.map((_, index) => (
              <div 
                key={index} 
                className={`h-0.5 rounded transition-all duration-300 ${
                  index === currentIndex ? 'bg-white w-8' : 'bg-white/20 w-4'
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* ── CENTER TITLE DISPLAY ── */}
      <div className="z-30 text-center px-4 max-w-3xl pointer-events-none mt-12">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentIndex}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase leading-tight text-white drop-shadow-xl"
          >
            {slides[currentIndex].text}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* ── BOTTOM VIEW NAVIGATION ACTIONS ── */}
      {/* pb-28 lifts the action container safely above your sticky mobile bottom nav */}
      <div className="z-30 w-full max-w-md px-4 sm:px-6 pb-28 sm:pb-16 flex justify-between gap-3">
        <button
          onClick={handlePrev}
          className="flex-1 py-3 px-4 rounded-xl border border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black hover:border-white transition-all duration-200 active:scale-95 text-xs font-bold tracking-widest uppercase"
        >
          PREV
        </button>
        <button
          onClick={handleNext}
          className="flex-1 py-3 px-4 rounded-xl bg-[#9ffb2b] text-black hover:bg-white transition-all duration-200 active:scale-95 text-xs font-bold tracking-widest uppercase"
        >
          NEXT
        </button>
      </div>

    </div>
  );
}