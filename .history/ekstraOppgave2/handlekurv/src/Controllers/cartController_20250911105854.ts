import * as model from '../model';
import { getCart, addToCart, removeFromCart, updateCartQuantity, clearCart, getCartItemCount } from '';
import { getProductById } from '../model';
import { updateView } from '../index';


export function handleAddToCart(productId) {
  addToCart(productId);
  updateView();
}

export function handleRemoveFromCart(productId) {
  removeFromCart(productId);
  updateView();
}

export function changeQuantity(productId, change) {
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
