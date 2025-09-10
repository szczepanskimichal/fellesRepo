import './style.css'




interface Todo{
     content: string,
     isComplete: boolean,
     readonly id:string
}

let todos:Todo[] = [];

const todosContainer = document.querySelector('.todos-container')!;

function genrateTodo(id: string, content:string, isComplete:boolean){
     const itemContainer:HTMLDivElement = document.createElement('div');
     itemContainer.classList.add('todo-item');

     // checkbox
     const checkbox: HTMLInputElement = document.createElement('input');
     checkbox.type = "checkbox";
     checkbox.checked = isComplete
     checkbox.onchange = () => {
          todos.find(todo => {
               if(todo.id === id) todo.isComplete = checkbox.checked;

               // save updated todo
               localStorage.setItem('todos', JSON.stringify(todos));
          })
          todoText.className = checkbox.checked ? 'textCut' : '';
     }

     // paragraph content
     const todoText:HTMLParagraphElement = document.createElement('p');
     todoText.innerHTML = content;
     todoText.className = isComplete ? 'textCut' : '';

     // delete button
     const btnDelete: HTMLButtonElement = document.createElement('button');
     btnDelete.textContent = 'X';
     btnDelete.onclick = () => {
          todos = todos.filter(todo => todo.id !== id);
          localStorage.setItem('todos', JSON.stringify(todos));
          renderTodos(todos);
     }

     itemContainer.append(checkbox, todoText, btnDelete);
     todosContainer.appendChild(itemContainer);

}

// add todo
const form = document.getElementById('myForm')!;
form.onsubmit = (e: SubmitEvent) => {
     e.preventDefault();
     const inputElement = document.getElementById('inputTodo') as HTMLInputElement;
     let value:string = inputElement.value;

     const newTodo:Todo = {
          id: crypto.randomUUID(),
          content: value,
          isComplete: false
     }

     todos?.push(newTodo);
     inputElement.value = "";

     localStorage.setItem('todos', JSON.stringify(todos));
     
     renderTodos(todos);
    }
    
    
    function renderTodos(todos: Todo[]){
         todosContainer.innerHTML = "";
         todos.forEach(todo => {
              genrateTodo(todo.id, todo.content, todo.isComplete);
         })
    }

const jsonTodos = localStorage.getItem('todos')!;
const storedTodos : Todo[] = JSON.parse(jsonTodos);
todos = storedTodos;
renderTodos(todos);

  