function updateView(model: unknown): HTMLElement {
    const mainElement = document.createElement('h1');
    mainElement.textContent = 'Todoliste';
    return mainElement;
}

export {updateView};