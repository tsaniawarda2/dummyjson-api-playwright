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

test.describe("TS_PRODUCT_004: Add a New Product", () => {
  test("TC_PRODUCTS_007 - Add new product with valid data", async () => {
    const payload = productData.addProduct.request;
    const response = await productApi.addNewProduct(payload);
    const body = await response.json();

    expect(response.status()).toBe(productData.addProduct.expected.status);
    expect(body.title).toBe(payload.title);
  });

  test("TC_PRODUCTS_008 - Add new product with empty body", async () => {
    const payload = productData.addProductEmptyBody.request;
    const response = await productApi.addNewProduct(payload);
    const body = await response.json();

    expect(response.status()).toBe(
      productData.addProductEmptyBody.expected.status,
    );
    expect(body.id).toBeTruthy();
  });

  test("TC_PRODUCTS_009 - Add new product with unpexpected data type", async () => {
    const payload = productData.addProductUnexpected.request;

    const response = await productApi.addNewProduct(payload);
    const body = await response.json();

    console.log(response.status(), body);

    expect(response.status()).toBe(
      productData.addProductUnexpected.expected.status,
    );
    expect(body.title).toBe(payload.title);
  });
});

test.describe("TS_PRODUCT_005: Update a Product", () => {
  test("TC_PRODUCTS_010 - Update product with valid product ID", async () => {
    const validId = productData.valid.request.id;
    const payload = productData.updateProduct.request;

    const response = await productApi.updateProductById(validId, payload);
    const body = await response.json();

    console.log(response.status(), body);

    expect(response.status()).toBe(productData.updateProduct.expected.status);
    expect(body.id).toBe(validId);
    expect(body.title).toBe(payload.title);
  });

  test("TC_PRODUCTS_011 - Update product with invalid product ID", async () => {
    const invalidId = productData.invalid.request.id;
    const payload = productData.updateProduct.request;

    const response = await productApi.updateProductById(invalidId, payload);
    const body = await response.json();

    console.log(response.status(), body);

    expect(response.status()).toBe(productData.invalid.expected.status);
    expect(body.message).toBe(productData.invalid.expected.message);
  });

  test("TC_PRODUCTS_012 - Update product with unexpected data type", async () => {
    const validId = productData.valid.request.id;
    const payload = productData.updateProductUnexpected.request;

    const response = await productApi.updateProductById(validId, payload);
    const body = await response.json();

    console.log(response.status(), body);

    expect(response.status()).toBe(
      productData.updateProductUnexpected.expected.status,
    );
    expect(body.id).toBe(validId);
    expect(body.title).toBe(payload.title);
  });
});
test.describe("TS_PRODUCT_006: Delete a Product", () => {
  test("TC_PRODUCTS_013 - Delete product with valid product ID", async () => {
    const validId = productData.valid.request.id;

    const response = await productApi.deleteProductById(validId);
    const body = await response.json();

    console.log(response.status(), body);

    expect(response.status()).toBe(productData.valid.expected.status);
    expect(body.id).toBe(validId);
    expect(body.isDeleted).toBe(true);
  });

  test("TC_PRODUCTS_014 - Delete product with invalid product ID", async () => {
    const invalidId = productData.invalid.request.id;

    const response = await productApi.deleteProductById(invalidId);
    const body = await response.json();

    console.log(response.status(), body);

    expect(response.status()).toBe(productData.invalid.expected.status);
    expect(body.message).toBe(productData.invalid.expected.message);
  });
});
