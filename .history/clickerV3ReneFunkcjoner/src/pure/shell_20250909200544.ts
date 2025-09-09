import { model } from "../model";
import {doClick, buyUpgrade} from "./controller";
import { updateView } from "../pure/view";



function render(): void {
    if(action==="click") {
        const newModel = doClick(model);
    }
    const element = updateView(newModel);
    document.getElementById('app')!.replaceWith(element);
    
}


export { render };