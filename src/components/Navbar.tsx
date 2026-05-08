import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X, FlaskConical as Flask, Sun, Moon } from "lucide-react";
import { cn } from "../lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "Vision", href: "/#vision" },
  { name: "Exprmntl", href: "/experimental", icon: Flask },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [location.pathname]);
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    [
      theme === "light" ? "rgba(253, 250, 246, 0)" : "rgba(28, 25, 23, 0)", 
      theme === "light" ? "rgba(253, 250, 246, 0.8)" : "rgba(28, 25, 23, 0.8)"
    ]
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"]
  );

  const borderOpacity = useTransform(
    scrollY,
    [0, 100],
    [
      theme === "light" ? "rgba(61, 54, 49, 0)" : "rgba(253, 250, 246, 0)",
      theme === "light" ? "rgba(61, 54, 49, 0.1)" : "rgba(253, 250, 246, 0.1)"
    ]
  );

  return (
    <motion.nav
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        borderColor: borderOpacity,
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-display font-bold tracking-tighter uppercase text-text-main"
        >
          y32_.n<span className="text-brand-blue">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, idx) => {
            const isExternal = item.href.startsWith("http");
            const isAnchor = item.href.startsWith("/#");
            const isActive = isAnchor 
              ? activeSection === item.href.substring(2) 
              : location.pathname === item.href;

            if (isAnchor) {
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-all duration-300 relative group",
                    isActive ? "text-text-main" : "text-text-muted"
                  )}
                >
                  {item.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-[1px] bg-brand-blue transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </a>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-all duration-300 relative group flex items-center gap-2",
                  isActive ? "text-text-main" : "text-text-muted"
                )}
              >
                {item.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-[1px] bg-brand-blue transition-all duration-300",
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            );
          })}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full glass-panel hover:bg-brand-blue hover:text-white transition-colors duration-300 text-text-main relative overflow-hidden"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: 20, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -20, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          <a
            href="/#contact"
            className="px-5 py-2 rounded-full bg-text-main text-charcoal text-sm font-bold hover:bg-brand-blue hover:text-white transition-all duration-300"
          >
            Share Ideas
          </a>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full glass-panel text-text-main relative overflow-hidden"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
          
          <button
            className="text-text-main p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-charcoal border-b border-text-main/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-lg font-medium transition-colors",
                    (item.href.startsWith("/#") ? activeSection === item.href.substring(2) : location.pathname === item.href)
                      ? "text-brand-blue"
                      : "text-text-muted hover:text-text-main"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
