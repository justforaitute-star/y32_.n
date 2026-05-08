import { motion } from "motion/react";

const visionStatements = [
  "Build a fully AI-powered PC assistant",
  "Create AI agents that build other AI agents",
  "Launch useful AI tools and software",
  "Build a respected tech brand",
  "Create financial success through innovation",
  "Support family through technology"
];

export default function Vision() {
  return (
    <section id="vision" className="py-32 relative min-h-screen flex items-center bg-charcoal">
      {/* Background Vision */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-charcoal via-charcoal/80 to-charcoal" />
        <img 
          src="https://picsum.photos/seed/vision-deep/1920/1080?grayscale&blur=10" 
          alt="Vision Art"
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <div className="inline-block px-4 py-1.5 rounded-full glass-panel text-xs uppercase tracking-widest text-brand-purple mb-8">
            The Roadmap
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-text-main">
            Building Toward <br />
            <span className="text-gradient">A Defined Future.</span>
          </h2>
          <p className="text-text-muted text-lg md:text-xl font-light">
            An elegant vision for technology that empowers, automates, and connects.
          </p>
        </motion.div>

        <div className="space-y-16">
          {visionStatements.map((statement, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="vision-item flex flex-col items-center"
            >
              <motion.div 
                whileHover={{ scale: 1.1, color: "var(--color-brand-blue)" }}
                className="text-text-main/5 text-6xl md:text-8xl font-display font-black mb-[-0.6em] transition-all cursor-default"
              >
                0{idx + 1}
              </motion.div>
              <h3 className="text-2xl md:text-4xl font-display font-medium text-text-main/90 relative z-10 max-w-2xl text-center">
                {statement}
              </h3>
              <div className="w-12 h-[1px] bg-brand-purple/40 mt-8" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
