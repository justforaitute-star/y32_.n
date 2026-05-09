import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Bot, Cpu, Code, Gamepad, Zap, Search } from "lucide-react";
import React from "react";

const skills = [
  { name: "AI Systems", icon: Bot, desc: "Building agentic workflows and LLM-powered tools.", color: "text-brand-blue" },
  { name: "Automation", icon: Zap, desc: "Creating autonomous loops that handle complex tasks.", color: "text-brand-purple" },
  { name: "Full-stack Dev", icon: Code, desc: "Modern web apps with a focus on experience.", color: "text-text-main" },
  { name: "Systems Arch", icon: Cpu, desc: "Deep architectural patterns for robust software.", color: "text-brand-blue" },
  { 
    name: "Gaming Mindset", 
    icon: Gamepad, 
    desc: "Optimizing for low latency and high precision logic.",
    games: ["Forza Horizon 5", "Roblox Rivals", "Fortnite", "GTA 5", "Watch Dogs", "FC 26"],
    color: "text-text-main" 
  },
  { name: "Problem Solving", icon: Search, desc: "First-principles thinking for complex systems.", color: "text-brand-purple" },
];

interface SkillCardProps {
  skill: typeof skills[0];
  index: number;
  key?: React.Key;
}

function SkillCard({ skill, index }: SkillCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      style={{ rotateX, rotateY, perspective: "1000px", transformStyle: "preserve-3d" }}
      className="skill-card group p-8 rounded-3xl liquid-glass hover:bg-text-main/[0.04] transition-all duration-700 cursor-default border-text-main/5 hover:border-brand-blue/30"
    >
      <div 
        className={`w-14 h-14 rounded-2xl bg-text-main/5 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500`}
        style={{ transform: "translateZ(30px)" }}
      >
        <skill.icon className={`w-7 h-7 ${skill.color}`} />
      </div>
      <h3 className="text-xl font-display font-semibold mb-3 text-text-main" style={{ transform: "translateZ(20px)" }}>{skill.name}</h3>
      <p className="text-text-muted text-sm leading-relaxed mb-4" style={{ transform: "translateZ(10px)" }}>
        {skill.desc}
      </p>
      
      {skill.games && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-text-main/5 mt-auto" style={{ transform: "translateZ(5px)" }}>
          {skill.games.map(game => (
            <span key={game} className="text-[10px] px-2 py-1 rounded-md bg-brand-blue/5 text-brand-blue font-medium tracking-wider uppercase">
              {game}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 bg-text-main/[0.02]">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="reveal-down">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-text-main">Essential Skills</h2>
          </div>
          <p className="text-text-muted max-w-xl mx-auto">
            The toolkit of a modern builder. Combining cutting-edge AI architecture 
            with a deep understanding of system design.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, idx) => (
            <SkillCard key={skill.name} skill={skill} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
