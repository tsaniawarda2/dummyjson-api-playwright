import { APIRequestContext, APIResponse } from "@playwright/test";
import { cartData } from "../test-data/cart";
import { CartRequest } from "../types/cart";

export class CartApi {
  constructor(private readonly request: APIRequestContext) {}

  async getAllCarts(): Promise<APIResponse> {
    return this.request.get("/carts");
  }

  async getAllCartsWithParams(): Promise<APIResponse> {
    return this.request.get("/carts", {
      params: cartData.params,
    });
  }

  async getCartById(id: number): Promise<APIResponse> {
    return this.request.get(`/carts/${id}`);
  }

  async getCartByUserId(id: number): Promise<APIResponse> {
    return this.request.get(`/carts/user/${id}`);
  }

  async addNewCart(payload: CartRequest): Promise<APIResponse> {
    return this.request.post("/carts/add", {
      data: payload,
    });
  }

  async updateCartById(payload: CartRequest, id: number): Promise<APIResponse> {
    return this.request.put(`/carts/${id}`, {
      data: payload,
    });
  }
  
  async deleteCartById( id: number): Promise<APIResponse> {
    return this.request.delete(`/carts/${id}`);
  }
}
