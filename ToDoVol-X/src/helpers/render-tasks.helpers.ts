import type { Task } from "../types";

export const renderTasks = (tasks: Task[], taskContainerElement:HTMLElement) => {
  taskContainerElement.innerHTML = '';
  tasks.forEach((task, index) => { 
    const taskElement:HTMLElement = document.createElement('li');
    // dodaje tutaj kategorie, sprawdz w developer tools
    if (task.category) {
      // konwertuje nazwe kategorii na nazwe klasy CSS
      const cssClassName = task.category.toLowerCase().replace('others', 'other');
      taskElement.classList.add(cssClassName);
    }
    const id: string = `task-${index}`;
    const labelElement:HTMLElement = document.createElement('label');
    labelElement.textContent = task.title;
    labelElement.setAttribute('for', id);
    const checboxElement: HTMLInputElement = document.createElement('input');
    checboxElement.type = 'checkbox';
    checboxElement.title = task.title;
    checboxElement.id = id;
    //te 2 linijki ponizej ustawia checkbox jako zaznaczony
    //  jezeli task.done jest true i odpowiada za poprawne odznaczanie/zaznaczanie
    checboxElement.checked = task.done;
    checboxElement.addEventListener('change', () => {
      task.done = !task.done;
    })
    // tworze i wstrzykuje elementy!!!!!!!!!!
    taskElement.appendChild(checboxElement); 
    taskElement.appendChild(labelElement);
    taskContainerElement.appendChild(taskElement);
  });
};