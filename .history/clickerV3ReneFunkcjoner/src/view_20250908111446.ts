import { model } from './model';
import { doClick, buyUpgrade } from './controller.ts';

export function updateView(): void {
    var smiley: string = model.smileyIndex == 0 ? '😀' : '😁';

    const app: HTMLElement = document.getElementById('app')!;
    app.replaceChildren();
    const image: HTMLElement = document.createElement('div');
    const pointsInfo: HTMLElement = document.createElement('div');
    const upgrade: HTMLElement = document.createElement('button');
    image.textContent = smiley;
    pointsInfo.textContent = '' + model.points;
    upgrade.textContent = 'Kjøp oppgradering (10 poeng)';
    app.append(image, pointsInfo, upgrade);

    // image.addEventListener('click', doClick);
    // upgrade.addEventListener('click', buyUpgrade);

    image.addEventListener('click', () => {
        const newModel = doClick(model);
        model.points = newModel.points;
        model.smileyIndex = newModel.smileyIndex;
        updateView();
    });
    
    upgrade.addEventListener('click', () => {
        const newModel = buyUpgrade(model);
        model.points = newModel.points;
        model.pointsPerClick = newModel.pointsPerClick;
        updateView();
    });
}