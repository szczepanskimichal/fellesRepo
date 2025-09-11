import { model } from '../Model/model';

export function loadProducts() {
  model.app.currentPage = 'products';
  updateView();
}

export function navigateToProducts() {
  loadProducts();
}
export function getAllProducts() {
  return model.products;
}

export function getCartItemCount() {
  return model.cart.length;
}


