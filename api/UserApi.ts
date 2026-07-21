import { APIRequestContext, APIResponse } from "@playwright/test";

export class UserApi {
    constructor(private readonly request: APIRequestContext) { }

    async getAllUsers(): Promise<APIResponse> {
        return this.request.get('/users')
    }

    async getUserById(id: number): Promise<APIResponse> {
        return this.request.get(`/users/${id}`)
    }

    async getCurrentUser():Promise<APIResponse>{
        return this.request.get('/users/me')
    }
}