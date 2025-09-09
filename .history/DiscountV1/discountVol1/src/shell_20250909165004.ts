import { model } from "./model";
// import { updateView } from "../view";
import { calculateDiscount } from "./pure/controller";
import { updateView } from "./pure/view";



 function beregnDiscount(): void {
    const newModel = calculateDiscount(model);
    updateView(newModel);
}
    // const discountFunction = discounts[newModel.discountType];
    // newModel.newPrice = discountFunction(newModel.price);
    // // updateView(newModel);
    // calculateDiscount(newModel);

    // const discountFunction = discounts[model.discountType];
    // // console.log(discountFunction);
    // model.newPrice = discountFunction(model.price);
    // updateView(model);

    export { beregnDiscount };