import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onAddTask: (text: string) => void;
}

/**
 * Componente: TodoInput
 * 
 * Responsabilidade:
 * Campo de formulário onde o usuário digita uma nova atividade.
 * Gerencia seu próprio estado local para o texto digitado (`inputValue`)
 * e dispara a função `onAddTask` passada pelo componente pai quando o usuário
 * clica em "Adicionar" ou aperta a tecla Enter.
 */
export const TodoInput: React.FC<TodoInputProps> = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Impede o recarregamento padrão da página

    const textoFormatado = inputValue.trim();
    if (!textoFormatado) {
      return; // Não adiciona se estiver vazio ou apenas espaços
    }

    onAddTask(textoFormatado); // Envia o texto para a função do componente pai
    setInputValue('');         // Limpa o campo de texto
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="O que você precisa fazer hoje? (ex: Ler capítulo do livro)"
          className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm text-sm"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="inline-flex items-center gap-1.5 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all shadow-sm active:scale-95 text-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar</span>
        </button>
      </div>
    </form>
  );
};
