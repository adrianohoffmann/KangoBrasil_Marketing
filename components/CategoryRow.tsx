
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Presentation } from '../types.ts';
import { PresentationCard } from './PresentationCard.tsx';

interface CategoryRowProps {
  title: string;
  presentations: Presentation[];
}

export const CategoryRow: React.FC<CategoryRowProps> = ({ title, presentations }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div id={title} className="space-y-4 scroll-mt-32">
      <h3 className="text-xl md:text-2xl font-bold ml-1 flex items-center gap-2">
        {title}
        <ChevronRight size={20} className="text-[#E6C01F]" />
      </h3>
      
      <div className="relative group/row">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-40 bg-black/50 w-12 opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/70"
        >
          <ChevronLeft size={32} />
        </button>

        <div 
          ref={rowRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-1 py-4"
        >
          {presentations.map(p => (
            <PresentationCard key={p.id} presentation={p} />
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-40 bg-black/50 w-12 opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/70"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};
