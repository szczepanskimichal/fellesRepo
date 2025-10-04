const taskNameInputElement: HTMLInputElement = document.querySelector('#name')!;
const addButtonElement: HTMLButtonElement = document.querySelector('button')!;
const taskContainerElement: HTMLElement = document.querySelector('.tasks')!;

const tasks: string[] = ["Kast soppel", "trene", "lage mat", "vaske klær", "lage matpakke", "handle mat"];

const render = () => {
  taskContainerElement.innerHTML = ''; // Clear existing tasks
  tasks.forEach((task) => { // Iterate over each task
    const taskElement: HTMLElement = document.createElement('li'); // Create a new list item
    taskElement.textContent = task; // Set the text content to the task
    taskContainerElement.appendChild(taskElement); // Append the list item to the task container
  });
};

const addTask =(task:string) => {
  tasks.push(task);
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