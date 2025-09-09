import { model } from "./model";
import { updateView } from "../view";
import { discounts } from "./discounts";



function calculateDiscount (beregnDiscount) {
    const discountFunction = discounts[model.discountType];
    // console.log(discountFunction);
    model.newPrice = discountFunction(model.price);
    updateView(model);
}

export { calculateDiscount };