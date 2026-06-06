'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

// Explicitly type the slide structure for your build system
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
    }, 4000); 

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  // Fixed TypeScript implicit 'any' error by typing parameters explicitly
  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 50; 
    if (info.offset.x < -swipeThreshold) {
      handleNext(); 
    } else if (info.offset.x > swipeThreshold) {
      handlePrev(); 
    }
  };

  return (
    <div className="relative w-full h-screen bg-black flex flex-col justify-between items-center text-white overflow-hidden select-none">
      
      {/* BACKGROUND IMAGE WITH SMOOTH TRANSITION */}
    
        <div className="absolute inset-0 w-full h-full  z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>
      
     

      {/* TOP DECORATION / HEADER */}
      <div className="z-20 w-full max-w-6xl px-6 pt-8 flex justify-between items-center">
        <span className="text-sm font-semibold tracking-wider uppercase opacity-70">
          Project Showcase
        </span>
        <div className="flex gap-1">
          {slides.map((_, index) => (
            <div 
              key={index} 
              className={`h-1 w-8 rounded transition-all duration-300 ${index === currentIndex ? 'bg-white w-12' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </div>

      {/* CENTER SINGLE LINE OF TEXT */}
      <div className="z-20 text-center px-6 max-w-4xl">
        <AnimatePresence mode="wait">
          {slides[currentIndex].text && (
            <motion.h1
              key={currentIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-3xl font-medium tracking-wide drop-shadow-lg"
            >
              {slides[currentIndex].text}
            </motion.h1>
          )}
        </AnimatePresence>
      </div>

      {/* BOTTOM NAVIGATION BUTTONS */}
      <div className="z-20 w-full max-w-md px-6 pb-12 flex justify-between gap-4">
        <button
          onClick={handlePrev}
          className="flex-1 py-3 px-6 rounded-full border border-white/30 bg-black/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300 active:scale-95 text-sm font-semibold tracking-wider"
        >
          PREVIOUS
        </button>
        <button
          onClick={handleNext}
          className="flex-1 py-3 px-6 rounded-full bg-white text-black hover:bg-white/80 transition-all duration-300 active:scale-95 text-sm font-semibold tracking-wider"
        >
          NEXT PROJECT
        </button>
      </div>

    </div>
  );
}