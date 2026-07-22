import test, { expect } from "@playwright/test";

import { AuthApi } from "../../api/AuthApi";
import { UserApi } from "../../api/UserApi";

import { loginData } from "../../test-data/authentication";
import { userData } from "../../test-data/users";

let userApi: UserApi;

test.beforeEach(({ request }) => {
  userApi = new UserApi(request);
});

test.describe("TS_USER_001: Get All Users", () => {
  test("TC_USERS_001 - Get All Users", async () => {
    const response = await userApi.getAllUsers();

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.users.length).toBeGreaterThan(0);
    expect(body.total).toBeGreaterThan(0);
  });

  test("TC_USERS_002 - Get all users with parameter (limit, skip, select)", async () => {
    const response = await userApi.getAllUsersWithParams();
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.limit).toBe(2);
    expect(body.skip).toBe(5);
    expect(body.users[0]).toHaveProperty("firstName");
    expect(body.users[0]).toHaveProperty("age");
  });
});

test.describe("TS_USER_002: Get Single User", () => {
  test("TC_USERS_003 - Get user with valid ID", async () => {
    const response = await userApi.getUserById(userData.valid.id);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.id).toBe(userData.valid.id);
    expect(body.firstName).toBeTruthy();
  });

  test("TC_USERS_004 - Get user with invalid ID", async () => {
    const response = await userApi.getUserById(userData.invalid.id);
    const body = await response.json();

    expect(response.status()).toBe(404);
    expect(body.message).toBe(userData.invalid.message);
  });
});

test.describe("TS_USER_003: Get Current User", () => {
  let token: string;

  test.beforeAll(async ({ request }) => {
    const authApi = new AuthApi(request);
    const response = await authApi.login(loginData.valid);
    const body = await response.json();
    token = body.accessToken;
  });

  test("TC_USERS_005 - Get current user with valid token", async () => {
    const response = await userApi.getCurrentUser(token);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.username).toBeTruthy();
  });
  test("TC_USERS_006 - Get current user with invalid token", async () => {
    const response = await userApi.getCurrentUser("invalid-token");
    const body = await response.json();

    expect(response.status()).toBe(401);
    expect(body.message).toBe("Invalid/Expired Token!");
  });
});
