import { Link, useLocation } from "wouter";
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-nav"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 group outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1">
            <div className="bg-gradient-to-br from-primary to-accent p-2.5 rounded-xl shadow-lg shadow-primary/20 group-hover:shadow-primary/30 group-hover:scale-105 transition-all duration-300">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              EkoSistem
            </span>
          </Link>

          <nav className="hidden md:flex gap-8">
            {[
              { path: '/', label: 'Beranda' },
              { path: '/#materi', label: 'Materi Belajar' },
            ].map((item) => (
              <a 
                key={item.path}
                href={item.path}
                className={`text-sm font-semibold transition-colors duration-200 hover:text-primary relative py-2 ${
                  location === item.path ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
                {location === item.path && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="md:hidden">
            {/* Mobile menu could go here, keeping it simple for now */}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
