import { test, expect } from "@playwright/test";
import { ProductApi } from "../../api/ProductApi";
import { productData } from "../../test-data/products";
let productApi: ProductApi;
test.beforeEach(({ request }) => {
  productApi = new ProductApi(request);
});

test.describe("TS_PRODUCT_001: Get All Products", () => {
  test("TC_PRODUCT_001 - Get all products", async () => {
    const response = await productApi.getAllProducts();

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.total).toBeGreaterThan(0);
  });

  test("TC_PRODUCT_002 - Get all products with parameter (limit, skip, select)", async () => {
    const response = await productApi.getAllProductsWithParams();

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.limit).toBe(productData.params.limit);
    expect(body.skip).toBe(productData.params.skip);
    expect(body.products[0]).toHaveProperty("title");
    expect(body.products[0]).toHaveProperty("category");
  });
});

test.describe("TS_PRODUCT_002: Get Single Product", () => {
  test("TC_PRODUCTS_003 - Get product with valid ID", async () => {
    const response = await productApi.getProductById(
      productData.valid.request.id,
    );

    const body = await response.json();

    expect(response.status()).toBe(productData.valid.expected.status);
    expect(body.id).toBe(productData.valid.request.id);
    expect(body.title).toBeTruthy();
  });

  test("TC_PRODUCTS_004 - Get product with invalid ID", async () => {
    const response = await productApi.getProductById(
      productData.invalid.request.id,
    );

    const body = await response.json();

    expect(response.status()).toBe(productData.invalid.expected.status);
    expect(body.message).toBe(productData.invalid.expected.message);
  });
});

test.describe("TS_PRODUCT_003: Search Product", () => {
  test("TC_PRODUCTS_005 - Search product with valid keyword", async () => {
    const keyword = productData.keyword.valid.toLowerCase();
    const response = await productApi.searchProduct(keyword);

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.total).toBeGreaterThan(0);

    body.products.forEach((product: any) => {
      const text = `${product.title} ${product.description}`.toLowerCase();

      expect(text).toContain(keyword);
    });
  });

  test("TC_PRODUCTS_006 - Search product with no matching keyword", async () => {
    const response = await productApi.searchProduct(
      productData.keyword.invalid,
    );

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.products).toEqual([]);
    expect(body.products.length).toBe(0);
    expect(body.total).toBe(0);
  });
});
