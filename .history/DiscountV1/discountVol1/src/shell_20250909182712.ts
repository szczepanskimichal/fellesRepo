import { model } from "./model";
import { calculateDiscount } from "./pure/controller";



 function render(): void {
    const newModel = calculateDiscount(model);
  
}

export { beregnDiscount };