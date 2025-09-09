
export function updateView(model:Model): HTMLElement {
    const smiley: string = model.smileyIndex == 0 ? '😀' : '😁';

    // const app: HTMLElement = document.getElementById('app')!;
    // app.replaceChildren();
    const mainElement: HTMLElement = document.createElement('div');
    const image: HTMLElement = document.createElement('div');
    const pointsInfo: HTMLElement = document.createElement('div');
    const upgrade: HTMLElement = document.createElement('button');
    image.textContent = smiley;
    pointsInfo.textContent = '' + model.points;
    upgrade.textContent = 'Kjøp oppgradering (10 poeng)';
    mainElement.append(image, pointsInfo, upgrade);

    // image.addEventListener('click', doClick);
    // upgrade.addEventListener('click', buyUpgrade);

    // image.addEventListener('click', () => {
    //     const newModel = doClick(model);
    //     model.points = newModel.points;
    //     model.smileyIndex = newModel.smileyIndex;
    //     updateView();
    // });
    
    // upgrade.addEventListener('click', () => {
    //     const newModel = buyUpgrade(model);
    //     model.points = newModel.points;
    //     model.pointsPerClick = newModel.pointsPerClick;
    //     updateView();
    // });
}