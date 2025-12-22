import { Page, Locator, expect } from '@playwright/test';

export class RemoveFromCartPage {
  readonly page: Page;

  // عناصر صفحة checkout
  readonly qtyInputs: Locator;
  readonly removeButtons: Locator;
  readonly toastContainer: Locator;

  constructor(page: Page) {
    this.page = page;

    // كل عنصر في السلة له input quantity
    this.qtyInputs = page.locator('[data-test="product-quantity"]');

    // زر الحذف (a.btn.btn-danger) لكل سطر
    this.removeButtons = page.locator('a.btn.btn-danger');

    // مكان رسائل التوست
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
    // احذف لحد ما السلة تصير فاضية
    while (await this.itemsCount() > 0) {
      await this.removeFirstItem();
      // استني شوي عشان الواجهة تحدث
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
