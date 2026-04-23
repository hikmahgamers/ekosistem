import { useLessons } from "@/hooks/use-lessons";
import { LessonCard } from "@/components/LessonCard";
import { motion } from "framer-motion";
import { Leaf, ArrowDown, BookText, Sprout } from "lucide-react";

export default function Home() {
  const { data: lessons, isLoading, error } = useLessons();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  // Group lessons by category if data is available
  const groupedLessons = lessons?.reduce((acc, lesson) => {
    if (!acc[lesson.category]) acc[lesson.category] = [];
    acc[lesson.category].push(lesson);
    return acc;
  }, {} as Record<string, typeof lessons>) || {};

  return (
    <div className="min-h-screen nature-gradient pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-8 border border-primary/20 shadow-sm">
                <Sprout className="w-4 h-4" />
                <span>Edukasi Lingkungan Hijau</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-6">
                Mari Mengenal <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Keajaiban Alam
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed text-balance">
                Pelajari bagaimana makhluk hidup saling berinteraksi dan membentuk keseimbangan ekosistem yang menakjubkan di bumi kita.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#materi" className="inline-flex justify-center items-center px-8 py-4 rounded-xl font-semibold bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                  Mulai Belajar Sekarang
                </a>
                <a href="#tentang" className="inline-flex justify-center items-center px-8 py-4 rounded-xl font-semibold bg-white border-2 border-border text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all duration-200">
                  Pelajari Lebih Lanjut
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[3rem] blur-3xl" />
              {/* landing page hero scenic forest ecosystem */}
              <img 
                src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1600&auto=format&fit=crop"
                alt="Keindahan hutan" 
                className="relative rounded-[2.5rem] shadow-2xl shadow-primary/20 border-8 border-white/50 object-cover aspect-[4/3]"
              />
              
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="bg-accent/10 p-3 rounded-full text-accent">
                  <BookText className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold text-xl text-foreground">{lessons?.length || 0}+</p>
                  <p className="text-sm font-medium text-muted-foreground">Materi Interaktif</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Modules Section */}
      <section id="materi" className="py-24 bg-white/80 backdrop-blur-sm border-t border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Materi Pembelajaran</h2>
            <p className="text-lg text-muted-foreground">
              Pilih topik yang ingin kamu pelajari hari ini. Setiap modul dirancang agar mudah dipahami dan menyenangkan.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-muted/50 rounded-2xl h-[400px] animate-pulse border border-border" />
              ))}
            </div>
          ) : error ? (
            <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold mb-2">Oops! Gagal Memuat Materi</h3>
              <p>Mohon periksa koneksi internet Anda dan coba muat ulang halaman.</p>
            </div>
          ) : !lessons?.length ? (
            <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
              <Leaf className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Belum ada materi</h3>
              <p className="text-muted-foreground">Materi pembelajaran sedang disiapkan oleh tutor kami.</p>
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-16"
            >
              {Object.entries(groupedLessons).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Leaf className="w-5 h-5" />
                    </span>
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.sort((a, b) => a.order - b.order).map(lesson => (
                      <motion.div key={lesson.id} variants={itemVariants}>
                        <LessonCard lesson={lesson} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
