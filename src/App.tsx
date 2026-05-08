/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "motion/react";
import Home from "./pages/Home";
import Experimental from "./pages/Experimental";
import SmoothScroll from "./components/SmoothScroll";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import { ThemeProvider } from "./components/ThemeProvider";
import { SoundProvider } from "./context/SoundContext";

export default function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <Router>
        <SmoothScroll>
          <LoadingScreen />
          <CustomCursor />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experimental" element={<Experimental />} />
          </Routes>
          
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
