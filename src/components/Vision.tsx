import { motion, useScroll, useTransform } from "motion/react";
import React, { useRef } from "react";

const visionStatements = [
  "Build a fully AI-powered PC assistant",
  "Create AI agents that build other AI agents",
  "Launch useful AI tools and software",
  "Build a respected tech brand",
  "Create financial success through innovation",
  "Support family through technology"
];

interface VisionItemProps {
  statement: string;
  index: number;
  key?: React.Key;
}

function VisionItem({ statement, index }: VisionItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [45, 0, -45]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [-200, 0, -200]);

  return (
    <motion.div 
      ref={itemRef}
      style={{ 
        scale, 
        rotateX, 
        opacity,
        z,
        perspective: "1000px"
      }}
      className="vision-item flex flex-col items-center py-12"
    >
      <motion.div 
        className="text-text-main/5 text-7xl md:text-9xl font-display font-black mb-[-0.6em] select-none"
      >
        0{index + 1}
      </motion.div>
      <h3 className="text-3xl md:text-5xl font-display font-medium text-text-main relative z-10 max-w-2xl text-center px-4 leading-tight">
        {statement}
      </h3>
      <motion.div 
        animate={{ width: [0, 100, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="h-[1px] bg-brand-purple/40 mt-12" 
      />
    </motion.div>
  );
}

export default function Vision() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="vision" ref={containerRef} className="py-32 relative min-h-screen flex items-center bg-charcoal overflow-hidden">
      {/* Background Vision */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-charcoal via-charcoal/80 to-charcoal" />
        <img 
          src="https://picsum.photos/seed/vision-deep/1920/1080?grayscale&blur=10" 
          alt="Vision Art"
          className="w-full h-full object-cover opacity-10"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-40"
        >
          <div className="inline-block px-4 py-1.5 rounded-full liquid-glass text-xs uppercase tracking-widest text-brand-purple mb-8">
            The Roadmap
          </div>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-text-main line-height-tight">
            Building Toward <br />
            <span className="text-gradient">A Defined Future.</span>
          </h2>
        </motion.div>

        <div className="space-y-32 perspective-1000">
          {visionStatements.map((statement, idx) => (
            <VisionItem key={idx} statement={statement} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
