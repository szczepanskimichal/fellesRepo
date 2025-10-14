import type { Model } from '../types';

import { ClickerSmiley } from '../components/ClickerSmiley';
import { PointsInfo } from '../components/PointsInfo';
import { BuyUpgradeBox } from '../components/CreateSomething';
import { BuyUpgradeButton, BuySuperUpgradeButton, RandomUpgradeDowngradeButton, ResetButton, shiftBackgroundColorButton } from '../components/BuyUpgradeButton';
import { BilLIste, RedList } from '../components/createListFactory';


// CALCULATION: Pure function that creates virtual DOM tree
// Takes model and event handler, returns new DOM structure
// No side effects - just creates new elements without modifying existing DOM
export function MainView(model: Model, handleEvent: (event: string) => void): HTMLElement {
    const mainElement: HTMLElement = document.createElement('div');
    // const image: HTMLElement = ClickerSmiley(handleEvent)(model.smileyIndex);
    const smileyGroup = document.createElement('div');
    const shiftBackgroundColor: HTMLButtonElement = shiftBackgroundColorButton(handleEvent);
    console.log('Background color button created:', shiftBackgroundColor);
    mainElement.style.background = model.backgroundColor;
    console.log('Setting background color to:', model.backgroundColor);
    mainElement.style.color = model.color;
    mainElement.appendChild(shiftBackgroundColor);
    smileyGroup.style.display = 'flex';
    smileyGroup.style.gap = '1rem';
    const image: HTMLElement = ClickerSmiley(handleEvent)(  model.smileyIndex);
    const reset = ResetButton(handleEvent);
    smileyGroup.append(image);
    const pointsInfo: HTMLElement = PointsInfo(model.points);
    mainElement.append(smileyGroup, pointsInfo);
    
    mainElement.append(RedList(['Rød1', 'Rød2', 'Rød3']));
    mainElement.append(RedList(['Rød1', 'Rød2', 'Rød3', 'Rød4', 'Rød5']));
    mainElement.append(BilLIste);
    // Conditional rendering based on model state (still pure - just branching logic)
    if (model.points >= 10) {
        const upgrade: HTMLElement = BuyUpgradeButton(handleEvent);
        const upgradeBox: HTMLElement = BuyUpgradeBox(handleEvent);
        mainElement.append(upgrade, upgradeBox);
    }
    if (model.points >= 100) {
        const BuySuperUpgrade: HTMLElement = BuySuperUpgradeButton(handleEvent); 
        mainElement.append(BuySuperUpgrade);
    }
    if (model.points >= 1000) {
        const RandomUpgradeDowngrade: HTMLButtonElement = RandomUpgradeDowngradeButton(handleEvent);
        mainElement.append(RandomUpgradeDowngrade);
    }
    mainElement.append(reset);
    

    return mainElement;
}
