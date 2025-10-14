import type { Model } from './types';

// CALCULATION: Pure function - same input always gives same output, no side effects
function doClick(model: Model): Model {
    // Funksjonell versjon 2    
    return Object.freeze({
        ...model,
        points: model.points + model.pointsPerClick,
        smileyIndex: 1 - model.smileyIndex,
    });

    // Imperativ versjon:
    // model.points += model.pointsPerClick;
    // model.smileyIndex = 1 - model.smileyIndex;

    // Funksjonell versjon 1
    // return Object.freeze({
    //     points: model.points + model.pointsPerClick,
    //     smileyIndex: 1 - model.smileyIndex,
    //     pointsPerClick: model.pointsPerClick,
    // });
}

// CALCULATION: Pure function - deterministic, no side effects
function buyUpgrade(model: Model): Model {
    // Funksjonell versjon 
    if (model.points < 10) return model;

    return Object.freeze({
        ...model,
        points: model.points - 10,
        pointsPerClick: model.pointsPerClick + 1
    });
    // Imperativ versjon:
    // if (model.points < 10) return;
    // model.points -= 10;
    // model.pointsPerClick++;
}

// CALCULATION: Pure function - deterministic, no side effects
function buySuperUpgrade(model: Model): Model {
    // Funksjonell versjon 
    if (model.points < 100) return model;

    return Object.freeze({
        ...model,
        points: model.points - 100,
        pointsPerClick: model.pointsPerClick + 100
    });
}

// CALCULATION: Pure function - deterministic with given inputs
function applyRandomPointsChange(model: Model, change: number): Model {
    return Object.freeze({
        ...model,
        points: Math.max(0, model.points + change),
    });
}

// ACTION: Has side effects (console.log) and depends on external rng function
// The rng parameter makes it testable, but console.log is still a side effect
const makeUpgradeDowngrade = (rng: () => number) => (model: Model): Model => {
    const change = Math.round((rng() - 0.5) * 2000);
    console.log(`Random change: ${change}`); // Side effect!
    return applyRandomPointsChange(model, change);
};

function reset(): Model {
    return Object.freeze({
        points: 0,
        smileyIndex: 0,
        pointsPerClick: 1,
        backgroundColor: '#ffffff',
        color: '#000000',
    });
}
function shiftBackgroundColor(model: Model){
    // console.log('shiftBackgroundColor called, current color:', model.backgroundColor);
    const newColor = model.backgroundColor === '#ffffff' ? '#000000' : '#ffffff';
    const newTextColor = newColor === '#ffffff' ? '#000000' : '#ffffff';
    // console.log('new color will be:', newColor);
    console.log('new text color will be:', newTextColor);
    return Object.freeze({
        ...model,
        backgroundColor: newColor,
        color: newTextColor,
    })
    
}

export { doClick, buyUpgrade, buySuperUpgrade, applyRandomPointsChange, makeUpgradeDowngrade, reset, shiftBackgroundColor };