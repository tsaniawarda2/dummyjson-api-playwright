import { APIRequestContext, APIResponse } from "@playwright/test";
import { LoginRequest } from "../types/auth";

export class AuthApi {
  constructor(private readonly request: APIRequestContext) {}

  async login(payload: LoginRequest): Promise<APIResponse> {
    return this.request.post("/auth/login", {
      data: payload,
    });
  }
}
