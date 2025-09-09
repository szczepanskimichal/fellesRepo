

export interface Model  {
    price: number;
    discountType: number;
    newPrice: number | null;
};


export const initialModel : Model = Object.freeze({
    price: 500,
    discountType: 'percentDiscount',
    newPrice: "",
});
