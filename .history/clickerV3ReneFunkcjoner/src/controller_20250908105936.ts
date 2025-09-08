
import { model } from './model';
import { updateView } from './view';

function doClick(): void {
    model.points += model.pointsPerClick;
    model.smileyIndex = 1 - model.smileyIndex;
    updateView();
}

function buyUpgrade(): void {
    if (model.points < 10) return;
    model.points -= 10;
    model.pointsPerClick++;
    updateView();
}

export { doClick, buyUpgrade };
