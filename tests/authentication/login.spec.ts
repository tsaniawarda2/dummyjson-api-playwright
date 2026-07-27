import { test, expect } from "@playwright/test";
import { loginData } from "../../test-data/authentication";
import { AuthApi } from "../../api/AuthApi";

test.describe("TS_AUTH_001: Authentication", () => {
  let authApi: AuthApi;

  test.beforeEach(async ({ request }) => {
    authApi = new AuthApi(request);
  });

  test("TC_LOGIN_001 - Login with valid credentials", async () => {
    const response = await authApi.login(loginData.valid.request);

    const body = await response.json();

    expect(response.status()).toBe(loginData.valid.expected.status);
    expect(body.username).toBe(loginData.valid.expected.username);
    expect(body.accessToken).toBeTruthy();
  });

  test("TC_LOGIN_002 - Login with invalid username", async () => {
    const response = await authApi.login(loginData.invalidUsername.request);

    const body = await response.json();

    // expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(
      loginData.invalidCredentials.expected.status,
    );
    expect(body.message).toBe(loginData.invalidCredentials.expected.message);
  });

  test("TC_LOGIN_003 - Login with invalid password", async () => {
    const response = await authApi.login(loginData.invalidPassword.request);

    const body = await response.json();

    expect(response.status()).toBe(
      loginData.invalidCredentials.expected.status,
    );
    expect(body.message).toBe(loginData.invalidCredentials.expected.message);
  });

  test("TC_LOGIN_004 - Login without username", async () => {
    const response = await authApi.login(loginData.withoutUsername.request);

    const body = await response.json();

    expect(response.status()).toBe(loginData.required.expected.status);
    expect(body.message).toBe(loginData.required.expected.message);
  });

  test("TC_LOGIN_005 - Login without password", async () => {
    const response = await authApi.login(loginData.withoutPassword.request);

    const body = await response.json();

    expect(response.status()).toBe(loginData.required.expected.status);
    expect(body.message).toBe(loginData.required.expected.message);
  });

  test("TC_LOGIN_006 - Login with empty request body", async () => {
    const response = await authApi.login(loginData.emptyBody.request);

    const body = await response.json();

    expect(response.status()).toBe(loginData.required.expected.status);
    expect(body.message).toBe(loginData.required.expected.message);
  });
});
