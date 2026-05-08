import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="blob absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px]" />
        <div className="blob absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <motion.div 
        style={{ y: y1, opacity }}
        className="container mx-auto px-6 relative z-10 text-center"
      >
        <div className="overflow-hidden mb-4">
          <h2 className="hero-line text-sm uppercase tracking-[0.4em] text-text-muted font-medium">
            Building with Intelligence
          </h2>
        </div>
        
        <div className="overflow-hidden mb-8">
          <h1 
            ref={textRef}
            className="hero-line text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9]"
          >
            Quietly Building <br />
            <span className="text-gradient">The Future.</span>
          </h1>
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
          <button className="px-8 py-4 bg-text-main text-charcoal rounded-full font-bold text-lg hover:bg-brand-blue hover:text-white transition-all duration-500 hover:scale-105 active:scale-95 group">
            Explore Vision
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <button className="px-8 py-4 glass-panel rounded-full font-medium text-lg hover:bg-text-main/10 transition-all duration-300">
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
