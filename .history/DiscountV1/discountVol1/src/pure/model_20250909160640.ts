

export interface Model  {
    price: number;
    discountType: number;
    newPrice: number | null;
};


export const model : Model = Object.freeze({
    price: 500,
    discountType: 'percentDiscount',
    newPrice: "",
});
