import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ 
            clipPath: "inset(0% 0% 100% 0%)",
            transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] }
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal"
        >
          <div className="relative flex flex-col items-center">
            <div className="overflow-hidden mb-4">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-display text-6xl md:text-8xl font-bold text-text-main opacity-10"
              >
                {progress}%
              </motion.div>
            </div>
            
            <div className="w-48 h-[1px] bg-text-main/10 relative overflow-hidden">
              <motion.div 
                style={{ width: `${progress}%` }}
                className="absolute inset-0 bg-brand-blue"
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-8 font-display text-xs tracking-[0.4em] uppercase text-brand-blue"
            >
              Initializing Liquid Reality
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
