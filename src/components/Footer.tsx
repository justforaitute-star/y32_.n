export default function Footer() {
  return (
    <footer className="py-20 border-t border-text-main/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-2xl font-display font-bold tracking-tighter mb-4 uppercase text-text-main">
              y32_.n<span className="text-brand-blue">.</span>
            </div>
            <p className="text-text-muted/60 text-sm max-w-xs text-center md:text-left">
              Building the future of digital identity and autonomous systems. 
              Always experimenting.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm font-medium text-text-muted">
            <a href="https://www.instagram.com/y32_.n/" className="hover:text-text-main transition-colors">Instagram</a>
            <a href="#" className="hover:text-text-main transition-colors">GitHub</a>
            <a href="#" className="hover:text-text-main transition-colors">LinkedIn</a>
          </div>
          
          <div className="text-xs uppercase tracking-[0.2em] text-text-muted/30">
            © 2026 y32_.n
          </div>
        </div>
      </div>
    </footer>
  );
}
