import type { Model } from '../types';

function updateView(model: Model): HTMLElement {
    const mainElement = document.createElement('h1');
    mainElement.textContent = 'Todoliste';
    return mainElement;
}

export {updateView};