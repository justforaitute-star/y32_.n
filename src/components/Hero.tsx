import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useAudio } from "../context/SoundContext";

export default function Hero() {
  const { playClick } = useAudio();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // 3D Tilt Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 30 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.5,
      });

      gsap.to(".blob", {
        x: "random(-50, 50)",
        y: "random(-50, 50)",
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ perspective: "1000px" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="blob absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px]" />
        <div className="blob absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-[120px]" />
        
        {/* Floating Liquid Glass Elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity, 
              delay: i * 2 
            }}
            className="absolute glass-panel rounded-[20%] w-32 h-32 blur-md"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
          />
        ))}

        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <motion.div 
        style={{ 
          y: y1, 
          opacity,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="container mx-auto px-6 relative z-10 text-center"
      >
        <div className="overflow-hidden mb-4">
          <motion.h2 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.5 }}
            className="text-sm uppercase tracking-[0.4em] text-text-muted font-medium"
          >
            Building with Intelligence
          </motion.h2>
        </div>
        
        <div className="overflow-hidden mb-8">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.7 }}
            ref={textRef}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9]"
          >
            Quietly Building <br />
            <span className="text-gradient">The Future.</span>
          </motion.h1>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="max-w-xl mx-auto text-text-muted text-lg md:text-xl font-light mb-12"
        >
          Creating tools that feel natural, intelligent, and useful. 
          An architect exploring the frontier of AI systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={playClick}
            className="px-8 py-4 bg-text-main text-charcoal rounded-full font-bold text-lg hover:bg-brand-blue hover:text-white transition-all duration-500 hover:scale-105 active:scale-95 group"
          >
            Explore Vision
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <button 
            onClick={playClick}
            className="px-8 py-4 glass-panel rounded-full font-medium text-lg hover:bg-text-main/10 transition-all duration-300"
          >
            View Projects
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <div className="w-[1px] h-12 bg-linear-to-b from-text-main to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">Scroll</span>
      </motion.div>
    </section>
  );
}
