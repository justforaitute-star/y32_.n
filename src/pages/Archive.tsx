import { motion, useScroll, useTransform } from "motion/react";
import React, { useRef } from "react";
import { useAudio } from "../context/SoundContext";

const items = [
  { title: "Neural Networks", side: "left", img: "https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=1000" },
  { title: "Quantum Logic", side: "right", img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1000" },
  { title: "Agent Swarms", side: "left", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" },
  { title: "Liquid Reality", side: "right", img: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=1000" },
  { title: "Bio-Sync", side: "left", img: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1000" },
];

interface ArchiveItemProps {
  item: typeof items[0];
  index: number;
  key?: React.Key;
}

function ArchiveItem({ item, index }: ArchiveItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const xValue = item.side === "left" ? [-200, 0, 200] : [200, 0, -200];
  const x = useTransform(scrollYProgress, [0, 0.5, 1], xValue);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -10 : 10, index % 2 === 0 ? 10 : -10]);

  return (
    <div ref={ref} className={`min-h-[80vh] w-full flex items-center justify-center p-6 md:p-24 overflow-hidden`}>
      <motion.div 
        style={{ x, opacity, rotate }}
        className="w-full max-w-5xl grid md:grid-cols-2 items-center gap-12"
      >
        <div className={`relative aspect-square rounded-[40px] overflow-hidden liquid-glass ${item.side === 'right' ? 'md:order-2' : ''}`}>
           <img 
            src={item.img} 
            alt={item.title} 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className={`${item.side === 'right' ? 'text-right' : 'text-left'}`}>
          <motion.span 
            className="text-brand-blue text-sm uppercase tracking-[0.5em] font-semibold mb-4 block"
          >
            Entry {index + 1}
          </motion.span>
          <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter text-text-main leading-none">
            {item.title}
          </h2>
          <div className={`h-[1px] bg-text-main/10 w-full my-8 ${item.side === 'right' ? 'ml-auto' : ''}`} />
          <p className="text-text-muted text-lg max-w-md ml-auto mr-auto md:ml-0 md:mr-0">
             Exploring the boundaries between biological intuition and algorithmic precision. 
             A study in high-fidelity automated construction.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Archive() {
  return (
    <main className="bg-charcoal pt-32">
      <section className="container mx-auto px-6 mb-32">
        <div className="reveal-down">
          <h1 className="text-7xl md:text-12xl font-black tracking-tighter text-text-main">
            THE ARCHIVE
          </h1>
        </div>
        <p className="text-brand-blue text-lg uppercase tracking-widest mt-4">Systematic knowledge retrieval in progress...</p>
      </section>

      {items.map((item, index) => (
        <ArchiveItem key={index} item={item} index={index} />
      ))}

      <section className="h-screen flex items-center justify-center">
        <p className="text-text-muted opacity-20 text-sm tracking-widest uppercase">End of recorded memory</p>
      </section>
    </main>
  );
}
