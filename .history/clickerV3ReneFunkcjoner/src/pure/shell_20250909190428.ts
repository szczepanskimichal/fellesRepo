import { model } from "../model";
import {doClickImpl, buyUpgradeImpl} from "./controller";
import type { Model } from "../types";
import { updateView } from "./view";

// import type { Model } from "../types";
// import { updateView } from "./view";

function doClick(model: Model): Model {
    return {
        const newModel = doClickImpl(model);
        const element = updateView(newModel);
        model.points = newModel.points;
        model.smileyIndex = newModel.smileyIndex;
        updateView();
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