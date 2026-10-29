import React from 'react';
import { Task } from '../types/todo';
import { Check, Trash2 } from 'lucide-react';

interface TodoItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * Componente: TodoItem
 * 
 * Responsabilidade:
 * Renderizar uma única tarefa individual da lista.
 * Possui:
 * 1. O botão de alternar estado (marcar como pendente ou concluída).
 * 2. O texto da atividade (com estilo riscado quando concluída).
 * 3. O botão de remoção para excluir a atividade.
 */
export const TodoItem: React.FC<TodoItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div
      className={`group flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all duration-200 ${
        task.completed
          ? 'bg-slate-50/80 border-slate-200 text-slate-400'
          : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm text-slate-800'
      }`}
    >
      {/* Botão de Checkbox e Descrição */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
            task.completed
              ? 'bg-emerald-500 border-emerald-500 text-white'
              : 'border-slate-300 hover:border-indigo-500 bg-white'
          }`}
          aria-label={task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
        >
          {task.completed && <Check className="w-4 h-4 stroke-[2.5]" />}
        </button>

        <div className="min-w-0 flex-1">
          <p
            className={`text-sm sm:text-base break-words select-text ${
              task.completed
                ? 'line-through text-slate-400'
                : 'text-slate-700 font-medium'
            }`}
          >
            {task.text}
          </p>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            Criada em: {task.createdAt}
          </span>
        </div>
      </div>

      {/* Botão de Excluir */}
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        className="opacity-70 group-hover:opacity-100 p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all ml-2 cursor-pointer flex-shrink-0"
        title="Remover atividade"
        aria-label="Remover atividade"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
