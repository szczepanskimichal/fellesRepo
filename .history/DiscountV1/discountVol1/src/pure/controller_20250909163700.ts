import { model } from "./model";
import { updateView } from "../view";
import {beregnDiscount, discount} from "../shell";


function calculateDiscount (beregnDiscount) {
    const discountFunction = discounts[model.discountType];
    // console.log(discountFunction);
    model.newPrice = discountFunction(model.price);
    updateView(model);
}

export { calculateDiscount };