
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


import { model } from "../model";
import { updateView } from "../pure/view";
import type { Model } from "../types";

function doClickImpl(): void {
    
        
        model.points += model.pointsPerClick,
         model.smileyIndex = 1 - model.smileyIndex,
        updateView();
    
}

function buyUpgradeImpl(): void {
    if (model.points < 10) return; 
        model.points -= 10,
        model.pointsPerClick ++
    updateView();
}

export { doClickImpl, buyUpgradeImpl };
