import { motion } from "motion/react";
import { Bot, Cpu, Code, Gamepad, Zap, Search } from "lucide-react";

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
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-text-main">Essential Skills</h2>
          <p className="text-text-muted max-w-xl mx-auto">
            The toolkit of a modern builder. Combining cutting-edge AI architecture 
            with a deep understanding of system design.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, idx) => (
            <motion.div 
              key={skill.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="skill-card group p-8 rounded-3xl liquid-glass hover:bg-text-main/[0.04] transition-all duration-700 cursor-default border-text-main/5 hover:border-brand-blue/30 hover:scale-[1.02] hover:-translate-y-2"
            >
              <div className={`w-14 h-14 rounded-2xl bg-text-main/5 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500`}>
                <skill.icon className={`w-7 h-7 ${skill.color}`} />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-text-main">{skill.name}</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                {skill.desc}
              </p>
              
              {skill.games && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-text-main/5 mt-auto">
                  {skill.games.map(game => (
                    <span key={game} className="text-[10px] px-2 py-1 rounded-md bg-brand-blue/5 text-brand-blue font-medium tracking-wider uppercase">
                      {game}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
