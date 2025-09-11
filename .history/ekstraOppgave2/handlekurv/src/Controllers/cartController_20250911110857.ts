import { model } from "../Model/model";
import { updateView } from "../index";
import { addToCart, removeFromCart, getCart, updateCartQuantity, clearCart } from "../Services/cartService";
import { getProductById } from "../Services/productService";



function handleAddToCart(productId: number) {
  addToCart(productId);
  updateView();
}

function handleRemoveFromCart(productId: number) {
  removeFromCart(productId);
  updateView();
}

function changeQuantity(productId: number, change: number) {
  const cart = getCart();
  const item = cart.find(item => item.productId === productId);

  if (item) {
    const newQuantity = item.quantity + change;
    updateCartQuantity(productId, newQuantity);
    updateView();
  }
}

function handleClearCart() {
  if (confirm('Er du sikker på at du vil tømme handlekurven?')) {
    clearCart();
    updateView();
  }
}

function navigateToCart() {
  model.app.currentPage = 'cart';
  updateView();
}
export { handleAddToCart,
         handleRemoveFromCart,
         changeQuantity,
         handleClearCart,
         navigateToCart
};