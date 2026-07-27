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
    expect(body.limit).toBe(userData.params.limit);
    expect(body.skip).toBe(userData.params.skip);
    expect(body.users[0]).toHaveProperty("firstName");
    expect(body.users[0]).toHaveProperty("age");
  });
});

test.describe("TS_USER_002: Get Single User", () => {
  test("TC_USERS_003 - Get user with valid ID", async () => {
    const response = await userApi.getUserById(userData.valid.request.id);
    const body = await response.json();

    expect(response.status()).toBe(userData.valid.expected.status);
    expect(body.id).toBe(userData.valid.request.id);
    expect(body.firstName).toBeTruthy();
  });

  test("TC_USERS_004 - Get user with invalid ID", async () => {
    const response = await userApi.getUserById(userData.invalid.request.id);
    const body = await response.json();

    expect(response.status()).toBe(userData.invalid.expected.status);
    expect(body.message).toBe(userData.invalid.expected.message);
  });
});

test.describe("TS_USER_003: Get Current User", () => {
  let token: string;

  test.beforeAll(async ({ request }) => {
    const authApi = new AuthApi(request);
    const response = await authApi.login(loginData.valid.request);
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

    expect(response.status()).toBe(userData.invalidToken.expected.status);
    expect(body.message).toBe(userData.invalidToken.expected.message);
  });
});
