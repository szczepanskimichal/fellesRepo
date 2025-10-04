const taskNameInputElement: HTMLInputElement = document.querySelector('#name')!;
const addButtonElement: HTMLButtonElement = document.querySelector('button')!;
const taskContainerElement: HTMLElement = document.querySelector('.tasks')!;


const tasks: {
  name: string;
  done: boolean;
}[] = [
  { name: "Kast soppel", done: false },
  { name: "trene", done: true },
  { name: "lage mat", done: true },
  { name: "vaske klær", done: false },
  { name: "lage matpakke", done: false },
  { name: "handle mat", done: false }
];

const render = () => {
  taskContainerElement.innerHTML = '';
  tasks.forEach((task, index) => { 
    const taskElement:HTMLElement = document.createElement('li');
    const id: string = `task-${index}`;
    const labelElement:HTMLElement = document.createElement('label');
    labelElement.textContent = task.name;
    labelElement.setAttribute('for', id);
    const checboxElement: HTMLInputElement = document.createElement('input');
    checboxElement.type = 'checkbox';
    checboxElement.name = task.name;
    checboxElement.id = id;
    //te 2 linijki ponizej ustawia checkbox jako zaznaczony
    //  jezeli task.done jest true i odpowiada za poprawne odznaczanie/zaznaczanie
    checboxElement.checked = task.done;
    checboxElement.addEventListener('change', (event: Event) => {
      task.done = !task.done;
    })
    // tworze i wstrzykuje elementy!!!!!!!!!!
    taskElement.appendChild(checboxElement); 
    taskElement.appendChild(labelElement);
    taskContainerElement.appendChild(taskElement);
  });
};

const addTask =(taskName:string) => {
  tasks.push({ name: taskName, done: false }); // Add the new task to the tasks array
}

addButtonElement.addEventListener('click', (event: Event) => {
  event.preventDefault();
  const taskName = taskNameInputElement.value.trim();
  if (taskName) {
    addTask(taskName);
    taskNameInputElement.value = ''; // Clear the input field
    render(); // Re-render the task list
  }
});
render();