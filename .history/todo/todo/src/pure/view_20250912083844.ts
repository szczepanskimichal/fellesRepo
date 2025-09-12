
import type { Model } from '../types';



function updateView(model: Model, handleEvent:Function) : HTMLElement {
    const mainElement = document.createElement('div');
    // console.log('updateView called with model:', model); 
    for (let task of model.tasks) {
        const task=model.tasks[index];
        const taskElement = document.createElement('li');
        taskElement.textContent = task.description;
        if (task.isFinished) {
            taskElement.style.textDecoration = 'line-through';
        }
        const button = document.createElement('button');
        button.textContent = '×';
        taskElement.append(button);
        mainElement.append(taskElement);
        taskElement.addEventListener('click', () => handleEvent("delete", index));
    }
    return mainElement;
}

export { updateView };