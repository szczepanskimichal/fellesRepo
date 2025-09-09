import type { Model } from "./types";

const discounts = {
    percentDiscount: (price: number) => price * 0.8, // 20% rabatt
    fixedDiscount: (price: number) => price - 50, // Fast 50kr rabatt
    percentDiscountWithMax: (price: number) => Math.max(price * 0.6, price - 100) // 40% rabatt
};


function calculateDiscount (beregnDiscount: Model): Model {
    return {
        ...beregnDiscount,
        newPrice: discounts[beregnDiscount.discountType](beregnDiscount.price)
    };
}

export { calculateDiscount };