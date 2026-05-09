import { motion } from "motion/react";
import React, { useRef, useState } from "react";
import { useAudio } from "../context/SoundContext";
import { cn } from "../lib/utils";
import { Shield, Zap, Cpu, Globe, Lock, Eye } from "lucide-react";

const artifacts = [
  { 
    id: 1, 
    title: "Neural Core", 
    tag: "Hardware", 
    desc: "A custom silicon architecture designed for recursive self-optimization.",
    icon: Cpu,
    color: "from-blue-500/20 to-cyan-500/20",
    span: "md:col-span-2 md:row-span-2"
  },
  { 
    id: 2, 
    title: "Ghost Protocol", 
    tag: "Security", 
    desc: "Autonomous decryption layer for dark-pool data streams.",
    icon: Shield,
    color: "from-purple-500/20 to-pink-500/20",
    span: "md:col-span-1 md:row-span-1"
  },
  { 
    id: 3, 
    title: "Latency Zero", 
    tag: "Network", 
    desc: "Quantum tunnel communication protocol.",
    icon: Zap,
    color: "from-orange-500/20 to-yellow-500/20",
    span: "md:col-span-1 md:row-span-1"
  },
  { 
    id: 4, 
    title: "Global Node", 
    tag: "Edge", 
    desc: "Distributed intelligence across 40,000 edge points.",
    icon: Globe,
    color: "from-green-500/20 to-emerald-500/20",
    span: "md:col-span-1 md:row-span-2"
  },
  { 
    id: 5, 
    title: "Locked Logic", 
    tag: "Encrypted", 
    desc: "Immutable decision bocks stored on a decentralized ledger.",
    icon: Lock,
    color: "from-red-500/20 to-rose-500/20",
    span: "md:col-span-1 md:row-span-1"
  },
  { 
    id: 6, 
    title: "Observer 1", 
    tag: "Vision", 
    desc: "Computer vision that perceives intent rather than pixels.",
    icon: Eye,
    color: "from-indigo-500/20 to-blue-500/20",
    span: "md:col-span-2 md:row-span-1"
  }
];

interface ArtifactCardProps {
  artifact: typeof artifacts[0];
  index: number;
  key?: React.Key;
}

function ArtifactCard({ artifact, index }: ArtifactCardProps) {
  const { playClick } = useAudio();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      viewport={{ once: true }}
      onMouseEnter={() => { setIsHovered(true); playClick(); }}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative p-8 rounded-[40px] liquid-glass border border-white/5 overflow-hidden flex flex-col justify-between transition-all duration-700",
        artifact.span,
        isHovered ? "bg-white/[0.08] border-white/20" : "bg-white/[0.02]"
      )}
    >
      {/* Background Gradient Bloom */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-700 -z-10",
        artifact.color,
        isHovered && "opacity-100"
      )} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-brand-blue/20 transition-colors">
            <artifact.icon className="w-6 h-6 text-brand-blue" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted">{artifact.tag}</span>
        </div>
        
        <h3 className="text-3xl font-display font-black tracking-tight text-text-main mb-4">
          {artifact.title}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed max-w-[240px]">
          {artifact.desc}
        </p>
      </div>

      <motion.div 
        animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0.4 }}
        className="mt-8 text-brand-blue"
      >
        <span className="text-xs font-mono">RETRIEVE ACCESS →</span>
      </motion.div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      </div>
    </motion.div>
  );
}

export default function Vault() {
  return (
    <main className="bg-charcoal pt-40 pb-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <header className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-12 h-[1px] bg-brand-blue" />
            <span className="text-brand-blue font-mono text-xs tracking-[0.4em] uppercase">Status: Secure</span>
          </motion.div>
          <h1 className="text-7xl md:text-11xl font-display font-black tracking-tighter text-text-main leading-none">
            THE <span className="text-brand-blue">VAULT</span>
          </h1>
          <p className="max-w-xl text-text-muted text-lg mt-8 leading-relaxed">
            A secure repository of experimental frameworks, neural weighting protocols, 
            and automated agent architectures retrieved from the edge of the singularity.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[280px]">
          {artifacts.map((artifact, index) => (
            <ArtifactCard key={artifact.id} artifact={artifact} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
