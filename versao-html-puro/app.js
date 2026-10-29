/**
 * versao-html-puro/app.js
 * 
 * Lógica do To-Do List em JavaScript Puro (Vanilla JS).
 * 
 * Principais conceitos demonstrados:
 * 1. Seleção de elementos do DOM (document.getElementById / querySelector).
 * 2. Manipulação de eventos (addEventListener para submit e cliques).
 * 3. Gerenciamento do estado (array de objetos 'tasks').
 * 4. Persistência de dados com localStorage (salvar e recuperar dados).
 * 5. Renderização dinâmica da interface.
 */

// Chave para salvar no localStorage
const STORAGE_KEY = 'vanilla_todo_tasks';

// 1. ESTADO DA APLICAÇÃO
let tasks = [];
let currentFilter = 'todas';

// 2. ELEMENTOS DO DOM (Captura dos componentes visuais do HTML)
const taskInput = document.getElementById('taskInput');
const todoForm = document.getElementById('todoForm');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const emptyTitle = document.getElementById('emptyTitle');
const emptySubtitle = document.getElementById('emptySubtitle');

// Elementos de métricas e progresso
const totalCountEl = document.getElementById('totalCount');
const pendingCountEl = document.getElementById('pendingCount');
const completedCountEl = document.getElementById('completedCount');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

// Botões de filtro e contadores
const filterButtons = document.querySelectorAll('.filter-btn');
const filterAllCount = document.getElementById('filterAllCount');
const filterPendingCount = document.getElementById('filterPendingCount');
const filterCompletedCount = document.getElementById('filterCompletedCount');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

// 3. INICIALIZAÇÃO
function init() {
  // Carrega tarefas salvas do navegador
  const savedTasks = localStorage.getItem(STORAGE_KEY);
  if (savedTasks) {
    try {
      tasks = JSON.parse(savedTasks);
    } catch (e) {
      tasks = [];
    }
  } else {
    // Tarefas padrão para demonstrar ao abrir pela primeira vez
    tasks = [
      { id: '1', text: 'Iniciar estudos com Antigravity', completed: true },
      { id: '2', text: 'Entender HTML, CSS e JavaScript', completed: false },
      { id: '3', text: 'Criar minha primeira lista de tarefas', completed: false }
    ];
  }

  // Registra eventos do usuário
  todoForm.addEventListener('submit', handleAddTask);
  clearCompletedBtn.addEventListener('click', handleClearCompleted);

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Atualiza o botão ativo
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentFilter = btn.getAttribute('data-filter');
      render();
    });
  });

  render();
}

// 4. PERSISTÊNCIA NO LOCALSTORAGE
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// 5. FUNÇÃO: Adicionar Tarefa
function handleAddTask(e) {
  e.preventDefault(); // Evita recarregar a página
  const text = taskInput.value.trim();

  if (!text) return;

  const newTask = {
    id: Date.now().toString(), // ID único baseado no tempo atual
    text: text,
    completed: false
  };

  tasks.unshift(newTask); // Adiciona no início da lista
  saveTasks();
  taskInput.value = ''; // Limpa o campo
  render();
}

// 6. FUNÇÃO: Alternar Status (Concluir / Pendente)
function toggleTask(id) {
  tasks = tasks.map(t => {
    if (t.id === id) {
      return { ...t, completed: !t.completed };
    }
    return t;
  });

  saveTasks();
  render();
}

// 7. FUNÇÃO: Remover Tarefa
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

// 8. FUNÇÃO: Limpar Concluídas
function handleClearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  render();
}

// 9. FUNÇÃO DE RENDERIZAÇÃO (Atualiza a interface na tela)
function render() {
  // Cálculos de métricas
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const percentual = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Atualiza contadores numéricos
  totalCountEl.textContent = total;
  pendingCountEl.textContent = pending;
  completedCountEl.textContent = completed;
  filterAllCount.textContent = total;
  filterPendingCount.textContent = pending;
  filterCompletedCount.textContent = completed;

  // Atualiza barra de progresso
  progressFill.style.width = `${percentual}%`;
  progressText.textContent = `${percentual}% concluído`;

  // Exibe/oculta botão "Limpar concluídas"
  clearCompletedBtn.style.display = completed > 0 ? 'inline-block' : 'none';

  // Filtra as tarefas para exibir
  let filteredTasks = tasks;
  if (currentFilter === 'pendentes') {
    filteredTasks = tasks.filter(t => !t.completed);
  } else if (currentFilter === 'concluidas') {
    filteredTasks = tasks.filter(t => t.completed);
  }

  // Limpa a lista atual no HTML
  taskList.innerHTML = '';

  // Controla exibição de lista ou estado vazio
  if (filteredTasks.length === 0) {
    emptyState.style.display = 'block';
    if (currentFilter === 'pendentes') {
      emptyTitle.textContent = 'Tudo em dia! 🎉';
      emptySubtitle.textContent = 'Você não possui tarefas pendentes.';
    } else if (currentFilter === 'concluidas') {
      emptyTitle.textContent = 'Nenhuma concluída ainda';
      emptySubtitle.textContent = 'Marque suas tarefas concluídas para vê-las aqui.';
    } else {
      emptyTitle.textContent = 'Nenhuma tarefa cadastrada';
      emptySubtitle.textContent = 'Adicione sua primeira atividade no campo acima.';
    }
  } else {
    emptyState.style.display = 'none';

    // Cria elementos HTML para cada tarefa
    filteredTasks.forEach(task => {
      const li = document.createElement('li');
      li.className = `task-item ${task.completed ? 'completed' : ''}`;

      li.innerHTML = `
        <div class="task-content">
          <button class="task-checkbox ${task.completed ? 'checked' : ''}" aria-label="Alternar conclusão">
            ${task.completed ? '✓' : ''}
          </button>
          <span class="task-title">${escapeHTML(task.text)}</span>
        </div>
        <button class="delete-btn" title="Remover atividade" aria-label="Remover">✕</button>
      `;

      // Evento de clique para concluir/desconcluir
      const checkboxBtn = li.querySelector('.task-checkbox');
      checkboxBtn.addEventListener('click', () => toggleTask(task.id));

      // Evento de clique para remover
      const deleteBtn = li.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => deleteTask(task.id));

      taskList.appendChild(li);
    });
  }
}

// Função utilitária para evitar injeção de código malicioso no HTML (XSS)
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Inicia o app quando o arquivo é carregado
init();
