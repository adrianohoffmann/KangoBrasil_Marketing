
import React, { useState } from 'react';
import { Lock, X, ShieldCheck } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (pass: string) => boolean;
  isSiteAccess?: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin, isSiteAccess = false }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(password);
    if (!success) {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300`}>
      <div className="relative w-full max-w-md bg-[#181818] rounded-2xl shadow-2xl border border-gray-800 p-8 transform animate-in zoom-in-95 duration-200">
        {!isSiteAccess && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        )}

        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`w-16 h-16 ${isSiteAccess ? 'bg-[#006D2C]/20 text-[#006D2C]' : 'bg-[#016CB4]/20 text-[#016CB4]'} rounded-full flex items-center justify-center mb-2 shadow-inner`}>
            {isSiteAccess ? <ShieldCheck size={32} /> : <Lock size={32} />}
          </div>
          
          <img 
            src="https://www.kango.com.br/wp-content/uploads/2026/02/logotipo-completa-branca.png" 
            alt="Kango Brasil" 
            className="h-[60px] mb-2 object-contain"
            onError={(e) => e.currentTarget.style.display = 'none'}
          />

          <h2 className="text-2xl font-bold">
            {isSiteAccess ? 'Acesso Restrito' : 'Painel Administrativo'}
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            {isSiteAccess 
              ? 'Este portal contém informações confidenciais. Insira a senha de acesso para continuar.' 
              : 'Insira a senha de administrador para gerenciar o catálogo.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-2">
            <input 
              type="password" 
              autoFocus
              className={`w-full bg-[#2a2a2a] border ${error ? 'border-red-500' : 'border-gray-700'} rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-${isSiteAccess ? '[#006D2C]' : '[#016CB4]'} text-white text-center text-lg tracking-widest transition-all`}
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="••••••••"
            />
            {error && (
              <p className="text-red-500 text-xs text-center font-medium animate-bounce mt-2">
                Senha incorreta. Verifique e tente novamente.
              </p>
            )}
          </div>

          <button 
            type="submit"
            className={`w-full py-4 ${isSiteAccess ? 'bg-[#006D2C] hover:bg-[#006D2C]/80 shadow-[#006D2C]/20' : 'bg-[#016CB4] hover:bg-[#016CB4]/80 shadow-[#016CB4]/20'} text-white font-bold rounded-lg transition-all shadow-lg active:scale-95`}
          >
            {isSiteAccess ? 'Acessar Portal' : 'Entrar no Painel'}
          </button>
        </form>

        <p className="mt-8 text-[10px] text-gray-600 text-center uppercase tracking-widest font-bold">
          &copy; Kango Brasil - Infraestrutura e Tecnologia
        </p>
      </div>
    </div>
  );
};
