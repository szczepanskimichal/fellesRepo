import { shiftBackgroundColorButton } from './BuyUpgradeButton';
const createBox =
    (label: string) =>
    (eventName: string) =>
    (dispatch: (event: string) => void): HTMLDivElement => {
        const element = document.createElement('div');
        element.style.border = '1px solid black';
        element.style.padding = '0.5rem';
        element.style.margin = '0.5rem';
        element.style.display = 'inline-block';
        element.style.cursor = 'pointer';
        element.textContent = label;
        
        // ACTION: addEventListener registers a callback (side effect when clicked)
        element.addEventListener('click', () => dispatch(eventName));
        return element;
    };


// CALCULATION: Partially applied functions - pure until dispatch is provided
export const BuyUpgradeBox = createBox('Reset')('buyUpgrade');
