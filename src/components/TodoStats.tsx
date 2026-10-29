import React from 'react';
import { CheckCircle2, Clock, ListTodo } from 'lucide-react';

interface TodoStatsProps {
  total: number;
  completed: number;
  pending: number;
}

/**
 * Componente: TodoStats
 * 
 * Responsabilidade:
 * Exibir o resumo numérico e a barra de progresso visual das tarefas.
 * Mostra de relance quantas tarefas faltam e quantas foram finalizadas.
 */
export const TodoStats: React.FC<TodoStatsProps> = ({ total, completed, pending }) => {
  // Calcula a porcentagem concluída evitando divisão por zero
  const percentual = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm mb-6">
      {/* Cards de Métricas Rápidas */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {/* Total */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs font-medium mb-1">
            <ListTodo className="w-3.5 h-3.5" />
            <span>Total</span>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-slate-800">{total}</span>
        </div>

        {/* Pendentes */}
        <div className="bg-amber-50/70 border border-amber-100 rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1.5 text-amber-700 text-xs font-medium mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Pendentes</span>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-amber-600">{pending}</span>
        </div>

        {/* Concluídas */}
        <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1.5 text-emerald-700 text-xs font-medium mb-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Concluídas</span>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-emerald-600">{completed}</span>
        </div>
      </div>

      {/* Barra de Progresso Visual */}
      <div>
        <div className="flex justify-between items-center text-xs font-medium text-slate-600 mb-1.5">
          <span>Progresso geral</span>
          <span className="font-semibold text-indigo-600">{percentual}% concluído</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentual}%` }}
          />
        </div>
      </div>
    </div>
  );
};
