import './style.css';
const taskNameInputElement: HTMLInputElement = document.querySelector('#name')!;
const addButtonElement: HTMLButtonElement = document.querySelector('button')!;
const taskContainerElement: HTMLElement = document.querySelector('.tasks')!;

type Category = 'Personal' | 'Work' | 'Shopping' | 'Others';
interface Task{
  title: string;
  done: boolean;
  category?: Category; // ogranicza kategorie do tych 4 wartosci, 
  // union types!!!
}

const categories: string[] = ['Personal', 'Work', 'Shopping', 'Others'];
const tasks: Task[] = [
  { title: "Kast soppel", done: false, category: "Others" },
  { title: "trene", done: true, category: "Personal" },
  { title: "lage mat", done: true, category: "Personal" },
  { title: "vaske klær", done: false, category: "Personal" },
  { title: "lage matpakke", done: false, category: "Personal" },
  { title: "handle mat", done: false, category: "Shopping" },
];

const render = () => {
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

const addTask =(taskName: Task) => {
  tasks.push(taskName); // Add the new task to the tasks array
}

addButtonElement.addEventListener('click', (event: Event) => {
  const selectedRadioElement : HTMLInputElement = document.querySelector("input[type='radio']:checked")!;
  const selectedCategory: Category = selectedRadioElement.value as Category;
  event.preventDefault(); // Prevent the default form submission behavior
  
    event.preventDefault();
    addTask({
      title: taskNameInputElement.value,
      done: false, 
      category: selectedCategory});
    render();
});
addTask({title: "Lære videre", done: true, category: "Others"});
render();