import type { Model } from "./types";
import {beregnDiscount} from "../shell";

const discounts = {
    percentDiscount: (price: number) => price * 0.8, // 20% rabatt
    fixedDiscount: (price: number) => price - 50, // Fast 50kr rabatt
    percentDiscountWithMax: (price: number) => Math.max(price * 0.6, price - 100) // 40% rabatt
};


function calculateDiscount (beregnDiscount) {
    const discountFunction = discounts[model.discountType];
    // console.log(discountFunction);
    newModel.newPrice = discountFunction(newModel.price);
    updateView(newModel);
}

export { calculateDiscount };