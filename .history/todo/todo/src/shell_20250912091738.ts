import { updateView } from './pure/view';
import type { Model } from './types';
import { deleteTask, addTask, toggleTaskDone } from './pure/controllers';

function render(model: Model, action:string | null, value:any): void {
    if(action === "delete") model = deleteTask(model, value);
    if(action === "add") model = addTask(model, value);
    if(action === "toggle") model = toggleTaskDone(model, value);
    const element = updateView(model, render.bind(null, model));
    const app = document.getElementById("app")!;
    const handleEvent=('delete', (index:number) => render(model, value, action));
    app.replaceChildren(element);
}

export { render };