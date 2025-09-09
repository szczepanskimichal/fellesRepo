import { initialModel } from "./model";
import { updateView } from "../view";



function calculateDiscount() {
    const discountFunction = discounts[initialModel.discountType];
    // console.log(discountFunction);
    initialModel.newPrice = discountFunction(initialModel.price);
    updateView(initialModel);
}

export { calculateDiscount };