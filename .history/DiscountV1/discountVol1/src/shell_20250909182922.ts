import { model } from "./model";
import { calculateDiscount } from "./pure/controller";



 function render(): void {
    const newModel = calculateDiscount(model);
    console.log(newModel);
    updateView(newModel);
    
}

export { render };