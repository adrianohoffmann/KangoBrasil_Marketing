
import React from 'react';
import { ExternalLink, Play } from 'lucide-react';
import { Presentation } from '../types.ts';

interface PresentationCardProps {
  presentation: Presentation;
}

export const PresentationCard: React.FC<PresentationCardProps> = ({ presentation }) => {
  const handleOpenPdf = (e: React.MouseEvent) => {
    window.open(presentation.pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      onClick={handleOpenPdf}
      className="relative flex-none w-64 md:w-80 cursor-pointer z-10 hover:z-[60]"
    >
      <div className="relative h-36 md:h-44 rounded-lg overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] transform hover:scale-110 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-white/5 group">
        <img 
          src={presentation.coverUrl} 
          alt={presentation.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:opacity-40"
        />
        
        {/* Hover Information Layer */}
        <div className="absolute inset-0 bg-[#141414]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                <Play size={18} fill="black" className="text-black ml-1" />
              </div>
              <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-white transition-colors">
                <ExternalLink size={16} className="text-white" />
              </div>
            </div>
            <span className="text-[10px] uppercase font-black text-[#E6C01F] tracking-widest bg-[#E6C01F]/10 px-2 py-1 rounded">
              {presentation.category}
            </span>
          </div>

          <div>
            <h4 className="text-base font-black text-white line-clamp-1">{presentation.title}</h4>
            <p className="text-[11px] text-gray-300 mt-1 line-clamp-3 leading-tight font-medium">
              {presentation.description}
            </p>
          </div>

          <div className="mt-auto flex gap-2">
             <span className="px-1.5 py-0.5 text-[9px] border border-gray-700 rounded text-gray-400 font-bold bg-black/20 uppercase">PDF</span>
             <span className="px-1.5 py-0.5 text-[9px] border border-gray-700 rounded text-gray-400 font-bold bg-black/20 uppercase">Full HD</span>
          </div>
        </div>
      </div>
      
      {/* Title (Only visible when not hovering child) */}
      <div className="mt-3 px-1 transition-opacity duration-300">
        <h4 className="text-sm font-bold text-gray-200 truncate">
          {presentation.title}
        </h4>
        <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{presentation.category}</p>
      </div>
    </div>
  );
};
