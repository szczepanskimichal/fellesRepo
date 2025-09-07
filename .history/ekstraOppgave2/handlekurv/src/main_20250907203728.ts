import {model} from './Model/model';
import { updateViewProductsPage } from '../Views/productsView.js';
import { updateViewProductDetailPage } from '../Views/productDetailView.js';
import { updateViewCartPage } from '../Views/cartView.js';
function updateView() {
    if (model.app.currentPage === 'products') {
        updateViewProductsPage();
    } else if (model.app.currentPage === 'product-detail') {
        updateViewProductDetailPage();
    } else if (model.app.currentPage === 'cart') {
        updateViewCartPage();
    }
}
updateView();