import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('select[data-test="sort"]');
    this.productNames = page.locator('//h5[@data-test="product-name"]');
    this.productPrices = page.locator('//span[@data-test="product-price"]');
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/');
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption({ label: option });
    await this.page.waitForLoadState('networkidle');
  }

  async getProductNames(): Promise<string[]> {
    return await this.productNames.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const pricesText = await this.productPrices.allTextContents();
    return pricesText.map(price => Number(price.replace('$', '').trim()));
  }
}