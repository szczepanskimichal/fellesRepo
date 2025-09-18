import {mainView} from './commonView';
import type { Model } from './types';

function productView(model: Model): HTMLElement {
    mainView();
    const main = document.getElementById('main');
    main!.innerHTML= /*HTML*/`
    <h1>Product Page</h1>
    <p>list of products will be displayed here</p>
    <p>hello Charles :)</p>
    <p>hei Michal :)</p>
    
    `;
}

export { productView}

