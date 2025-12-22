import { Page, Locator, expect } from '@playwright/test';

export class AddToCartPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly quantityInput: Locator;
  readonly alertMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator('button[data-test="add-to-cart"]');
    this.quantityInput = page.locator('input[type="number"]');
    this.alertMessage = page.locator('div[role="alert"]');
  }

  async navigate() {
    await this.page.goto(process.env.URL_AddToCart!);
  }

  async addProductToCart() {
    await this.addToCartButton.click();
  }

  async setQuantity(quantity: string) {
    await this.quantityInput.fill(quantity);
  }

  async verifyMinAndMaxQuantity(min: string, max: string) {
    await expect(this.quantityInput).toHaveAttribute('min', min);
    await expect(this.quantityInput).toHaveAttribute('max', max);
  }

  async verifyProductAdded() {
    await expect(this.alertMessage).toBeVisible();
  }
}