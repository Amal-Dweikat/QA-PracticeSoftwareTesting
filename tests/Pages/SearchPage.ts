import { Page, Locator, expect } from '@playwright/test';

export class SearchPage {
  readonly page: Page;

  readonly searchInput: Locator;
  readonly productNames: Locator;

  constructor(page: Page) {
    this.page = page;


    this.searchInput = page.locator('input[data-test="search-query"]');


    this.productNames = page.locator('[data-test="product-name"]');
  }

  async goto() {
    await this.page.goto('/');
   
    await expect(this.productNames.first()).toBeVisible({ timeout: 15000 });
  }

  async searchFor(text: string) {
    await expect(this.searchInput).toBeVisible({ timeout: 15000 });
    await this.searchInput.fill(text);
    await this.searchInput.press('Enter');

    
    await this.page.waitForTimeout(800);
  }

  async getNames(): Promise<string[]> {
    return await this.productNames.allTextContents();
  }

  async getCount(): Promise<number> {
    return await this.productNames.count();
  }
}
