import model from './Model/model';

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