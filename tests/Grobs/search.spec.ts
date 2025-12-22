import { test, expect } from '@playwright/test';
import { SearchPage } from '../Pages/SearchPage';

test.use({ storageState: undefined });

test.describe('Search Feature', () => {
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    await searchPage.goto();
  });

  test('TS-1: search with existing keyword shows products', async () => {
    const namesBefore = await searchPage.getNames();
    expect(namesBefore.length).toBeGreaterThan(0);

    const firstName = namesBefore[0].trim();
    const keyword = firstName.split(' ')[0];  

    await searchPage.searchFor(keyword);

    const count = await searchPage.getCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TS-2: search with invalid keyword shows no products', async () => {
    await searchPage.searchFor('zzzzzz-not-found');

    const count = await searchPage.getCount();
    expect(count).toBe(0);
  });

  test('TS-3: search then clear search returns products', async () => {
    const namesBefore = await searchPage.getNames();
    const keyword = namesBefore[0].trim().split(' ')[0];

    await searchPage.searchFor(keyword);
    const afterSearch = await searchPage.getCount();
    expect(afterSearch).toBeGreaterThan(0);

    
    await searchPage.searchFor('');
    const afterClear = await searchPage.getCount();
    expect(afterClear).toBeGreaterThan(0);
  });
});
