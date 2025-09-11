import { model } from "./model";
import type { Product } from "./types";
export function findProductById(id: number): Product | undefined {
    return model.products.find(product => product.id === id);
}
export function addToCart(productId: number) {
    const product = findProductById(productId);
    if (!product) return;

    const item = model.cart.items.find(item => item.product!.id === product.id);
    if (item) {
        item.quantity! += 1;
        model.cart.total += product.price;
    } else {
        model.cart.items.push({ product: product, quantity: 1 });
        model.cart.total += product.price;
    }
   
}
