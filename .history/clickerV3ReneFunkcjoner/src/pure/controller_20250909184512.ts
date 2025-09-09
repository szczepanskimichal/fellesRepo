
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

type Model = {
    points: number;
    pointsPerClick: number;
    smileyIndex: number;
};

function doClick(model: Model): Model {
    return {
        ...model,
        points: model.points + model.pointsPerClick,
        smileyIndex: 1 - model.smileyIndex
    };
}

function buyUpgrade(model: Model): Model {
    if (model.points < 10) return model;
    return {
        ...model,
        points: model.points - 10,
        pointsPerClick: model.pointsPerClick + 1
    };
}

// export { doClick, buyUpgrade };
export { doClick, buyUpgrade };
