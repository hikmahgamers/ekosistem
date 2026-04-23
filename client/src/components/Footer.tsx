import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              EkoSistem
            </span>
          </div>
          <p className="text-muted-foreground text-sm text-center md:text-left">
            Dibuat untuk tujuan pembelajaran. Mari jaga bumi kita bersama.
          </p>
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EkoSistem Edu.
          </div>
        </div>
      </div>
    </footer>
  );
}
