import { test } from '@playwright/test';
import { AddToCartPage } from '../Pages/AddToCartPage';
test.describe('Add to Cart Functionality ', () => {

  test('TS-1: should add a product to the cart successfully', async ({ page }) => {
    const addToCartPage = new AddToCartPage(page);

    await addToCartPage.navigate();
    await addToCartPage.addProductToCart();
    await addToCartPage.verifyProductAdded();
  });

  test('TS-2: Add multiple quantities of same product', async ({ page }) => {
    const addToCartPage = new AddToCartPage(page);

    await addToCartPage.navigate();
    await addToCartPage.setQuantity('3');
    await addToCartPage.verifyMinAndMaxQuantity('1', '999999999');
    await addToCartPage.addProductToCart();
    await addToCartPage.verifyProductAdded();
  });

});