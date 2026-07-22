import { APIRequestContext, APIResponse } from "@playwright/test";
import { productData } from "../test-data/products";

export class ProductApi {
  constructor(private readonly request: APIRequestContext) {}

  async getAllProducts(): Promise<APIResponse> {
    return this.request.get("/products");
  }

  async getAllProductsWithParams(): Promise<APIResponse> {
    return this.request.get("/products", {
      params: productData.params,
    });
  }

  async getProductById(id: number): Promise<APIResponse> {
    return this.request.get(`/products/${id}`);
  }

  async searchProduct(keyword: string): Promise<APIResponse> {
    return this.request.get(`/products/search?q=${keyword}`);
  }
}
