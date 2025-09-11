
type TodoFilter = "all" | "active" | "completed";

const TodoFilterEnum = {
  All: "all" as "all",
  Active: "active" as "active",
  Completed: "completed" as "completed"
};

interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

interface InitialModel{
  todos: Todo[];
  nextId: number;
}

interface Model extends InitialModel{
  filter: TodoFilter;
}

const initialModel: Model = {
  todos: [],
  nextId: 1,
  filter: "all",
};


let model: Model = { ...initialModel };

function update(newModel: Model) {
  model = newModel;
  render(model, update);
}

document.addEventListener("DOMContentLoaded", () => {
  const app = document.createElement("div");
  app.id = "app";
  document.body.appendChild(app);
  render(model, update);
});


function addTodo(model: Model, text: string): Model {
  const t = text.trim();
  if (!t) return model;
  const newTodo: Todo = { id: model.nextId, description: String(t), completed: false };
  return {
    ...model,
    todos: [...model.todos, newTodo],
    nextId: model.nextId + 1,
  };
}

function toggleTodo(model: Model, id: number): Model {
  return {
    ...model,
    todos: model.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  };
}

function deleteTodo(model: Model, id: number): Model {
  return {
    ...model,
    todos: model.todos.filter(todo => todo.id !== id),
  };
}

function setFilter(model: Model, filter: TodoFilter): Model {
  return { ...model, filter };
}

function clearCompleted(model: Model): Model {
  return { ...model, todos: model.todos.filter(t => !t.completed) };
}

function getFilteredTodos(model: Model) {
  switch (model.filter) {
    case "active":
      return model.todos.filter(t => !t.completed);
    case "completed":
      return model.todos.filter(t => t.completed);
    default:
      return model.todos;
  }
}

function render(model: Model, dispatch: (m: Model) => void) {
  const root = document.getElementById("app");
  if (!root) return;
  root.innerHTML = "";

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

  const filters = document.createElement("div");
  Object.values(TodoFilterEnum).forEach(f => {
    const btn = document.createElement("button");
    btn.textContent = f;
    if (model.filter === f) btn.disabled = true;
    btn.addEventListener("click", () => dispatch(setFilter(model, f)));
    filters.appendChild(btn);
  });
  root.appendChild(filters);

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
