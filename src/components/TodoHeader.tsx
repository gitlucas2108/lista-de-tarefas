import React from 'react';
import { CheckSquare, Calendar } from 'lucide-react';

/**
 * Componente: TodoHeader
 * 
 * Responsabilidade:
 * Exibir o topo visual da aplicação com título, ícone e a data atual do usuário.
 * É um componente puramente visual (sem estado complexo).
 */
export const TodoHeader: React.FC = () => {
  // Formata a data atual em português
  const hoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <header className="mb-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between border-b border-slate-200 pb-6">
      <div>
        <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
          <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-100">
            <CheckSquare className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            Minhas Tarefas
          </h1>
        </div>
        <p className="text-slate-500 text-sm">
          Acompanhe suas atividades pendentes e comemore as concluídas.
        </p>
      </div>

      <div className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100 capitalize">
        <Calendar className="w-3.5 h-3.5" />
        <span>{hoje}</span>
      </div>
    </header>
  );
};
