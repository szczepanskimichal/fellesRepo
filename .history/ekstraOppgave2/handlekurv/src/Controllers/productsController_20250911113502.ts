export function loadProducts() {
  model.app.currentPage = 'products';
  updateView();
}

export function navigateToProducts() {
  loadProducts();
}
