/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Experimental from "./pages/Experimental";
import SmoothScroll from "./components/SmoothScroll";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import { ThemeProvider } from "./components/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <SmoothScroll>
          <LoadingScreen />
          <CustomCursor />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experimental" element={<Experimental />} />
          </Routes>
          
          {/* Global Grain/Noise Overlay for premium feel */}
          <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </SmoothScroll>
      </Router>
    </ThemeProvider>
  );
}
