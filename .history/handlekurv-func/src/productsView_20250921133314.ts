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
 const productInfo = document.createElement('div');        productInfo.className = 'product-info';
        const price = document.createElement('p');
        price.className='product.prise';
        price.innerHTML=`<span class"currency">kr</span> <span class="amount">${product.price}</span>`
        const description = document.createElement('p');
        description.className="product-description";
        description.innerText=product.description;
        productInfo.appendChild(price);
        productInfo.appendChild(description);
        const footer = document.createElement('footer');
        footer.className = 'product-footer';
        const button = document.createElement('button');
        button.className = 'btn btn-success';
        button.innerText = 'Legg i handlekurv';
        // button.addEventListener('click', () => addToCart(product.id));
        footer.appendChild(button);
        productCard.appendChild(image);
        productCard.appendChild(productInfo);
        productCard.appendChild(footer);
        mainElement!.appendChild(productCard);
    
    }
    return mainElement;
}

export { productView}

