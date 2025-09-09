import type { Model } from "../types";

export function updateView(model:Model, handleEvent:Function): HTMLElement {
    const smiley: string = model.smileyIndex == 0 ? '😀' : '😁';

    const mainElement: HTMLElement = document.createElement('div');
    const image: HTMLElement = document.createElement('div');
    const pointsInfo: HTMLElement = document.createElement('div');
    const upgrade: HTMLElement = document.createElement('button');
    image.textContent = smiley;
    pointsInfo.textContent = '' + model.points;
    upgrade.textContent = 'Kjøp oppgradering (10 poeng)';
    mainElement.append(image, pointsInfo, upgrade); // husk om append!"!!!!!!!"
    image.addEventListener('click', () => handleEvent("click"));
    upgrade.addEventListener('click', () => handleEvent("buy"));
    
    return mainElement;
}