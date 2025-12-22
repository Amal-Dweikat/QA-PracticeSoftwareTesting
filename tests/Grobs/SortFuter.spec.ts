import { test, expect } from '@playwright/test';
import { ProductsPage } from '../Pages/SortedPage.ts';

test.describe('Sort Feature (from A-Z and Price from High to Low) ', () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.goto();
  });

  test('TS-1: should sort products from A to Z', async () => {
    await productsPage.sortBy('Name (A - Z)');
    const productNames = await productsPage.getProductNames();
    const sortedNames = [...productNames].sort();
    expect(productNames).toEqual(sortedNames);
    console.log('Before Sort:', productNames);
  });

  test('TS-2: should sort products by price from high to low', async () => {
    await productsPage.sortBy('Price (High - Low)');
    const prices = await productsPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
    console.log('After Sort:', prices);
  });
});
