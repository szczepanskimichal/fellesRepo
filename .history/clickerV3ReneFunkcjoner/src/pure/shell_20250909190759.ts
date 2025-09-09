import { model } from "../model";
import {doClickImpl, buyUpgradeImpl} from "./controller";
import type { Model } from "../types";
import { updateView } from "./view";

// import type { Model } from "../types";
// import { updateView } from "./view";

function doClick(): void {
    const newModel = doClickImpl(model);
    // const element = updateView(newModel);
    // document.getElementById('app')!.replaceWith(element);
}


// function buyUpgrade(model: Model): Model {
//     if (model.points < 10) return model;
//     return {
//         ...model,
//         points: model.points - 10,
//         pointsPerClick: model.pointsPerClick + 1
//     };
// }