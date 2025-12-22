import { test, expect } from '@playwright/test';
import { RemoveFromCartPage } from '../Pages/remove';

async function ensureCartHasItem(page: any) {
  const checkout = new RemoveFromCartPage(page);

  await checkout.gotoCheckout();

  if ((await checkout.itemsCount()) === 0) {
   
    await page.goto('/');


    const firstProductLink = page.locator('a[href*="/product/"]').first();
    await expect(firstProductLink).toBeVisible({ timeout: 15000 });
    await firstProductLink.click();

   
    const addBtn = page.locator('[data-test="add-to-cart"], button:has-text("Add to cart")').first();
    await expect(addBtn).toBeVisible({ timeout: 15000 });
    await addBtn.click();

   
    const toastOrAlert = page.locator('#toast-container, [role="alert"]').first();
    await expect(toastOrAlert).toBeVisible({ timeout: 15000 });

   
    await checkout.gotoCheckout();
    await checkout.expectCartNotEmpty();
  }
}

test.describe('Remove from cart', () => {

  test.beforeEach(async ({ page }) => {
    await ensureCartHasItem(page);
  });

  test('Remove one item -> cart count decreases', async ({ page }) => {
    const checkout = new RemoveFromCartPage(page);
    await checkout.gotoCheckout();

  
    await checkout.expectCartNotEmpty();

    const before = await checkout.itemsCount();
    await checkout.removeFirstItem();

    if (before === 1) {
      await checkout.expectCartEmpty();
    } else {
      await expect.poll(async () => await checkout.itemsCount(), { timeout: 15000 })
        .toBeLessThan(before);
    }
  });

  test('Remove all items -> cart empty', async ({ page }) => {
    const checkout = new RemoveFromCartPage(page);
    await checkout.gotoCheckout();

    await checkout.removeAllItems();
    await checkout.expectCartEmpty();
  });

  test('Remove then refresh -> still removed', async ({ page }) => {
    const checkout = new RemoveFromCartPage(page);
    await checkout.gotoCheckout();

    await checkout.expectCartNotEmpty();

    const before = await checkout.itemsCount();
    await checkout.removeFirstItem();

   
    if (before === 1) {
      await checkout.expectCartEmpty();
    } else {
      await expect.poll(async () => await checkout.itemsCount(), { timeout: 15000 })
        .toBeLessThan(before);
    }

   
    await page.reload();
    await checkout.gotoCheckout();

    if (before === 1) {
      await checkout.expectCartEmpty();
    } else {
      await expect.poll(async () => await checkout.itemsCount(), { timeout: 15000 })
        .toBeLessThan(before);
    }
  });

});
