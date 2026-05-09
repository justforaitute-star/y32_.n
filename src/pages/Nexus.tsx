import { motion } from "motion/react";
import React, { useEffect, useRef } from "react";
import { useAudio } from "../context/SoundContext";

export default function Nexus() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { playClick } = useAudio();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 100;
    const connectionDistance = 150;
    const mouse = { x: 0, y: 0, radius: 200 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= dx * force * 0.02;
          this.y -= dy * force * 0.02;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(124, 108, 90, 0.5)"; // brand-blue color roughly
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height);
        particles[i].draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(124, 108, 90, ${1 - distance / connectionDistance})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-charcoal overflow-hidden flex items-center justify-center">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none"
      />
      
      <div className="relative z-10 text-center max-w-4xl px-6">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <h1 className="text-8xl md:text-13xl font-display font-black tracking-tighter text-text-main mb-8 leading-none">
            NEXUS
          </h1>
          <p className="text-brand-blue text-xl uppercase tracking-[0.6em] mb-12">The Center of the Intelligence Swarm</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
             {[
               { id: 1, val: "1.2B", label: "Neural Nodes" },
               { id: 2, val: "0.04ms", label: "Sync Latency" },
               { id: 3, val: "Active", label: "Singularity Status" }
             ].map((stat) => (
                <motion.div 
                  key={stat.id}
                  whileHover={{ y: -5 }}
                  className="p-8 liquid-glass border border-white/5"
                >
                  <div className="text-4xl font-black text-text-main font-mono mb-2">{stat.val}</div>
                  <div className="text-[10px] uppercase tracking-widest text-text-muted">{stat.label}</div>
                </motion.div>
             ))}
          </div>

          <motion.button
            onClick={() => { playClick(); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-20 px-12 py-5 rounded-full bg-brand-blue text-white font-bold tracking-widest uppercase text-sm shadow-2xl hover:shadow-brand-blue/20 transition-all"
          >
            Initiate Deep Sync
          </motion.button>
        </motion.div>
      </div>

      {/* Side HUD Elements */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden lg:flex flex-col gap-10">
         {[1, 2, 3].map(i => (
           <div key={i} className="w-1 h-32 bg-white/5 relative overflow-hidden">
              <motion.div 
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 2 + i, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-brand-blue/40" 
              />
           </div>
         ))}
      </div>
    </main>
  );
}
