import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import React from "react";

function Word({ children, progress, range }: { children: string; progress: any; range: [number, number]; key?: React.Key }) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <span className="relative mr-3 lg:mr-4">
      <span className="absolute opacity-10">{children}</span>
      <motion.span style={{ opacity }}>
        {children}
      </motion.span>
    </span>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "start 0.2"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  const mainText = "I build AI agents using AI agents. I’m a gamer and a creative developer exploring automation, AI systems, and future technology.";
  const words = mainText.split(" ");

  return (
    <section id="about" ref={containerRef} className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full glass-panel text-xs uppercase tracking-widest text-brand-blue mb-8">
              Digital Identity
            </div>
            
            <div className="text-3xl md:text-5xl font-display leading-tight text-text-main mb-12 flex flex-wrap">
              {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                return (
                  <Word key={i} progress={smoothProgress} range={[start, end]}>
                    {word}
                  </Word>
                );
              })}
            </div>
            
            <div className="space-y-6 text-text-muted text-lg font-light max-w-lg">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                My long-term vision is to build an AI assistant that can control a PC, 
                help with daily tasks, and evolve into a real digital companion.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                I enjoy learning, experimenting, and turning ideas into real products. 
                Quietly building tools that push the boundaries of what's possible with automation.
              </motion.p>
            </div>
          </div>
          
          <motion.div 
            style={{ y: imageY, rotate: imageRotate }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-square glass-panel rounded-3xl p-2 relative overflow-hidden group border border-text-main/5">
              <img 
                src="https://picsum.photos/seed/tech-aura/1000/1000?grayscale" 
                alt="AI Concept" 
                className="w-full h-full object-cover rounded-2xl opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-charcoal/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="glass-panel p-6 rounded-2xl border border-text-main/5">
                  <div className="text-2xl font-display mb-1 text-text-main">2026</div>
                  <div className="text-sm text-text-muted uppercase tracking-widest">Building Frontier</div>
                </div>
              </div>
            </div>
            
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-10 -right-10 w-48 h-48 bg-brand-blue/20 blur-[80px]" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
