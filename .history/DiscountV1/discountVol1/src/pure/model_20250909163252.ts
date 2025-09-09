

export interface Model  {
    price: number;
    discountType: string;
    newPrice: number;
};


export const model : Model = {
    price: 500,
    discountType: 'percentDiscount',
    newPrice: 0,
};
