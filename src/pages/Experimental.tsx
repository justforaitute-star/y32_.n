import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, Sparkles, Terminal, Activity, Brain, Mic } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { cn } from "../lib/utils";
import LiveTalkingSession from "../components/LiveTalkingSession";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function Experimental() {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, { role: 'user', content: userMsg }].map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: "You are ARK, an advanced AI system created by y32_.n. You are minimalist, intelligent, and speak with a futuristic, slightly technical tone. Your goal is to help users explore experiments and vision of the future."
        }
      });

      setMessages(prev => [...prev, { role: 'ai', content: response.text || "ARK: Transmission error." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', content: "ARK: Connection to neural core lost." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal">
      <Navbar />
      
      <main className="pt-32 pb-20 container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-text-main mb-6">Neural <span className="text-brand-blue">Experimental</span></h1>
          <p className="text-text-muted text-lg max-w-2xl">
            Where prototypes come to life. Exploring the boundaries of human-AI collaboration 
            through voice, vision, and cognitive sync.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Side: System Metrics & Experimental Controls */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-8"
          >
            <div className="glass-panel rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <Activity className="text-brand-blue w-5 h-5" />
                <h2 className="text-xl font-display font-medium text-text-main">Neural Core Status</h2>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: "Synaptic Load", val: "42%", color: "bg-brand-blue" },
                  { label: "Memory Integrity", val: "99.9%", color: "bg-brand-purple" },
                  { label: "Reality Sync", val: "Stable", color: "bg-green-500/20 text-green-700" }
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs uppercase tracking-widest text-text-muted">
                      <span>{stat.label}</span>
                      <span>{stat.val}</span>
                    </div>
                    {stat.color.includes('bg-') && !stat.color.includes('/') && (
                      <div className="h-1 bg-text-main/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: stat.val }}
                          transition={{ duration: 1.5, delay: i * 0.2 }}
                          className={cn("h-full", stat.color)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <LiveTalkingSession />

            <div className="glass-panel rounded-3xl p-8 group overflow-hidden relative">
              <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3 mb-6">
                <Brain className="text-brand-purple w-5 h-5" />
                <h3 className="text-lg font-display font-medium text-text-main">ARKos V2.0</h3>
              </div>
              <p className="text-sm text-text-muted mb-8 leading-relaxed">
                Early prototype of a natural language filesystem interface. Currently in "Thinking" phase.
              </p>
              
              {/* Generative Waveform Mockup */}
              <div className="h-20 flex items-center justify-center gap-1 mb-6 px-4">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      height: [10, 40, 15, 30, 10],
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                    className="w-1 bg-brand-blue/40 rounded-full"
                  />
                ))}
              </div>

              <button className="w-full py-4 glass-panel rounded-2xl flex items-center justify-center gap-2 text-sm font-medium hover:bg-text-main/10 transition-colors">
                <Terminal size={16} /> Enter Sandbox
              </button>
            </div>

            <div className="glass-panel rounded-3xl p-6 bg-charcoal/50 border border-text-main/5">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="text-text-muted w-4 h-4" />
                <h3 className="text-xs uppercase tracking-widest text-text-muted">Live System Logs</h3>
              </div>
              <div className="space-y-1 h-32 overflow-hidden font-mono text-[10px] text-brand-blue/60">
                <motion.div
                  animate={{ y: [0, -100] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  {[
                    "INITIALIZING NEURAL GATE...",
                    "SYNCING WITH ARK CORE...",
                    "LATENCY: 12ms",
                    "ENTROPY LEVEL: 0.04%",
                    "SECURE HANDSHAKE: [OK]",
                    "FETCHING ASSETS...",
                    "OPTIMIZING WORKFLOW...",
                    "AI AGENT #032 ACTIVE",
                    "MONITORING TRAFFIC...",
                    "DATABASE CONNECTED",
                    "ENCRYPTION: AES-256",
                    "UPDATING NODES...",
                    "HEARTBEAT DETECTED"
                  ].map((log, i) => (
                    <div key={i} className="py-0.5 opacity-80">{`> ${log}`}</div>
                  ))}
                  {/* Repeat for continuous loop */}
                  {[
                    "INITIALIZING NEURAL GATE...",
                    "SYNCING WITH ARK CORE...",
                    "LATENCY: 12ms",
                    "ENTROPY LEVEL: 0.04%",
                    "SECURE HANDSHAKE: [OK]"
                  ].map((log, i) => (
                    <div key={`dup-${i}`} className="py-0.5 opacity-80">{`> ${log}`}</div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: AI Chat (ARK Interface) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 flex flex-col h-[700px] glass-panel rounded-[40px] overflow-hidden border-2 border-brand-blue/10"
          >
            {/* Header */}
            <div className="p-6 border-b border-text-main/10 flex items-center justify-between bg-text-main/[0.02]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center">
                  <Bot className="text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-display font-medium text-text-main">ARK Interface</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest text-text-muted">Neural Sync Active</span>
                  </div>
                </div>
              </div>
              <Sparkles className="text-text-muted/30" />
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-30">
                  <Bot size={48} className="mb-4" />
                  <p className="text-lg font-display">ARK is waiting...</p>
                  <p className="text-sm">Initiate communication via the terminal below.</p>
                </div>
              )}
              
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex flex-col max-w-[80%]",
                    msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div className={cn(
                    "px-6 py-4 rounded-[24px] text-sm leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-text-main text-charcoal rounded-br-none" 
                      : "glass-panel text-text-main rounded-bl-none"
                  )}>
                    {msg.content}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-text-muted mt-2 px-1">
                    {msg.role === 'user' ? 'Client' : 'ARK'}
                  </span>
                </motion.div>
              ))}

              {isLoading && (
                <div className="mr-auto items-start">
                  <div className="glass-panel px-6 py-4 rounded-[24px] rounded-bl-none flex gap-2">
                    <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-text-main/[0.02] border-t border-text-main/10">
              <div className="relative group">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask ARK something..."
                  className="w-full bg-text-main/5 border border-text-main/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-brand-blue transition-all pr-16 text-text-main placeholder:text-text-muted/50"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-text-main text-charcoal flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-text-main"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
