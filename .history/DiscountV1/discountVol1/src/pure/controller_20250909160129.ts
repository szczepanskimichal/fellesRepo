import { initialModel } from "./model";
import { updateView } from "../view";
import { beregnDiscount } from "../pure/shell";



function calculateDiscount(beregnDiscount) {
    const discountFunction = discounts[initialModel.discountType];
    // console.log(discountFunction);
    initialModel.newPrice = discountFunction(initialModel.price);
    updateView(initialModel);
}

export { calculateDiscount };