import { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const lagConfig = { damping: 15, stiffness: 100, mass: 0.8 };
  
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  
  const dotX = useSpring(0, lagConfig);
  const dotY = useSpring(0, lagConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setMousePos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const isClickable = target.closest('button, a, input, select, textarea, [role="button"]');
      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      <style>{`
        body { cursor: none; }
        a, button, input, select, textarea, [role="button"] { cursor: none !important; }
      `}</style>

      {/* Trailing Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[999] pointer-events-none hidden md:block w-2 h-2 bg-brand-blue rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <motion.div
        className="fixed top-0 left-0 z-[1000] pointer-events-none hidden md:flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div 
          className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            scale: isHovering ? 1.5 : 1,
            rotate: isHovering ? 180 : 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Main Cursor Symbol */}
          <div className="text-3xl font-display font-black text-brand-blue/80 rotate-180 select-none drop-shadow-[0_0_10px_rgba(124,108,90,0.3)]">
            Y
          </div>
          
          {/* Reactive ring */}
          <motion.div 
            className="absolute -z-10 w-12 h-12 rounded-full border border-brand-blue/30"
            animate={{ 
              scale: isHovering ? 2.5 : 1,
              opacity: isHovering ? 1 : 0.4,
              borderWidth: isHovering ? "1px" : "2px"
            }}
          />

          {/* Liquid pulse effect */}
          {isHovering && (
            <motion.div 
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute w-12 h-12 rounded-full bg-brand-blue/20"
            />
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
