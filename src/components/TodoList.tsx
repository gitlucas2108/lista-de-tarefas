import React from 'react';
import { Task, FilterType } from '../types/todo';
import { TodoItem } from './TodoItem';
import { ClipboardList, Sparkles, CheckCircle2 } from 'lucide-react';

interface TodoListProps {
  tasks: Task[];
  currentFilter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * Componente: TodoList
 * 
 * Responsabilidade:
 * Renderizar a lista de tarefas filtradas.
 * Se a lista estiver vazia, apresenta uma mensagem amigável e ilustrativa
 * de acordo com o filtro selecionado (ex: parabenizando se não houver pendências).
 */
export const TodoList: React.FC<TodoListProps> = ({
  tasks,
  currentFilter,
  onToggle,
  onDelete,
}) => {
  // Estado vazio: quando não há tarefas correspondentes ao filtro
  if (tasks.length === 0) {
    let emptyIcon = <ClipboardList className="w-10 h-10 text-slate-300 mx-auto mb-2" />;
    let emptyTitle = 'Nenhuma atividade aqui!';
    let emptyDesc = 'Digite uma nova atividade no campo acima e clique em "Adicionar".';

    if (currentFilter === 'pendentes') {
      emptyIcon = <Sparkles className="w-10 h-10 text-amber-400 mx-auto mb-2 animate-bounce" />;
      emptyTitle = 'Tudo em dia! Parabéns! 🎉';
      emptyDesc = 'Você não possui nenhuma atividade pendente no momento.';
    } else if (currentFilter === 'concluidas') {
      emptyIcon = <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />;
      emptyTitle = 'Nenhuma atividade concluída ainda';
      emptyDesc = 'Conclua suas primeiras tarefas clicando no círculo ao lado de cada uma.';
    }

    return (
      <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-8 text-center my-4">
        {emptyIcon}
        <h3 className="text-base font-semibold text-slate-700">{emptyTitle}</h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm mx-auto">
          {emptyDesc}
        </p>
      </div>
    );
  }

  // Lista com itens:
  return (
    <div className="space-y-2.5">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
