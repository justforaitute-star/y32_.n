import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useAudio } from "../context/SoundContext";
import React, { useState } from "react";
import { cn } from "../lib/utils";

const projects = [
  {
    title: "ARK Karain",
    category: "AI Automation",
    image: "https://picsum.photos/seed/p1/800/600",
    desc: "A framework for AI agents to self-organize and execute complex workflows without human intervention."
  },
  {
    title: "ARKos",
    category: "System Interface",
    image: "https://picsum.photos/seed/p2/800/600",
    desc: "A prototype AI-powered shell that allows natural language control over your entire filesystem."
  },
  {
    title: "ARK Core",
    category: "Infrastructure",
    image: "https://picsum.photos/seed/p5/800/600",
    desc: "The underlying nervous system that coordinates distributed AI agents across multiple devices."
  },
  {
    title: "ARK Neural",
    category: "R&D",
    image: "https://picsum.photos/seed/p6/800/600",
    desc: "Experimental interface for bridging bio-rhythms with focus-mode automation."
  }
];

interface ProjectCardProps {
  project: typeof projects[0];
  key?: React.Key;
}

function ProjectCard({ project }: ProjectCardProps) {
  const { playClick } = useAudio();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div 
      className="project-card group cursor-pointer relative"
      onClick={playClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.02 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      style={{ 
        rotateX, 
        rotateY, 
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
    >
      {/* Soft Background Glow on Hover (Bloom Effect) */}
      <div className="absolute -inset-8 bg-brand-blue/5 rounded-[60px] blur-[80px] opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10 group-hover:bg-brand-blue/10" />

      <div 
        className="relative aspect-video rounded-[32px] overflow-hidden liquid-glass mb-8 isolation-auto border border-text-main/5 shadow-2xl"
        style={{ transform: "translateZ(50px)" }}
      >
        <motion.div
          className="w-full h-full"
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          <motion.img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
            referrerPolicy="no-referrer"
            style={{ scale: 1.2 }}
            whileHover={{ scale: 1.1, y: -20, x: -10 }}
          />
        </motion.div>

        {/* Corner Button */}
        <div 
          className="absolute top-6 right-6 p-4 rounded-full bg-charcoal/95 backdrop-blur-xl border border-text-main/10 shadow-2xl opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 z-10"
          style={{ transform: "translateZ(80px)" }}
        >
          <ArrowUpRight className="w-6 h-6 text-brand-blue" />
        </div>
      </div>
      
      <div className="px-4" style={{ transform: "translateZ(30px)" }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-[1px] bg-brand-blue/40 group-hover:w-12 transition-all duration-500" />
          <div className="text-xs uppercase tracking-[0.2em] text-brand-blue font-semibold">
            {project.category}
          </div>
        </div>
        <h3 className="text-3xl font-display font-medium mb-4 group-hover:text-brand-blue transition-colors duration-500">
          {project.title}
        </h3>
        <p className="text-text-muted text-lg leading-relaxed font-light line-clamp-2 max-w-lg">
          {project.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { playClick } = useAudio();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <div className="reveal-down">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">Feature Work</h2>
            </div>
            <p className="text-text-muted">
              Selected experiments and applications exploring the intersection 
              of AI, automation, and system intelligence.
            </p>
          </div>
          <button className="flex items-center gap-2 text-sm font-medium hover:text-brand-blue transition-colors pb-2">
            View Archive <span className="opacity-40">/ 008</span>
          </button>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-3 mb-16">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                playClick();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-6 py-2.5 rounded-full border transition-all duration-300 text-xs font-semibold uppercase tracking-widest",
                activeCategory === cat 
                  ? "bg-brand-blue border-brand-blue text-white shadow-[0_10px_20px_-10px_rgba(124,108,90,0.5)]" 
                  : "border-text-main/10 text-text-muted hover:border-brand-blue/30 hover:text-brand-blue bg-white/[0.02]"
              )}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <motion.div 
          layout
          className="projects-grid grid md:grid-cols-2 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
