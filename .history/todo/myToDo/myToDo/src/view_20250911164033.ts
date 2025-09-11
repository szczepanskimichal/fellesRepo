// src/view.ts
import type { Model } from "./model";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
  getFilteredTodos,
  clearCompleted,
} from "./update";

export function render(model: Model, dispatch: (m: Model) => void) {
  const root = document.getElementById("app");
  if (!root) return;
  root.innerHTML = "";

  // input + add button
  const controls = document.createElement("div");

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "What needs to be done?";
  controls.appendChild(input);

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add";
  addBtn.addEventListener("click", () => {
    dispatch(addTodo(model, input.value));
    input.value = "";
  });
  controls.appendChild(addBtn);

  root.appendChild(controls);

  // filtry
  const filters = document.createElement("div");
  (["all", "active", "completed"] as const).forEach(f => {
    const btn = document.createElement("button");
    btn.textContent = f;
    if (model.filter === f) btn.disabled = true;
    btn.addEventListener("click", () => dispatch(setFilter(model, f)));
    filters.appendChild(btn);
  });
  root.appendChild(filters);

  // lista
  const ul = document.createElement("ul");
  const visible = getFilteredTodos(model);
  visible.forEach(todo => {
    const li = document.createElement("li");

    const chk = document.createElement("input");
    chk.type = "checkbox";
    chk.checked = todo.completed;
    chk.addEventListener("change", () => dispatch(toggleTodo(model, todo.id)));
    li.appendChild(chk);

    const label = document.createElement("span");
    label.textContent = todo.description;
    if (todo.completed) label.style.textDecoration = "line-through";
    li.appendChild(label);

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.addEventListener("click", () => dispatch(deleteTodo(model, todo.id)));
    li.appendChild(del);

    ul.appendChild(li);
  });
  root.appendChild(ul);

  // footer
  const footer = document.createElement("div");

  const clearBtn = document.createElement("button");
  clearBtn.textContent = "Clear completed";
  clearBtn.addEventListener("click", () => dispatch(clearCompleted(model)));
  footer.appendChild(clearBtn);

  const counts = document.createElement("div");
  counts.textContent = `All: ${model.todos.length}, Active: ${
    model.todos.filter(t => !t.completed).length
  }, Completed: ${model.todos.filter(t => t.completed).length}`;
  footer.appendChild(counts);

  root.appendChild(footer);
}
