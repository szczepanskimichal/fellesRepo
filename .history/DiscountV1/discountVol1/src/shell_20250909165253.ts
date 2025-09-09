import { model } from "./model";
import { calculateDiscount } from "./pure/controller";



 function beregnDiscount(): void {
    const newModel = calculateDiscount(model);
  

    export { beregnDiscount };