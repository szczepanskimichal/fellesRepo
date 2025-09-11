// src/main.ts
import { initialModel, Model } from "./model";
import { render } from "./view";

const STORAGE_KEY = "todo-model";

// wczytanie modelu z localStorage
function loadModel(): Model {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : initialModel;
}

// zapis modelu do localStorage
function saveModel(model: Model) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(model));
}

let model: Model = loadModel();

function update(newModel: Model) {
  model = newModel;
  saveModel(model);        // shell integruje ze storage
  render(model, update);
}

// start
document.addEventListener("DOMContentLoaded", () => {
  const app = document.createElement("div");
  app.id = "app";
  document.body.appendChild(app);

  render(model, update);
});
