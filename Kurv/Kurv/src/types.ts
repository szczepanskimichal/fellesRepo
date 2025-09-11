export type ProductCategory = "Elektronikk" | "Hjem" | "Livsstil";
export type Page = "products" | "product-detail" | "cart";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: ProductCategory;
}

export interface CartItem {
  productId: number;
  quantity: number;
  product: Product;
}

export interface AppState {
  currentPage: Page;
}

export interface ViewState {
  productDetail: {
    selectedId: number | null;
  };
}

export interface DataState {
  products: Product[];
  cart: CartItem[];
}

export interface Model {
  app: AppState;
  view: ViewState;
  data: DataState;
}
