import { APIRequestContext, APIResponse } from "@playwright/test";
import { productData } from "../test-data/products";
import { ProductRequest } from "../types/product";

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

  async addNewProduct(payload: ProductRequest) {
    return this.request.post("/products/add", {
      data: payload,
    });
  }

  async updateProductById(id: number, payload: ProductRequest) {
    return this.request.put(`/products/${id}`, {
      data: payload,
    });
  }

  async deleteProductById(id: number) {
    return this.request.delete(`/products/${id}`);
  }
}
