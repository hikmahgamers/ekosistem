import { useParams, Link } from "wouter";
import { useLesson } from "@/hooks/use-lessons";
import { ArrowLeft, BookOpen, Clock, Tag, Leaf } from "lucide-react";
import { motion } from "framer-motion";

export default function LessonDetail() {
  const params = useParams();
  const id = parseInt(params.id || "0", 10);
  
  const { data: lesson, isLoading, error } = useLesson(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20 animate-pulse">
        <div className="h-[40vh] bg-muted w-full" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="h-10 bg-muted rounded w-3/4 mb-6" />
          <div className="h-6 bg-muted rounded w-1/4 mb-12" />
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 pt-20">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Materi Tidak Ditemukan</h1>
          <p className="text-muted-foreground mb-8">
            Materi yang Anda cari mungkin telah dipindahkan atau tidak tersedia.
          </p>
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-background pt-20 pb-24">
      {/* Article Hero */}
      <header className="relative h-[45vh] min-h-[400px] max-h-[600px] w-full flex items-end">
        <div className="absolute inset-0">
          <img 
            src={lesson.imageUrl} 
            alt={lesson.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        </div>
        
        <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-flex items-center text-white/80 hover:text-white text-sm font-medium mb-8 group transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
              Kembali ke Daftar Materi
            </Link>
            
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-white text-xs font-bold tracking-wide">
                <Tag className="w-3 h-3 mr-1.5" />
                {lesson.category}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium border border-white/10">
                <BookOpen className="w-3 h-3 mr-1.5" />
                Modul {lesson.order}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-balance">
              {lesson.title}
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed text-balance">
              {lesson.summary}
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="prose prose-lg prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground max-w-none">
          {/* We assume content is simple text with newlines from the backend, 
              or HTML. We'll split by newlines if it's plain text for better readability,
              or use dangerouslySetInnerHTML if we expect HTML.
              Given simple requirements, splitting by double newlines is robust for plain text. */}
          {lesson.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-6 leading-relaxed">
              {paragraph.trim().split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i !== paragraph.trim().split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          ))}
        </div>
        
        <div className="mt-20 pt-8 border-t border-border flex justify-between items-center">
          <p className="text-sm font-medium text-muted-foreground flex items-center">
            <Leaf className="w-4 h-4 mr-2 text-primary" />
            EkoSistem Edu
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Kembali ke Atas ↑
          </button>
        </div>
      </motion.div>
    </article>
  );
}
