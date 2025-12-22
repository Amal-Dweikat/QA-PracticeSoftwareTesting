import { Page, Locator } from '@playwright/test';

export class CategoryPage {
  readonly page: Page;

  readonly categoryCheckbox = (categoryId: string) =>
    this.page.locator(`input[data-test="${categoryId}"]`);
  readonly productLabels = (categoryName: string) =>
    this.page.locator(`//label[normalize-space(text())="${categoryName}"]`);

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/');
  }

  async filterByCategory(categoryId: string) {
    await this.categoryCheckbox(categoryId).click();
    await this.page.waitForLoadState('networkidle');
  }

  async getProductsByCategory(categoryName: string): Promise<string[]> {
    return await this.productLabels(categoryName).allTextContents();
  }
}