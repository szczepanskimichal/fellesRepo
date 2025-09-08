import {model} from './Model/model';
import { updateViewProductsPage } from './Views/productsView';
import { updateViewProductDetailPage } from './Views/productDetailView';
import { updateViewCartPage } from './Views/cartView';
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