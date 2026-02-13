
import React, { useState, useEffect } from 'react';
import { User, LayoutDashboard } from 'lucide-react';
import { CATEGORIES } from '../constants.tsx';

interface HeaderProps {
  onAdminClick: () => void;
  isAdminMode: boolean;
  onCategoryClick: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onAdminClick, isAdminMode, onCategoryClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, category: string) => {
    e.preventDefault();
    onCategoryClick(category);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0f1115]/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-12">
          {/* Logo Oficial Kango Brasil - Aumentado em 20% */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <img 
              src="https://www.kango.com.br/wp-content/uploads/2026/02/logotipo-completa-branca.png" 
              alt="Kango Brasil" 
              className="h-10 md:h-[60px] w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.parentElement) {
                  e.currentTarget.parentElement.innerHTML = '<span class="text-xl font-bold tracking-tighter">KANGO BRASIL</span>';
                }
              }}
            />
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold tracking-wide">
            {CATEGORIES.map(category => (
              <a 
                key={category}
                href={`#${category}`} 
                onClick={(e) => handleNavClick(e, category)}
                className="text-gray-300 hover:text-[#E6C01F] transition-colors uppercase"
              >
                {category}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onAdminClick}
            className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 border ${
              isAdminMode 
                ? 'bg-[#E6C01F] text-black border-[#E6C01F] font-bold shadow-[0_0_15px_rgba(230,192,31,0.4)]' 
                : 'border-white/30 bg-black/20 hover:bg-white hover:text-black hover:border-white'
            }`}
          >
            {isAdminMode ? <LayoutDashboard size={18} /> : <User size={18} />}
            <span className="text-xs md:text-sm font-semibold tracking-wide">
              {isAdminMode ? 'PAINEL ADMIN' : 'ADMIN'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
