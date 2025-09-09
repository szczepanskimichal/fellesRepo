import { initialModel } from "./model";
// import { updateView } from "../view";
import { calculateDiscount } from "./controller";

const discounts = {
    percentDiscount: (price: number) => price * 0.8, // 20% rabatt
    fixedDiscount: (price: number) => price - 50, // Fast 50kr rabatt
    percentDiscountWithMax: (price: number) => Math.max(price * 0.6, price - 100) // 40% rabatt
};

function beregnDiscount() {
    const discountFunction = discounts[initialModel.discountType];
    // console.log(discountFunction);
    initialModel.newPrice = discountFunction(initialModel.price);
    updateView(initialModel);
}