import { Page, Locator, expect } from '@playwright/test';

export class RemoveFromCartPage {
  readonly page: Page;

 
  readonly qtyInputs: Locator;
  readonly removeButtons: Locator;
  readonly toastContainer: Locator;

  constructor(page: Page) {
    this.page = page;

   
    this.qtyInputs = page.locator('[data-test="product-quantity"]');

   
    this.removeButtons = page.locator('a.btn.btn-danger');

   
    this.toastContainer = page.locator('#toast-container');
  }

  async gotoCheckout() {
    await this.page.goto('/checkout');
    await expect(this.page).toHaveURL(/\/checkout/);
  }

  async itemsCount(): Promise<number> {
    return await this.qtyInputs.count();
  }

  async removeFirstItem() {
    const firstRemove = this.removeButtons.first();
    await expect(firstRemove).toBeVisible({ timeout: 15000 });
    await firstRemove.click();
  }

  async removeAllItems() {
   
    while (await this.itemsCount() > 0) {
      await this.removeFirstItem();
     
      await this.page.waitForTimeout(500);
    }
  }

  async expectCartNotEmpty() {
    await expect.poll(async () => await this.itemsCount(), {
      timeout: 15000,
      message: 'Cart is still empty',
    }).toBeGreaterThan(0);
  }

  async expectCartEmpty() {
    await expect.poll(async () => await this.itemsCount(), {
      timeout: 15000,
      message: 'Cart is not empty yet',
    }).toBe(0);
  }
}
