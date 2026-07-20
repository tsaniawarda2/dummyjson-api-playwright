import { test, expect } from "@playwright/test";
import { loginData } from "../../test-data/authentication";
import { AuthApi } from "../../api/AuthApi";
test("TC_LOGIN_001 - Login with valid credentials", async ({ request }) => {
  const authApi = new AuthApi(request);

  const response = await authApi.login(loginData.valid);

  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.username).toBe(loginData.valid.username);
  expect(body.accessToken).toBeTruthy();
});

test("TC_LOGIN_002 - Login with invalid username", async ({ request }) => {
  const authApi = new AuthApi(request);

  const response = await authApi.login(loginData.invalidUsername);

  const body = await response.json();

  // expect(response.ok()).toBeFalsy();
  expect(response.status()).toBe(400);
  expect(body.message).toBe("Invalid credentials");
});

test("TC_LOGIN_003 - Login with invalid password", async ({ request }) => {
  const authApi = new AuthApi(request);

  const response = await authApi.login(loginData.invalidPassword);

  const body = await response.json();

  expect(response.status()).toBe(400);
  expect(body.message).toBe("Invalid credentials");
});

test("TC_LOGIN_004 - Login without username", async ({ request }) => {
  const authApi = new AuthApi(request);

  const response = await authApi.login(loginData.withoutUsername);

  const body = await response.json();

  expect(response.status()).toBe(400);
  expect(body.message).toBe("Username and password required");
});

test("TC_LOGIN_005 - Login without password", async ({ request }) => {
  const authApi = new AuthApi(request);

  const response = await authApi.login(loginData.withoutPassword);

  const body = await response.json();

  expect(response.status()).toBe(400);
  expect(body.message).toBe("Username and password required");
});

test("TC_LOGIN_006 - Login with empty request body", async ({ request }) => {
  const authApi = new AuthApi(request);

  const response = await authApi.login(loginData.emptyBody);

  const body = await response.json();

  expect(response.status()).toBe(400);
  expect(body.message).toBe("Username and password required");
});
