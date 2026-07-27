interface Product {
  id?: number;
  quantity?: number;
}

export interface CartRequest {
  userId?: number;
  merge?: boolean;
  products?: Product[];
}

