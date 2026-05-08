import { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setMousePos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const isClickable = target.closest('button, a, input, select, textarea, [role="button"]');
      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <>
      <style>{`
        body { cursor: none; }
        a, button, input, select, textarea, [role="button"] { cursor: none !important; }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 z-[1000] pointer-events-none hidden md:flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div 
          className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: isHovering ? 1.5 : 1 }}
        >
          {/* Upside down Y cursor */}
          <div className="text-3xl font-display font-black text-brand-blue/80 rotate-180 select-none">
            Y
          </div>
          
          {/* Outer glow ring */}
          <motion.div 
            className="absolute -z-10 w-12 h-12 rounded-full border border-brand-blue/20"
            animate={{ 
              scale: isHovering ? 1.8 : 1,
              opacity: isHovering ? 0.8 : 0.4
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
