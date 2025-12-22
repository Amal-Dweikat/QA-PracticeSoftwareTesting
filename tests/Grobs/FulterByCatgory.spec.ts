import { test, expect } from '@playwright/test';
import { CategoryPage } from '../Pages/FulterByCatgory';

test.describe('Filters By Category', () => {
  let categoryPage: CategoryPage;

  test.beforeEach(async ({ page }) => {
    categoryPage = new CategoryPage(page);
    await categoryPage.goto();
  });

  test('TC-1: Filter by Category "Hand Tools"', async () => {
    await categoryPage.filterByCategory('category-01KD3KG5XB3S64FWT2TYWVYM00');
    const products = await categoryPage.getProductsByCategory('Hand Tools');
    for (const product of products) {
      expect(product).toContain('Hand Tools');
    }
  });

  test('TC-2: Filter by Category "Power Tools"', async () => {
    await categoryPage.filterByCategory('category-01KD3KG5XB3S64FWT2TYWVYM01');
    const products = await categoryPage.getProductsByCategory('Power Tools');
    for (const product of products) {
      expect(product).toContain('Power Tools');
    }
  });
});