import { model } from "./pure/model";
// import { updateView } from "../view";
import { calculateDiscount } from "./pure/controller";
import { updateView } from "./view";

const discounts = {
    percentDiscount: (price: number) => price * 0.8, // 20% rabatt
    fixedDiscount: (price: number) => price - 50, // Fast 50kr rabatt
    percentDiscountWithMax: (price: number) => Math.max(price * 0.6, price - 100) // 40% rabatt
};

function beregnDiscount(): void {
    const newModel = doClickImpl(model);
    const element=updateView(newModel);
    const app = document.getElementById("app");
    app.replaceChildren(element);
}
    // const discountFunction = discounts[newModel.discountType];
    // newModel.newPrice = discountFunction(newModel.price);
    // // updateView(newModel);
    // calculateDiscount(newModel);
}
    // const discountFunction = discounts[model.discountType];
    // // console.log(discountFunction);
    // model.newPrice = discountFunction(model.price);
    // updateView(model);
