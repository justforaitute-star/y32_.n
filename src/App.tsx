/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import Home from "./pages/Home";
import Experimental from "./pages/Experimental";
import Multiverse from "./pages/Multiverse";
import Archive from "./pages/Archive";
import Vault from "./pages/Vault";
import Nexus from "./pages/Nexus";
import SmoothScroll from "./components/SmoothScroll";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import { ThemeProvider } from "./components/ThemeProvider";
import { SoundProvider } from "./context/SoundContext";

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <Home />
          </motion.div>
        } />
        <Route path="/experimental" element={
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            <Experimental />
          </motion.div>
        } />
        <Route path="/multiverse" element={
          <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}>
            <Multiverse />
          </motion.div>
        } />
        <Route path="/archive" element={
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.6 }}>
            <Archive />
          </motion.div>
        } />
        <Route path="/vault" element={
          <motion.div initial={{ opacity: 0, rotateY: 10 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: -10 }} transition={{ duration: 0.8 }}>
            <Vault />
          </motion.div>
        } />
        <Route path="/nexus" element={
          <motion.div initial={{ opacity: 0, filter: "blur(10px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(10px)" }} transition={{ duration: 1 }}>
            <Nexus />
          </motion.div>
        } />
      </Routes>
    </div>
  </AnimatePresence>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <ThemeProvider>
      <SoundProvider>
        <Router>
        <SmoothScroll>
          <LoadingScreen />
          <CustomCursor />
          
          <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] bg-brand-blue z-[101] origin-left"
            style={{ scaleX }}
          />
          
          <AnimatedRoutes />
          
          {/* Liquid Background Elements */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, 30, 0]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-brand-blue/10 blur-[120px]"
            />
            <motion.div 
              animate={{ 
                scale: [1.2, 1, 1.2],
                x: [0, -50, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] rounded-full bg-brand-purple/10 blur-[120px]"
            />
          </div>
          
          {/* Global Grain/Noise Overlay for premium feel */}
          <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </SmoothScroll>
      </Router>
      </SoundProvider>
    </ThemeProvider>
  );
}
