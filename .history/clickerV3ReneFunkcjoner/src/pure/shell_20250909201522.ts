import { model } from "../model";
import { doClick, buyUpgrade } from "./controller";
import { updateView } from "../pure/view";


let appModel = model;
function render(action:string): void {
    if(action === "click") appModel = doClick(appModel);
    else if(action === "buy") appModel = buyUpgrade(appModel);
    const element = updateView(appModel);
    document.getElementById('app')!.replaceWith(element);
    
}


export { render };