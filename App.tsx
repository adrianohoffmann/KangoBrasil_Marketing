
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { CategoryRow } from './components/CategoryRow.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import { LoginModal } from './components/LoginModal.tsx';
import { Presentation } from './types.ts';
import { INITIAL_DATA, CATEGORIES } from './constants.tsx';

const App: React.FC = () => {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [isSiteAuthenticated, setIsSiteAuthenticated] = useState(false);

  const SITE_PASSWORD = 'K@ngo2026';
  const ADMIN_PASSWORD = 'Kango#2990*!';

  useEffect(() => {
    const siteAuth = localStorage.getItem('kango_site_access');
    if (siteAuth === 'true') {
      setIsSiteAuthenticated(true);
    }

    const saved = localStorage.getItem('kango_presentations');
    if (saved) {
      setPresentations(JSON.parse(saved));
    } else {
      setPresentations(INITIAL_DATA as Presentation[]);
      localStorage.setItem('kango_presentations', JSON.stringify(INITIAL_DATA));
    }
  }, []);

  const saveToStorage = (updated: Presentation[]) => {
    setPresentations(updated);
    localStorage.setItem('kango_presentations', JSON.stringify(updated));
  };

  const addPresentation = (p: Omit<Presentation, 'id'>) => {
    const newP = { ...p, id: Date.now().toString() };
    saveToStorage([newP, ...presentations]);
  };

  const deletePresentation = (id: string) => {
    saveToStorage(presentations.filter(p => p.id !== id));
  };

  const updatePresentation = (p: Presentation) => {
    saveToStorage(presentations.map(item => item.id === p.id ? p : item));
  };

  const handleAdminLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setIsAdminMode(true);
      setIsLoginModalOpen(false);
      return true;
    }
    return false;
  };

  const handleSiteAccess = (password: string) => {
    if (password === SITE_PASSWORD) {
      setIsSiteAuthenticated(true);
      localStorage.setItem('kango_site_access', 'true');
      return true;
    }
    return false;
  };

  const scrollToCategory = (category: string) => {
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (!isSiteAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0f1115] flex items-center justify-center">
        <LoginModal 
          onClose={() => {}} 
          onLogin={handleSiteAccess}
          isSiteAccess={true}
        />
      </div>
    );
  }

  // Filtrar e ordenar apresentações em destaque
  // Garante que 'Institucional' seja o primeiro item no carrossel
  const heroPresentations = presentations
    .filter(p => p.isFeatured)
    .sort((a, b) => {
      if (a.category === 'Institucional' && b.category !== 'Institucional') return -1;
      if (a.category !== 'Institucional' && b.category === 'Institucional') return 1;
      return 0;
    });

  // Fallback caso não haja nenhum marcado como featured
  const finalHeroList = heroPresentations.length > 0 
    ? heroPresentations 
    : (presentations.length > 0 ? [presentations[0]] : []);

  return (
    <div className="min-h-screen bg-[#0f1115] text-white">
      <Header 
        onAdminClick={() => {
          if (isAuthenticated) setIsAdminMode(!isAdminMode);
          else setIsLoginModalOpen(true);
        }} 
        isAdminMode={isAdminMode}
        onCategoryClick={scrollToCategory}
      />

      <main className="pb-20">
        {isAdminMode && isAuthenticated ? (
          <AdminPanel 
            presentations={presentations}
            onAdd={addPresentation}
            onDelete={deletePresentation}
            onUpdate={updatePresentation}
            onClose={() => setIsAdminMode(false)}
          />
        ) : (
          <>
            {finalHeroList.length > 0 && <Hero presentations={finalHeroList} />}
            
            <div className="px-4 md:px-12 mt-[-100px] relative z-20 space-y-12">
              {CATEGORIES.map(category => {
                const categoryPresentations = presentations.filter(p => p.category === category);
                if (categoryPresentations.length === 0) return null;
                return (
                  <CategoryRow 
                    key={category}
                    title={category}
                    presentations={categoryPresentations}
                  />
                );
              })}
            </div>
          </>
        )}
      </main>

      {isLoginModalOpen && (
        <LoginModal 
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleAdminLogin}
        />
      )}

      <footer className="py-12 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Kango Brasil. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
