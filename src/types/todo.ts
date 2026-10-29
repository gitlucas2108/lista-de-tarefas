/**
 * src/types/todo.ts
 * 
 * Este arquivo define os TIPOS de dados que nossa aplicação utiliza.
 * Em TypeScript, definir interfaces ajuda a evitar erros e torna o código
 * autoexplicativo para quem está aprendendo.
 */

// Representa uma única tarefa na lista
export interface Task {
  id: string;            // Identificador único de cada tarefa (ex: "task-1712345678")
  text: string;          // O texto descritivo da tarefa (ex: "Estudar Antigravity")
  completed: boolean;     // Status: false = pendente, true = concluída
  createdAt: string;     // Data/hora em que a tarefa foi criada
}

// Opções de filtro para visualização das tarefas
export type FilterType = 'todas' | 'pendentes' | 'concluidas';
