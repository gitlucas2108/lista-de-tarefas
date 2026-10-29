import React from 'react';
import { FilterType } from '../types/todo';
import { Trash2 } from 'lucide-react';

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    todas: number;
    pendentes: number;
    concluidas: number;
  };
  onClearCompleted?: () => void;
}

/**
 * Componente: TodoFilters
 * 
 * Responsabilidade:
 * Permite ao usuário filtrar as tarefas exibidas entre:
 * - "Todas": Mostra todas as tarefas cadastradas.
 * - "Pendentes": Apenas as que ainda precisam ser feitas.
 * - "Concluídas": Apenas as já finalizadas.
 * Também oferece a opção conveniente de limpar tarefas concluídas.
 */
export const TodoFilters: React.FC<TodoFiltersProps> = ({
  currentFilter,
  onFilterChange,
  counts,
  onClearCompleted,
}) => {
  const tabs: { id: FilterType; label: string; count: number }[] = [
    { id: 'todas', label: 'Todas', count: counts.todas },
    { id: 'pendentes', label: 'Pendentes', count: counts.pendentes },
    { id: 'concluidas', label: 'Concluídas', count: counts.concluidas },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
      {/* Botões de Filtro */}
      <div className="flex bg-slate-100 p-1 rounded-xl">
        {tabs.map((tab) => {
          const isActive = currentFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onFilterChange(tab.id)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-slate-200/80 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Botão opcional: Limpar tarefas já concluídas */}
      {counts.concluidas > 0 && onClearCompleted && (
        <button
          onClick={onClearCompleted}
          className="inline-flex items-center justify-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          title="Remover todas as tarefas concluídas de uma vez"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Limpar concluídas</span>
        </button>
      )}
    </div>
  );
};
