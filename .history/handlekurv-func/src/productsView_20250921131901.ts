import {mainView} from './commonView';
import type { Model } from './types';

function productView(model: Model): HTMLElement {
    mainView();
    const main = document.getElementById('main');
    let (product of model.products){
        const productCard = document.createElement('article');
        productCard.className='productCard';
        
    }
}

export { productView}

