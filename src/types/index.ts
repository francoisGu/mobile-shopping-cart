export interface Dispatch {
  type: string;
  data?: any;
}

export interface PageState {
  [key: string]: {
    state: Products | Cart;
    dispatch: (d: Dispatch) => void;
  };
}

export interface Products {
  items: Product[];
}

export interface Cart {
  items: Product[];
}

export interface Product {
  isPublished: boolean;
  productName: string;
  productImage: string;
  price: number;
  number?: number;
}
