import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useAudio } from "../context/SoundContext";

const milestones = [
  {
    year: "2023",
    title: "The Genesis",
    desc: "Started exploring the intersection of creative coding and machine learning.",
    icon: "✦"
  },
  {
    year: "2024",
    title: "Agency Rise",
    desc: "First successful deployment of autonomous task-solving agents.",
    icon: "◈"
  },
  {
    year: "2025",
    title: "Liquid Era",
    desc: "Focusing on adaptive UI that responds to user intent in real-time.",
    icon: "◎"
  },
  {
    year: "2026",
    title: "Singularity",
    desc: "Achieving seamless human-AI collaboration in the creative stack.",
    icon: "▣"
  }
];

export default function Timeline() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { playClick } = useAudio();
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-charcoal/50">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute top-20 left-6 md:left-20 z-10">
          <div className="reveal-down">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-text-main opacity-20">JOURNEY</h2>
          </div>
          <p className="text-brand-blue uppercase tracking-[0.4em] text-xs font-bold mt-2">Horizontal Shift Active</p>
        </div>

        <motion.div style={{ x }} className="flex gap-12 px-6 md:px-20 items-center">
          {milestones.map((item, index) => (
            <motion.div 
              key={index}
              onClick={playClick}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              className="relative w-[85vw] md:w-[40vw] flex-shrink-0 p-12 liquid-glass border border-text-main/5 hover:border-brand-blue/30 transition-colors duration-500 group cursor-pointer"
            >
              <div className="text-sm font-mono text-brand-blue mb-4 tracking-widest">{item.year}</div>
              <div className="text-6xl mb-8 group-hover:scale-110 transition-transform duration-500 origin-left opacity-40">{item.icon}</div>
              <h3 className="text-4xl font-display font-bold mb-4 text-text-main group-hover:text-brand-blue transition-colors duration-500">
                {item.title}
              </h3>
              <p className="text-text-muted text-lg leading-relaxed max-w-sm">
                {item.desc}
              </p>
              
              {/* Connector Line */}
              <div className="absolute top-1/2 -right-12 w-12 h-[1px] bg-text-main/10 hidden md:block" />
            </motion.div>
          ))}
          
          {/* Final Message */}
          <div className="w-[85vw] md:w-[40vw] flex-shrink-0 flex items-center justify-center">
             <div className="text-center">
                <h3 className="text-3xl font-display italic text-text-muted">Continuum...</h3>
                <div className="w-12 h-[1px] bg-brand-blue mx-auto mt-4" />
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
