import { model } from "./model";
import { calculateDiscount } from "./pure/controller";
import { updateView } from "./pure/view";



 function render(): void {
    const newModel = calculateDiscount(model);
    const element=updateView(newModel);
    document.getElementById("app")!.replaceWithChildren();
    
}

export { render };