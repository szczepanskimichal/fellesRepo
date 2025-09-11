// src/update.ts
import type { Model, Todo, TodoFilter } from "./model";

export function addTodo(model: Model, text: string): Model {
  const t = text.trim();
  if (!t) return model;
  const newTodo: Todo = { id: model.nextId, description: String(t), completed: false };
  return {
    ...model,
    todos: [...model.todos, newTodo],
    nextId: model.nextId + 1,
  };
}

export function toggleTodo(model: Model, id: number): Model {
  return {
    ...model,
    todos: model.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  };
}

export function deleteTodo(model: Model, id: number): Model {
  return {
    ...model,
    todos: model.todos.filter(todo => todo.id !== id),
  };
}

export function setFilter(model: Model, filter: TodoFilter): Model {
  return { ...model, filter };
}

export function clearCompleted(model: Model): Model {
  return { ...model, todos: model.todos.filter(t => !t.completed) };
}

export function getFilteredTodos(model: Model) {
  switch (model.filter) {
    case "active":
      return model.todos.filter(t => !t.completed);
    case "completed":
      return model.todos.filter(t => t.completed);
    default:
      return model.todos;
  }
}
