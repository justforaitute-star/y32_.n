import { motion } from "motion/react";
import { Mail, Github, Instagram, MapPin } from "lucide-react";
import { useAudio } from "../context/SoundContext";

export default function Contact() {
  const { playClick } = useAudio();
  return (
    <section id="contact" className="py-32">
      <div className="container mx-auto px-6">
        <div className="liquid-glass rounded-[40px] p-12 md:p-20 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 blur-[120px] -mr-48 -mt-48" />
          
          <div className="grid lg:grid-cols-2 gap-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-text-main">
                Share Your <br />  
                Vision <span className="text-brand-blue">With Me.</span>
              </h2>
              <p className="text-text-muted text-lg mb-12 max-w-md">
                Always open to discussing AI automation, curious collaborations, 
                or hearing your futuristic ideas.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-text-main/60">
                  <div className="w-10 h-10 rounded-full bg-text-main/5 flex items-center justify-center">
                    <Mail size={18} className="text-brand-blue" />
                  </div>
                  <span>yezenabdurahman@gmail.com</span>
                </div>
                <div className="flex items-center gap-4 text-text-main/60">
                  <div className="w-10 h-10 rounded-full bg-text-main/5 flex items-center justify-center">
                    <MapPin size={18} className="text-brand-blue" />
                  </div>
                  <span>Jeddah, Saudi Arabia</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mt-12">
                <a 
                  href="https://www.instagram.com/y32_.n/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={playClick}
                  className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all duration-300"
                >
                  <Instagram size={20} />
                </a>
                <button 
                  onClick={playClick}
                  className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all duration-300 text-text-main"
                >
                  <Github size={20} />
                </button>
                <a 
                  href="mailto:yezenabdurahman@gmail.com" 
                  onClick={playClick}
                  className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all duration-300"
                >
                  <Mail size={20} />
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-text-muted ml-1">Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full glass-panel border-text-main/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-blue/50 transition-colors text-text-main placeholder:text-text-muted/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-text-muted ml-1">Email</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full glass-panel border-text-main/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-blue/50 transition-colors text-text-main placeholder:text-text-muted/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-text-muted ml-1">Topic</label>
                  <select className="w-full glass-panel border-text-main/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-blue/50 transition-colors text-text-main appearance-none cursor-pointer">
                    <option className="bg-charcoal">AI Integration</option>
                    <option className="bg-charcoal">Web Automation</option>
                    <option className="bg-charcoal">Collaboration</option>
                    <option className="bg-charcoal">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-text-muted ml-1">Message</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe your vision..." 
                    className="w-full glass-panel border-text-main/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-blue/50 transition-colors text-text-main placeholder:text-text-muted/50 resize-none"
                  />
                </div>
                
                <button 
                  onClick={playClick}
                  className="w-full py-5 bg-text-main text-charcoal rounded-2xl font-bold text-lg hover:bg-brand-blue hover:text-white transition-all duration-500 hover:shadow-[0_0_40px_rgba(124,108,90,0.3)]"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
