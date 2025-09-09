
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


function doClick(model:Model): Model {     
    //IMPERATIVE VERSJON
    // model.points += model.pointsPerClick;
    // model.smileyIndex = 1 - model.smileyIndex;
    // pointsPerClick: model.pointsPerClick,
    // ;

    //FUNKSJONELL VERSJON!!!!!!!!!!!!!!!!!!!!!!!!!
    // return Object.freeze({
    //     points: model.points + model.pointsPerClick,
    //     pointsPerClick: model.pointsPerClick,
    //     smileyIndex: 1 - model.smileyIndex
    // });

// or

    return Object.freeze({
        ...model,
        points: model.points + model.pointsPerClick,
        smileyIndex: 1 - model.smileyIndex
    });
}

function buyUpgrade(model:Model): Model {

    
    //IMPERATIVE VERSJON
    // if (model.points < 10) return model;
    // return Object.freeze({
    //     points: model.points - 10,
    //     pointsPerClick: model.pointsPerClick + 1,
    //     smileyIndex: model.smileyIndex
    // });
    if (model.points < 10) return model;
    return Object.freeze({
        ...model,
        points: model.points - 10,
        pointsPerClick: model.pointsPerClick + 1,
    });
}

export { doClick, buyUpgrade };
