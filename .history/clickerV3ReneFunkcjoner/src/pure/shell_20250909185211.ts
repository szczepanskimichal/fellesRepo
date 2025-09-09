import { model } from "../model";
import {doClickImpl, buyUpgradeImpl} from "./controller";

// import type { Model } from "../types";
// import { updateView } from "./view";

function doClick(model: Model): Model {
    return {
        ...model,
        points: model.points + model.pointsPerClick,
        smileyIndex: 1 - model.smileyIndex
    };
}


// function buyUpgrade(model: Model): Model {
//     if (model.points < 10) return model;
//     return {
//         ...model,
//         points: model.points - 10,
//         pointsPerClick: model.pointsPerClick + 1
//     };
// }