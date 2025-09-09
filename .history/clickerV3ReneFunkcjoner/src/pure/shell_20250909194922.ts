import { model } from "../model";
import {doClick, buyUpgrade} from "./controller";
import { updateView } from "../pure/view";



function render(model:Model): Model {
    const newModel = doClick(model);
    const element = updateView(newModel);
    document.getElementById('app')!.replaceWith(element);
    
}


