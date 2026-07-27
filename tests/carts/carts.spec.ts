import { test, expect } from "@playwright/test";
import { CartApi } from "../../api/CartApi";
import { cartData } from "../../test-data/cart";

let cartApi: CartApi;
test.beforeEach(({ request }) => {
  cartApi = new CartApi(request);
});

test.describe("TS_CART_001: Get All Carts", () => {
  test("TC_CARTS_001 - Get all carts", async () => {
    const response = await cartApi.getAllCarts();

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.carts.length).toBeGreaterThan(0);
    expect(body.total).toBeGreaterThan(0);
  });

  test("TC_CARTS_002 - Get all carts with parameter (limit, skip)", async () => {
    const response = await cartApi.getAllCartsWithParams();

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.carts.length).toBeGreaterThan(0);
    expect(body.total).toBeGreaterThan(0);
    expect(body.limit).toBe(cartData.params.limit);
    expect(body.skip).toBe(cartData.params.skip);
  });
});

test.describe("TS_CART_002: Get Single Cart", () => {
  test("TC_CARTS_003 - Get cart with valid ID", async () => {
    const validId = cartData.valid.cartId;
    const response = await cartApi.getCartById(validId);

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.id).toBe(validId);
    expect(body.products.length).toBeGreaterThan(0);
  });

  test("TC_CARTS_004 - Get cart with invalid ID", async () => {
    const invalidId = cartData.invalid.request.cartId;
    const response = await cartApi.getCartById(invalidId);

    const body = await response.json();

    expect(response.status()).toBe(cartData.invalid.expected.status);
    expect(body.message).toBe(cartData.invalid.expected.cartNotFound);
  });
});

test.describe("TS_CART_003: Get User's Carts", () => {
  test("TC_CARTS_005 - Get carts by valid user ID", async () => {
    const validId = cartData.valid.userId;

    const response = await cartApi.getCartByUserId(validId);

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.carts[0].userId).toBe(validId);
    expect(body.carts[0].products).toBeTruthy();
  });

  test("TC_CARTS_006 - Get carts by invalid user ID", async () => {
    const invalidId = cartData.invalid.request.userId;

    const response = await cartApi.getCartByUserId(invalidId);

    const body = await response.json();

    expect(response.status()).toBe(404);
    expect(body.message).toBe(cartData.invalid.expected.userNotFound);
  });
});

test.describe("TS_CART_004: Add Cart", () => {
  test("TC_CARTS_007 - Add cart with valid data", async () => {
    const payload = cartData.addCart.request;

    const response = await cartApi.addNewCart(payload);

    const body = await response.json();

    expect(response.status()).toBe(cartData.addCart.expected.status);
    expect(body.userId).toBe(payload.userId);
    expect(body.products[0].id).toBe(payload.products[0].id);
    expect(body.products[0].quantity).toBe(payload.products[0].quantity);
  });

  test("TC_CARTS_008 - Add cart with invalid user ID", async () => {
    const payload = cartData.addCartInvalidUser.request;

    const response = await cartApi.addNewCart(payload);

    const body = await response.json();
    expect(response.status()).toBe(cartData.addCartInvalidUser.expected.status);
    expect(body.message).toBe(cartData.addCartInvalidUser.expected.message);
  });

  test("TC_CARTS_009 - Add cart with empty request body", async () => {
    const payload = cartData.addCartEmptyBody.request;
    const response = await cartApi.addNewCart(payload);

    const body = await response.json();

    expect(response.status()).toBe(cartData.addCartEmptyBody.expected.status);
    expect(body.message).toBe(cartData.addCartEmptyBody.expected.message);
  });
});

test.describe("TS_CART_005: Update Cart", () => {
  test("TC_CARTS_010 - Update cart by valid cart ID", async () => {
    const payload = cartData.updateCart.request;

    const validId = cartData.valid.cartId;
    const response = await cartApi.updateCartById(payload, validId);

    const body = await response.json();

    expect(response.status()).toBe(cartData.updateCart.expected.status);
    expect(body.id).toBe(validId);
    expect(body.products[0].id).toBe(payload.products[0].id);
    expect(body.products[0].quantity).toBe(payload.products[0].quantity);
  });

  test("TC_CARTS_011 - Update cart by invalid cart ID", async () => {
    const payload = cartData.updateCart.request;

    const id = cartData.invalid.request.cartId;
    const response = await cartApi.updateCartById(payload, id);

    const body = await response.json();

    expect(response.status()).toBe(cartData.invalid.expected.status);
    expect(body.message).toBe(cartData.invalid.expected.cartNotFound);
  });

  test("TC_CARTS_012 - Update cart with merge true", async () => {
    const payload = cartData.updateCartMerge.request;

    const validId = cartData.valid.cartId;
    const response = await cartApi.updateCartById(payload, validId);

    const body = await response.json();
    expect(response.status()).toBe(cartData.updateCartMerge.expected.status);
    expect(body.id).toBe(validId);

    const updatedProduct = body.products.find(
      (p: any) => p.id === payload.products[0].id,
    );
    expect(updatedProduct).toBeDefined();
    expect(updatedProduct.quantity).toBe(payload.products[0].quantity);
  });

  test("TC_CARTS_013 - Update cart with empty request body", async () => {
    const validId = cartData.valid.cartId;
    const payload = cartData.updateCartEmptyBody.request;

    const response = await cartApi.updateCartById(payload, validId);

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.id).toBe(validId);
    expect(body.products.length).toBe(0);
  });
});

test.describe("TS_CART_006: Delete Cart", () => {
  test("TC_CARTS_014 - Delete cart by valid cart ID", async () => {
    const validId = cartData.valid.cartId;
    const response = await cartApi.deleteCartById(validId);

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.id).toBe(validId);
    expect(body.isDeleted).toBe(true);
  });

  test("TC_CARTS_015 - Delete cart by invalid cart ID", async () => {
    const invalidId = cartData.invalid.request.cartId;
    const response = await cartApi.deleteCartById(invalidId);

    const body = await response.json();

    expect(response.status()).toBe(cartData.invalid.expected.status);
    expect(body.message).toBe(cartData.invalid.expected.cartNotFound);
  });
});
