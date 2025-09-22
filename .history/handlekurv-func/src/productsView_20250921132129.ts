import {mainView} from './commonView';
import type { Model } from './types';

function productView(model: Model): HTMLElement {
    mainView();
    const main = document.getElementById('main');
    for (let product of model.products){
        const productCard = document.createElement('article');
        productCard.className='productCard';
        const image = document.createElement('div');
        image.className = 'product-image';    
        image.innerText= product.image;
    }
}

export { productView}

