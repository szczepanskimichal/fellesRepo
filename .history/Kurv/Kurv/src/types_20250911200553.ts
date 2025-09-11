export type Model = {
  app: App;
  products: Product[];
  cart: Cart;
};

type App = {
  currentPage: Page;
};

type Cart = {
  items: CartItem[];
  total: number | null;
};

type CartItem = {
  product: Product | null;
  quantity: number | null;
};

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: ProductCategory;
};

type ProductCategory = "Elektronikk" | "Hjem" | "Livsstil";

type Page = "products" | "product-detail" | "cart";