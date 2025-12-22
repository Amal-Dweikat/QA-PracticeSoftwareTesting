import { test, expect } from '@playwright/test';
import { PriceRangePage } from '../Pages/Price Range';

test.describe('Price Range Filter', () => {
  let pageObj: PriceRangePage;

  test.beforeEach(async ({ page }) => {
    pageObj = new PriceRangePage(page);
    await pageObj.goto();
  });

  test('TS-1: move price range -> products are filtered', async () => {
    await pageObj.moveSlider(50, 50); // خليها offsets أكبر شوي عشان يتغير فعليًا
    const prices = await pageObj.getPrices();
    expect(prices.length).toBeGreaterThan(0);
  });

  test('TS-2: narrow range reduces number of products', async () => {
    const before = (await pageObj.getPrices()).length;

    await pageObj.moveSlider(80, 80);
    const after = (await pageObj.getPrices()).length;

    // ✅ لازم بعد ما نضيّق النطاق عدد المنتجات ما يزيد
    expect(after).toBeLessThanOrEqual(before);
  });

  test('TS-3: filter persists after refresh', async ({ page }) => {
    await pageObj.moveSlider(80, 80);
    const afterFilter = await pageObj.getPrices();
    expect(afterFilter.length).toBeGreaterThan(0);

    await page.reload();
    await pageObj.goto();

    const afterReload = await pageObj.getPrices();
    expect(afterReload.length).toBeGreaterThan(0);
    expect(afterReload.length).toBeLessThanOrEqual(afterFilter.length);
  });
});
