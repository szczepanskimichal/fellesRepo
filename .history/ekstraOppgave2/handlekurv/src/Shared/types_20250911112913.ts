type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

type Model = {
  app: {
    currentPage: string;
  };
  inputs: {
    products: {
      searchQuery: string;
      sortBy: string;
    };
    cart: {
      CardItem: string;
    };
  };
  view: {
    products: Record<string, unknown>;
    productDetail: {
      selectedId: number | null;
    };
    cart: Record<string, unknown>;
  };
  data: {
    products: Product[];
    cart: any[]; // Możesz doprecyzować typ, np. Product[] lub własny typ koszyka
  };
};

export type { Product, Model };