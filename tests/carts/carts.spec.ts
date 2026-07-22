import { test, expect } from "@playwright/test";
import { CartApi } from "../../api/CartApi";
import { cartData } from "../../test-data/cart";
import { CartRequest } from "../../types/cart";

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
    const id = cartData.valid.id;
    const response = await cartApi.getCartById(id);

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.id).toBe(id);
    expect(body.products.length).toBeGreaterThan(0);
  });

  test("TC_CARTS_004 - Get cart with invalid ID", async () => {
    const id = cartData.invalid.id;
    const response = await cartApi.getCartById(id);

    const body = await response.json();

    expect(response.status()).toBe(404);
    expect(body.message).toBe(cartData.invalid.messageInvalidCartId);
  });
});

test.describe("TS_CART_003: Get User's Carts", () => {
  test("TC_CARTS_005 - Get carts by valid user ID", async () => {
    const id = cartData.valid.id;

    const response = await cartApi.getCartByUserId(id);

    const body = await response.json();
    console.log(body.carts[0].userId);

    expect(response.status()).toBe(200);
    expect(body.carts[0].userId).toBe(id);
    expect(body.carts[0].products).toBeTruthy();
  });

  test("TC_CARTS_006 - Get carts by invalid user ID", async () => {
    const id = cartData.invalid.id;

    const response = await cartApi.getCartByUserId(id);

    const body = await response.json();

    expect(response.status()).toBe(404);
    expect(body.message).toBe(cartData.invalid.messageInvalidUserId);
  });
});

test.describe("TS_CART_004: Add Cart", () => {
  test("TC_CARTS_007 - Add cart with valid data", async () => {
    const payload: CartRequest = cartData.addCart;
  
    const response = await cartApi.addNewCart(payload);
  
    const body = await response.json();
    console.log(body);
  
    expect(response.status()).toBe(201);
    expect(body.userId).toBe(payload.userId);
    expect(body.products[0].id).toBe(payload.products[0].id);
    expect(body.products[0].quantity).toBe(payload.products[0].quantity);
  });
  
  test("TC_CARTS_008 - Add cart with invalid user ID", async () => {
    const payload: CartRequest = cartData.invalidAddCart;
  
    const response = await cartApi.addNewCart(payload);
  
    const body = await response.json();
    console.log(response);
    console.log(body);
  
    expect(response.status()).toBe(404);
    expect(body.message).toBe(cartData.invalidAddCart.message);
  });
});

