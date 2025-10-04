import type { Category, Task } from "./types"
import './style.css';
import { renderTasks } from "./helpers/render-tasks.helpers";
import { renderCategories } from "./helpers/render-categories.helpers";

const taskNameInputElement: HTMLInputElement = document.querySelector('#name')!;
const addButtonElement: HTMLButtonElement = document.querySelector('button')!;
const taskContainerElement: HTMLElement = document.querySelector('.tasks')!;
const categoriesContainerElement: HTMLElement = document.querySelector('.categories')!;

let selectedCategory: Category = 'Personal'; // domyślna kategoria

const categories: Category[] = ['Personal', 'Work', 'Shopping', 'Others'];
const tasks: Task[] = [
  { title: "Kast soppel", done: false, category: "Others" },
  { title: "lage mat", done: true, category: "Personal" },
  { title: "handle mat", done: false, category: "Shopping" },
];

const addTask =(taskName: Task) => {
  tasks.push(taskName);
}

const updateSelectedCategory = (newCategory: Category) => {
  selectedCategory = newCategory;
}

addButtonElement.addEventListener('click', (event: Event) => {
  event.preventDefault();
  if (taskNameInputElement.value.trim() !== '') {
    addTask({
      title: taskNameInputElement.value,
      done: false, 
      category: selectedCategory
    });
    taskNameInputElement.value = ''; // wyczyść pole input
    renderTasks(tasks, taskContainerElement); // przerenderuj zadania
  }
});

addTask({title: "Lære videre", done: true, category: "Personal"});
renderCategories(categories, categoriesContainerElement, updateSelectedCategory);
renderTasks(tasks, taskContainerElement);