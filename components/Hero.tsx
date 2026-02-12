
import React, { useState, useEffect } from 'react';
import { Info, Play } from 'lucide-react';
import { Presentation } from '../types.ts';

interface HeroProps {
  presentations: Presentation[];
}

export const Hero: React.FC<HeroProps> = ({ presentations }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (presentations.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % presentations.length);
    }, 10000); // 10 segundos

    return () => clearInterval(interval);
  }, [presentations]);

  if (presentations.length === 0) return null;

  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      {presentations.map((p, idx) => (
        <div 
          key={p.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <img 
            src={p.coverUrl} 
            alt={p.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Overlay Gradients */}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1115] via-[#0f1115]/40 to-transparent"></div>

          <div className="absolute bottom-[25%] left-4 md:left-12 max-w-2xl space-y-6">
            <div className="flex items-center gap-2">
               <span className="text-white/80 text-sm font-bold tracking-widest uppercase bg-white/10 px-3 py-1 rounded backdrop-blur-sm border border-white/20">
                 {p.category}
               </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-2xl animate-in slide-in-from-left-4 duration-700">
              {p.title}
            </h2>

            <p className="text-lg md:text-xl text-gray-200 line-clamp-3 leading-relaxed drop-shadow-md max-w-xl animate-in fade-in slide-in-from-left-6 duration-1000">
              {p.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a 
                href={p.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-10 py-4 bg-[#E6C01F] text-black rounded-lg font-black hover:bg-[#E6C01F]/90 transition-all active:scale-95 shadow-xl shadow-[#E6C01F]/10"
              >
                <Play size={20} fill="black" />
                VER APRESENTAÇÃO
              </a>
              <a 
                href="https://www.kango.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-gray-500/30 text-white rounded-lg font-bold hover:bg-gray-500/50 transition-all backdrop-blur-md border border-white/10"
              >
                <Info size={20} />
                MAIS INFOS
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Carousel Indicators */}
      {presentations.length > 1 && (
        <div className="absolute bottom-32 right-12 z-20 flex gap-2">
          {presentations.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                idx === activeIndex ? 'w-12 bg-[#E6C01F]' : 'w-4 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
