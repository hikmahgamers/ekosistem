import { Link } from "wouter";
import { ArrowRight, BookOpen } from "lucide-react";
import { type Lesson } from "@shared/schema";

interface LessonCardProps {
  lesson: Lesson;
}

export function LessonCard({ lesson }: LessonCardProps) {
  return (
    <Link 
      href={`/lesson/${lesson.id}`} 
      className="group block h-full outline-none focus-visible:ring-4 focus-visible:ring-primary/20 rounded-2xl"
    >
      <div className="bg-card h-full flex flex-col rounded-2xl overflow-hidden border border-border/50 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/20 transition-all duration-300 ease-out">
        
        {/* Image Container with subtle zoom on hover */}
        <div className="relative h-56 w-full overflow-hidden bg-muted">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
          <img 
            src={lesson.imageUrl} 
            alt={lesson.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-xs font-semibold text-primary rounded-full shadow-sm">
              {lesson.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
            {lesson.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
            {lesson.summary}
          </p>
          
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center text-xs font-medium text-muted-foreground">
              <BookOpen className="w-4 h-4 mr-1.5" />
              <span>Modul {lesson.order}</span>
            </div>
            <div className="flex items-center text-sm font-semibold text-primary group-hover:text-accent transition-colors">
              Mulai Belajar 
              <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
