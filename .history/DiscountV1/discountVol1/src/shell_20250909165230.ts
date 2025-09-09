import { model } from "./model";
// import { updateView } from "../view";
import { calculateDiscount } from "./pure/controller";
import { updateView } from "./pure/view";



 function beregnDiscount(): void {
    const newModel = calculateDiscount(model);
  

    export { beregnDiscount };