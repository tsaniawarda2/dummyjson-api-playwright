interface Product {
  id?: number;
  quantity?: number;
}

export interface CartRequest {
  userId?: number;
  products: Product[];
}
