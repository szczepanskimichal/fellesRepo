

export interface Model  {
    price: number;
    discountType: number;
    newPrice: number;
};


export const initialModel : Model = Object.freeze({
    price: 500,
    discountType: 'percentDiscount',
    newPrice: "number",
});
