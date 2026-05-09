import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useAudio } from "../context/SoundContext";

const sections = [
  {
    title: "Phase One",
    subtitle: "Inception",
    desc: "The spark that started the journey toward automated intelligence.",
    color: "bg-brand-blue"
  },
  {
    title: "Phase Two",
    subtitle: "Expansion",
    desc: "Scaling systems beyond individual agents into collaborative swarms.",
    color: "bg-brand-purple"
  },
  {
    title: "Phase Three",
    subtitle: "Integration",
    desc: "Deep embedding of AI within standard operating environments.",
    color: "bg-text-main"
  },
  {
    title: "Phase Four",
    subtitle: "Sentience",
    desc: "Refining the boundary between tool and collaborator.",
    color: "bg-brand-blue"
  }
];

export default function Multiverse() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { playClick } = useAudio();
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <main className="bg-charcoal text-text-main overflow-hidden">
      {/* Introduction */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-20 grayscale"
            alt="Cosmos"
            referrerPolicy="no-referrer"
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-10"
        >
          <h1 className="text-7xl md:text-9xl font-display font-black tracking-tighter mb-4">
            MULTI<span className="text-brand-blue">VERSE</span>
          </h1>
          <p className="text-text-muted text-xl uppercase tracking-[0.5em]">Scroll Down to Navigate Space</p>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-12 text-brand-blue"
          >
            ↓
          </motion.div>
        </motion.div>
      </section>

      {/* Horizontal Scroll Section */}
      <section ref={targetRef} className="relative h-[400vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-20 px-20">
            {sections.map((section, index) => (
              <div 
                key={index} 
                className="group relative h-[70vh] w-[80vw] md:w-[45vw] flex-shrink-0 flex flex-col justify-end p-12 liquid-glass transition-all duration-700 hover:bg-white/[0.02]"
              >
                <div className="absolute top-0 right-0 p-12">
                   <span className="text-9xl font-black text-text-main opacity-5 select-none">
                    0{index + 1}
                  </span>
                </div>
                
                <motion.div 
                   initial={{ scale: 0.8, opacity: 0 }}
                   whileInView={{ scale: 1, opacity: 1 }}
                   transition={{ duration: 0.8 }}
                   className={`w-2 h-24 ${section.color} mb-8`} 
                />
                
                <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">
                  {section.title}
                </h2>
                <h3 className="text-xl text-brand-blue uppercase tracking-widest font-semibold mb-6">
                  {section.subtitle}
                </h3>
                <p className="max-w-md text-text-muted text-lg leading-relaxed mb-8">
                  {section.desc}
                </p>

                <button 
                  onClick={playClick}
                  className="w-16 h-16 rounded-full border border-text-main/20 flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all duration-500 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Outro */}
      <section className="h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-8 italic">THE END IS ONLY THE BEGINNING</h2>
          <button 
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); playClick(); }}
            className="px-10 py-4 glass-panel rounded-full hover:bg-brand-blue transition-colors"
          >
            Back to Singularity
          </button>
        </motion.div>
      </section>
    </main>
  );
}
