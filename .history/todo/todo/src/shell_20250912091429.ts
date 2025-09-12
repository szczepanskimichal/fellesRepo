import { updateView } from './pure/view';
import type { Model } from './types';
import { deleteTask, addTask, toggleTaskDone } from './pure/controllers';

function render(model: Model, action:string | null, value:any): void {
    if(action === "delete"){
        model.tasks.splice(value, 1);
    }
    const app = document.getElementById("app")!;
    const handleEvent=('delete', (index:number) => render(model, value, action));
    app.replaceChildren(element);
}

export { render };