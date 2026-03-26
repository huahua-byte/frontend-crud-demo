const STORAGE_KEY = "todos";

const createId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const getTodos = () => {
  const storedValue = localStorage.getItem(STORAGE_KEY);

  if (!storedValue) {
    return [];
  }

  try {
    const todos = JSON.parse(storedValue);
    return Array.isArray(todos) ? todos : [];
  } catch {
    return [];
  }
};

export const saveTodos = (todos) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

export const addTodo = ({ title, description }) => {
  const nextTodo = {
    id: createId(),
    title: title.trim(),
    description: description.trim(),
    createdAt: new Date().toISOString(),
  };

  const todos = getTodos();
  const nextTodos = [nextTodo, ...todos];

  saveTodos(nextTodos);

  return nextTodo;
};

export const updateTodo = (id, updates) => {
  const todos = getTodos();
  let updatedTodo = null;

  const nextTodos = todos.map((todo) => {
    if (todo.id !== id) {
      return todo;
    }

    updatedTodo = {
      ...todo,
      ...updates,
      title: updates.title.trim(),
      description: updates.description.trim(),
    };

    return updatedTodo;
  });

  saveTodos(nextTodos);

  return updatedTodo;
};

export const deleteTodo = (id) => {
  const todos = getTodos();
  const nextTodos = todos.filter((todo) => todo.id !== id);
  const wasDeleted = nextTodos.length !== todos.length;

  if (wasDeleted) {
    saveTodos(nextTodos);
  }

  return wasDeleted;
};
