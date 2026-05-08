import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

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

export default function Projects() {
  return (
    <section id="projects" className="py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">Feature Work</h2>
            <p className="text-text-muted">
              Selected experiments and applications exploring the intersection 
              of AI, automation, and system intelligence.
            </p>
          </div>
          <button className="flex items-center gap-2 text-sm font-medium hover:text-brand-blue transition-colors pb-2">
            View Archive <span className="opacity-40">/ 008</span>
          </button>
        </div>

        <div className="projects-grid grid md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <motion.div 
              key={project.title} 
              className="project-card group cursor-pointer relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            >
              {/* Soft Background Glow on Hover */}
              <div className="absolute -inset-4 bg-brand-blue/5 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

              <div className="relative aspect-video rounded-[32px] overflow-hidden liquid-glass mb-8 isolation-auto border border-text-main/5">
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
                    whileHover={{ scale: 1.1, y: -20, x: -10 }} // Parallax effect
                  />
                </motion.div>

                {/* Corner Button */}
                <div className="absolute top-6 right-6 p-4 rounded-full bg-charcoal/95 backdrop-blur-xl border border-text-main/10 shadow-2xl opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 z-10">
                  <ArrowUpRight className="w-6 h-6 text-brand-blue" />
                </div>
              </div>
              
              <div className="px-4">
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
          ))}
        </div>
      </div>
    </section>
  );
}
