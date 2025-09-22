import { render } from "./shell";
import type { CartItem, Model } from "./types";

function addToCart(state: Model, productId: number; quantity =1){
    const model = structuredClone(state);
    const product = model.products.find((product)=>product.id === productId)
    if(!product) return false;
    const existingItem = model.cart.items.find(
        (item:cartItem)=> item.product.id === productId,
    );
    if (existingItem){
        existingItem.quantity+=quantity;
    }else{
        model.cart.items.push({quantity, product})
    }
    render(model, null)
}