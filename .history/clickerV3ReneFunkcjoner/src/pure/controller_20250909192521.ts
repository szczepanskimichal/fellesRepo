
// import { model } from './model';
// import { updateView } from './view';    

// function doClick(): void {
//     model.points += model.pointsPerClick;
//     model.smileyIndex = 1 - model.smileyIndex;
//     updateView();
// }

// function buyUpgrade(): void {
//     if (model.points < 10) return;
//     model.points -= 10;
//     model.pointsPerClick++;
//     updateView();
// }
// import type { Model } from '../types.ts';


import type { Model } from "../types";
import { model } from "../model";


function doClickImpl(model:Model): Model {        
    model.points += model.pointsPerClick;
    model.smileyIndex = 1 - model.smileyIndex;
}

function buyUpgradeImpl(model:Model): Model {
    if (model.points < 10) return; 
    model.points -= 10;
    model.pointsPerClick++;
}

export { doClickImpl, buyUpgradeImpl };
