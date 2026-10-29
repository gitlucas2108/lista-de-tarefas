/**
 * src/App.tsx
 * 
 * Componente Principal da aplicação de Lista de Tarefas (To-Do List).
 * 
 * Aqui centralizamos:
 * 1. O Estado da aplicação (lista de tarefas e filtro ativo).
 * 2. A persistência local (LocalStorage do navegador).
 * 3. As funções de manipulação: Adicionar, Concluir/Alternar e Remover tarefas.
 */

import React, { useState, useEffect } from 'react';
import { Task, FilterType } from './types/todo';
import { TodoHeader } from './components/TodoHeader';
import { TodoStats } from './components/TodoStats';
import { TodoInput } from './components/TodoInput';
import { TodoFilters } from './components/TodoFilters';
import { TodoList } from './components/TodoList';
import confetti from 'canvas-confetti';
import { Info, Code2 } from 'lucide-react';

// Chave utilizada para salvar no LocalStorage do navegador
const STORAGE_KEY = 'antigravity_todo_tasks_v1';

// Tarefas iniciais de exemplo para o usuário ver o funcionamento imediatamente
const TAREFAS_INICIAIS: Task[] = [
  {
    id: 'task-1',
    text: 'Aprender a usar o Antigravity no desenvolvimento',
    completed: true,
    createdAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
  },
  {
    id: 'task-2',
    text: 'Compreender a separação de componentes da Lista de Tarefas',
    completed: false,
    createdAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
  },
  {
    id: 'task-3',
    text: 'Adicionar minha primeira tarefa personalizada',
    completed: false,
    createdAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
  },
];

export default function App() {
  // 1. ESTADO: Lista de tarefas (carrega do LocalStorage ou usa as iniciais)
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Erro ao carregar tarefas do LocalStorage:', e);
    }
    return TAREFAS_INICIAIS;
  });

  // 2. ESTADO: Filtro atual ('todas' | 'pendentes' | 'concluidas')
  const [filter, setFilter] = useState<FilterType>('todas');

  // 3. PERSISTÊNCIA: Sempre que as tarefas mudarem, salva no LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Erro ao salvar tarefas no LocalStorage:', e);
    }
  }, [tasks]);

  // FUNÇÃO: Adicionar uma nova tarefa
  const handleAddTask = (text: string) => {
    const horaAtual = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const novaTarefa: Task = {
      id: `task-${Date.now()}`,
      text: text,
      completed: false,
      createdAt: horaAtual,
    };

    // Insere a nova tarefa no topo da lista
    setTasks((tarefasAntigas) => [novaTarefa, ...tarefasAntigas]);
  };

  // FUNÇÃO: Alternar status (concluir ou voltar para pendente)
  const handleToggleTask = (id: string) => {
    setTasks((tarefasAntigas) => {
      const atualizadas = tarefasAntigas.map((t) => {
        if (t.id === id) {
          const novoStatus = !t.completed;
          // Se completou a tarefa, solta confetes divertidos!
          if (novoStatus) {
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.8 },
            });
          }
          return { ...t, completed: novoStatus };
        }
        return t;
      });
      return atualizadas;
    });
  };

  // FUNÇÃO: Remover uma tarefa específica
  const handleDeleteTask = (id: string) => {
    setTasks((tarefasAntigas) => tarefasAntigas.filter((t) => t.id !== id));
  };

  // FUNÇÃO: Limpar todas as tarefas concluídas
  const handleClearCompleted = () => {
    setTasks((tarefasAntigas) => tarefasAntigas.filter((t) => !t.completed));
  };

  // CÁLCULOS DERIVADOS: Estatísticas de pendentes e concluídas
  const total = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = total - completedCount;

  // TAREFAS FILTRADAS: de acordo com a aba selecionada
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pendentes') return !task.completed;
    if (filter === 'concluidas') return task.completed;
    return true; // 'todas'
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Cabeçalho */}
        <TodoHeader />

        {/* Resumo e Barra de Progresso */}
        <TodoStats
          total={total}
          completed={completedCount}
          pending={pendingCount}
        />

        {/* Campo de Entrada para Adicionar Tarefa */}
        <TodoInput onAddTask={handleAddTask} />

        {/* Abas de Filtros (Todas, Pendentes, Concluídas) */}
        <TodoFilters
          currentFilter={filter}
          onFilterChange={setFilter}
          counts={{
            todas: total,
            pendentes: pendingCount,
            concluidas: completedCount,
          }}
          onClearCompleted={handleClearCompleted}
        />

        {/* Lista de Tarefas Renderizadas */}
        <TodoList
          tasks={filteredTasks}
          currentFilter={filter}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />

        {/* Guia Didático dos Componentes para Aprendizado */}
        <div className="mt-12 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center gap-2 text-indigo-700 font-semibold text-sm mb-3">
            <Code2 className="w-4 h-4" />
            <span>Estrutura de Componentes desta Aplicação</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <strong className="text-slate-800 block mb-1">1. TodoHeader</strong>
              Exibe o título e a data atual do sistema.
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <strong className="text-slate-800 block mb-1">2. TodoStats</strong>
              Calcula e exibe total, pendentes, concluídas e o progresso em %.
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <strong className="text-slate-800 block mb-1">3. TodoInput</strong>
              Captura o que o usuário digita e adiciona à lista.
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <strong className="text-slate-800 block mb-1">4. TodoFilters</strong>
              Alterna entre as abas e permite limpar tarefas concluídas.
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 sm:col-span-2">
              <strong className="text-slate-800 block mb-1">5. TodoList & TodoItem</strong>
              Renderiza cada tarefa com botões de alternar status (concluir) e remover.
            </div>
          </div>

          <div className="mt-3 flex items-start gap-2 text-[11px] text-slate-400">
            <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-indigo-500" />
            <span>
              Todas as tarefas adicionadas ficam salvas no seu navegador através do <strong>LocalStorage</strong>, mesmo se você recarregar a página!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
