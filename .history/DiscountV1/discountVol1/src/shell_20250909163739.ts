import { model } from "./pure/model";
// import { updateView } from "../view";
import { calculateDiscount } from "./pure/controller";
import { updateView } from "./view";



function beregnDiscount(): void {
    const newModel = calculateDiscount(model);
    const element=updateView(newModel);
    const app = document.getElementById("app");
    app.replaceChildren(element);
}
    // const discountFunction = discounts[newModel.discountType];
    // newModel.newPrice = discountFunction(newModel.price);
    // // updateView(newModel);
    // calculateDiscount(newModel);

    // const discountFunction = discounts[model.discountType];
    // // console.log(discountFunction);
    // model.newPrice = discountFunction(model.price);
    // updateView(model);
