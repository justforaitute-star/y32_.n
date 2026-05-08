import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, MicOff, Volume2, VolumeX, PhoneOff, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";

export default function LiveTalkingSession() {
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [status, setStatus] = useState<"idle" | "listening" | "processing" | "speaking">("idle");
  const [rms, setRms] = useState(0);
  const timerRef = useRef<number | null>(null);

  // Simulate audio activity when "listening" or "speaking"
  useEffect(() => {
    if (status === "listening" || status === "speaking") {
      const interval = setInterval(() => {
        setRms(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setRms(0);
    }
  }, [status]);

  const toggleSession = () => {
    if (isActive) {
      setIsActive(false);
      setStatus("idle");
    } else {
      setIsActive(true);
      setStatus("listening");
      // Mock interaction flow
      setTimeout(() => setStatus("processing"), 3000);
      setTimeout(() => setStatus("speaking"), 5000);
      setTimeout(() => setStatus("listening"), 8000);
    }
  };

  return (
    <div className="glass-panel rounded-[40px] p-8 overflow-hidden relative group border-2 border-brand-purple/10">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-3 h-3 rounded-full animate-pulse",
            isActive ? "bg-green-500" : "bg-text-muted"
          )} />
          <span className="text-xs uppercase tracking-widest text-text-muted">
            {isActive ? `Live Neural Link: ${status.toUpperCase()}` : "Neural Link Offline"}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-lg glass-panel hover:bg-text-main/5 text-text-muted transition-colors"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-10">
        {/* Central Visualizer */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isActive ? (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-32 h-32 rounded-full border-2 border-dashed border-text-main/10 flex items-center justify-center"
              >
                <MicOff className="text-text-muted/20" size={32} />
              </motion.div>
            ) : (
              <div key="active" className="flex items-center justify-center gap-2 h-32">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      height: status === "processing" ? [20, 60, 20] : [20, Math.max(20, rms * (1 - Math.abs(i - 6) / 6)), 20],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ 
                      duration: status === "processing" ? 0.6 : 0.2, 
                      repeat: Infinity,
                      delay: i * 0.05
                    }}
                    className={cn(
                      "w-2 rounded-full transition-colors duration-500",
                      status === "speaking" ? "bg-brand-blue" : "bg-brand-purple"
                    )}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Decorative Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-text-main/5 rounded-full border-dashed"
          />
          {isActive && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0.1 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 bg-brand-blue rounded-full blur-3xl -z-10"
            />
          )}
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-display font-medium text-text-main mb-2">
            {isActive ? (status === "listening" ? "ARK is listening..." : status === "speaking" ? "ARK is responding..." : "Processing sync...") : "Start Voice Session"}
          </h3>
          <p className="text-sm text-text-muted max-w-[280px] mx-auto leading-relaxed">
            Interact with your AI agents via high-fidelity spatial voice bypass.
          </p>
        </div>

        <div className="mt-12 flex gap-4">
          {!isActive ? (
            <button 
              onClick={toggleSession}
              className="px-10 py-5 bg-text-main text-charcoal rounded-full font-bold flex items-center gap-3 hover:bg-brand-blue hover:text-white transition-all shadow-xl shadow-brand-blue/10"
            >
              <Mic size={20} />
              Begin Session
            </button>
          ) : (
            <button 
              onClick={toggleSession}
              className="px-10 py-5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full font-bold flex items-center gap-3 hover:bg-red-500 hover:text-white transition-all"
            >
              <PhoneOff size={20} />
              End Session
            </button>
          )}
        </div>
      </div>

      {/* Floating Sparkles indicator */}
      <AnimatePresence>
        {status === "processing" && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute bottom-8 right-8 text-brand-purple"
          >
            <Sparkles size={24} className="animate-spin-slow" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
