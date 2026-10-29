# 📝 Minha Lista de Tarefas (To-Do List)

Aplicação desenvolvida para acompanhar tarefas pendentes e concluídas com interface visual limpa, moderna e didática.

---

## 🎯 Funcionalidades

- **Adicionar Atividades**: Digite sua tarefa e pressione Enter ou clique em `Adicionar`.
- **Concluir / Pendente**: Alterne o status de qualquer tarefa clicando no círculo/checkbox.
- **Remover Atividades**: Exclua tarefas individualmente ou limpe todas as concluídas de uma só vez.
- **Filtros Dinâmicos**: Visualize **Todas**, apenas as **Pendentes** ou apenas as **Concluídas**.
- **Acompanhamento de Progresso**: Métricas em tempo real e barra de progresso em porcentagem.
- **Persistência Automática**: Suas tarefas são salvas no `localStorage` do seu navegador para não serem perdidas ao atualizar a página.

---

## 🏗️ Estrutura e Componentes do Projeto

O projeto foi organizado em componentes modulares para facilitar o entendimento de quem está começando no desenvolvimento de software:

```
projectTestAula/
├── src/
│   ├── types/
│   │   └── todo.ts               # Tipos de dados (interface Task e FilterType)
│   ├── components/
│   │   ├── TodoHeader.tsx        # Cabeçalho com título e data atual
│   │   ├── TodoStats.tsx         # Cards de resumo (Total, Pendentes, Concluídas) e barra de progresso
│   │   ├── TodoInput.tsx         # Campo de entrada e botão de adicionar
│   │   ├── TodoFilters.tsx       # Botões de filtro (Todas, Pendentes, Concluídas)
│   │   ├── TodoItem.tsx          # Item individual da tarefa com checkbox e botão de remover
│   │   └── TodoList.tsx          # Lista renderizada ou mensagem ilustrativa de lista vazia
│   ├── App.tsx                   # Componente principal (gerencia o estado e LocalStorage)
│   ├── main.tsx                  # Ponto de inicialização do React
│   └── index.css                 # Configurações de estilo com Tailwind CSS
│
├── versao-html-puro/             # 💡 Versão super simples sem build/framework
│   ├── index.html                # Estrutura visual da página
│   ├── style.css                 # Estilos visuais e cores
│   └── app.js                    # Lógica em JavaScript puro (DOM, eventos e LocalStorage)
│
├── index.html                    # Ponto de entrada HTML do Vite
├── package.json                  # Dependências e scripts do projeto
└── vite.config.ts                # Configuração do Vite
```

---

## 🚀 Como Executar

Você tem duas formas muito fáceis de visualizar e testar:

### 1. Aplicação Principal (React + Vite)
No terminal dentro desta pasta, execute:
```bash
npm run dev
```
Depois abra o link indicado no terminal (normalmente `http://localhost:3000`).

### 2. Versão Didática em HTML Puro
Se preferir testar sem precisar rodar servidor de desenvolvimento:
- Basta abrir a pasta `versao-html-puro` no explorador de arquivos do Windows e dar um duplo clique no arquivo `index.html`. Ele abrirá diretamente no Google Chrome ou Microsoft Edge!
