
import React, { useState } from 'react';
import { Plus, Trash2, Edit2, X, Save, Download, Copy, Check } from 'lucide-react';
import { Presentation, Category } from '../types.ts';
import { CATEGORIES } from '../constants.tsx';

interface AdminPanelProps {
  presentations: Presentation[];
  onAdd: (p: Omit<Presentation, 'id'>) => void;
  onDelete: (id: string) => void;
  onUpdate: (p: Presentation) => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  presentations, onAdd, onDelete, onUpdate, onClose 
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [formData, setFormData] = useState<Omit<Presentation, 'id'>>({
    title: '',
    category: 'Institucional',
    coverUrl: '',
    pdfUrl: '',
    description: '',
    isFeatured: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onUpdate({ ...formData, id: editingId });
      setEditingId(null);
    } else {
      onAdd(formData);
      setIsAdding(false);
    }
    setFormData({
      title: '',
      category: 'Institucional',
      coverUrl: '',
      pdfUrl: '',
      description: '',
      isFeatured: false
    });
  };

  const startEdit = (p: Presentation) => {
    setEditingId(p.id);
    setFormData({
      title: p.title,
      category: p.category,
      coverUrl: p.coverUrl,
      pdfUrl: p.pdfUrl,
      description: p.description,
      isFeatured: p.isFeatured
    });
    setIsAdding(true);
  };

  const handleCopyConfig = () => {
    const config = JSON.stringify(presentations, null, 2);
    navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 md:px-12 pt-32 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <LayoutDashboard /> Gerenciar Conteúdo
          </h2>
          <p className="text-gray-400">As alterações abaixo são salvas apenas neste navegador.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setShowExport(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
          >
            <Download size={18} /> Salvar para Todos
          </button>
          {!isAdding && (
            <button 
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 px-6 py-2 bg-[#016CB4] hover:bg-[#016CB4]/80 text-white rounded-md transition-colors"
            >
              <Plus size={20} /> Nova Apresentação
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {showExport && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#181818] p-8 rounded-2xl border border-gray-800 max-w-2xl w-full space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#E6C01F]">Tornar Alterações Permanentes</h3>
              <button onClick={() => setShowExport(false)} className="text-gray-500 hover:text-white"><X /></button>
            </div>
            <p className="text-gray-300 text-sm">
              Para que todos vejam as atualizações, copie o código abaixo e envie para o desenvolvedor (IA) atualizar o código-fonte do site.
            </p>
            <div className="relative">
              <pre className="bg-black p-4 rounded-lg text-[10px] overflow-auto max-h-60 text-green-500 border border-gray-800">
                {JSON.stringify(presentations, null, 2)}
              </pre>
              <button 
                onClick={handleCopyConfig}
                className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded text-white flex items-center gap-2 text-xs"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                {copied ? 'Copiado!' : 'Copiar Código'}
              </button>
            </div>
            <button 
              onClick={() => setShowExport(false)}
              className="w-full py-3 bg-[#016CB4] text-white font-bold rounded-lg"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {isAdding && (
        <div className="bg-[#181818] p-8 rounded-xl border border-gray-800 mb-12 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Título da Apresentação</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#016CB4] text-white"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Guia de Vendas 2024"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Categoria</label>
                <select 
                  className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#016CB4] text-white"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as Category })}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">URL da Capa (Imagem)</label>
                <input 
                  type="url" 
                  required
                  className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#016CB4] text-white"
                  value={formData.coverUrl}
                  onChange={e => setFormData({ ...formData, coverUrl: e.target.value })}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Link Google Drive (PDF)</label>
                <input 
                  type="url" 
                  required
                  className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#016CB4] text-white"
                  value={formData.pdfUrl}
                  onChange={e => setFormData({ ...formData, pdfUrl: e.target.value })}
                  placeholder="https://drive.google.com/..."
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Breve Descrição</label>
              <textarea 
                rows={3}
                required
                className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#016CB4] text-white resize-none"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Uma breve descrição sobre o conteúdo da apresentação..."
              />
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="isFeatured"
                className="w-4 h-4 accent-[#016CB4]"
                checked={formData.isFeatured}
                onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
              />
              <label htmlFor="isFeatured" className="text-sm text-gray-400 cursor-pointer">Definir como destaque (Hero)</label>
            </div>

            <div className="flex justify-end gap-3">
              <button 
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                }}
                className="px-6 py-2 border border-gray-700 rounded-md hover:bg-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="flex items-center gap-2 px-8 py-2 bg-[#006D2C] hover:bg-[#006D2C]/80 text-white font-bold rounded-md transition-colors"
              >
                <Save size={18} /> {editingId ? 'Salvar Alterações' : 'Publicar'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-[#181818] rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#2a2a2a] text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Capa</th>
                <th className="px-6 py-4 font-semibold">Título / Categoria</th>
                <th className="px-6 py-4 font-semibold">Destaque</th>
                <th className="px-6 py-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {presentations.map(p => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <img src={p.coverUrl} className="w-24 h-14 object-cover rounded shadow-md border border-gray-700" alt={p.title} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-white">{p.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{p.category}</div>
                  </td>
                  <td className="px-6 py-4">
                    {p.isFeatured ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/50 text-blue-400 border border-blue-800">
                        Sim
                      </span>
                    ) : (
                      <span className="text-gray-600 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => startEdit(p)}
                        className="p-2 bg-gray-700/50 hover:bg-gray-700 text-white rounded-md transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm('Excluir esta apresentação?')) {
                            onDelete(p.id);
                          }
                        }}
                        className="p-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded-md transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const LayoutDashboard = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
);
