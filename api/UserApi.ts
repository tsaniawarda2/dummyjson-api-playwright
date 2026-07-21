import { APIRequestContext, APIResponse } from "@playwright/test";
import { userData } from "../test-data/users";

export class UserApi {
    constructor(private readonly request: APIRequestContext) { }

    async getAllUsers(): Promise<APIResponse> {
        return this.request.get('/users')
    }

    async getAllUsersWithParams(): Promise<APIResponse> {
        return this.request.get('/users',{
            params: userData.params
        })
    }

    async getUserById(id: number): Promise<APIResponse> {
        return this.request.get(`/users/${id}`)
    }

    async getCurrentUser(token:string): Promise<APIResponse> {
        return this.request.get('/users/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}