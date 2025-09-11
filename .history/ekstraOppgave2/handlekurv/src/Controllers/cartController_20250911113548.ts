import { model } from "../Model/model";
import { updateView } from "../Views/cartView";



export function handleAddToCart(productId: number) {
  addToCart(productId);
  updateView();
}

export function handleRemoveFromCart(productId: number) {
  removeFromCart(productId);
  updateView();
}

export function changeQuantity(productId: number, change: number) {
  const cart = getCart();
  const item = cart.find(item => item.productId === productId);

  if (item) {
    const newQuantity = item.quantity + change;
    updateCartQuantity(productId, newQuantity);
    updateView();
  }
}

export function handleClearCart() {
  if (confirm('Er du sikker på at du vil tømme handlekurven?')) {
    clearCart();
    updateView();
  }
}

export function navigateToCart() {
  model.app.currentPage = 'cart';
  updateView();
}
