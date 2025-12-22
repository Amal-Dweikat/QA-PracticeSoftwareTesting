import { test, expect } from '@playwright/test';
import { CategoryPage } from '../Pages/FulterByCatgory';
test.describe('Filters By Brand', () => {
    let categoryPage: CategoryPage;
    test.beforeEach(async ({ page }) => {
        categoryPage = new CategoryPage(page);
        await categoryPage.goto();
    });
    test('TC-1: Filter by Brand "ForgeFlex Tools"', async () => {
        await categoryPage.filterByCategory('brand-01KD3KG5HYFC30SSHQXP0R0BDG');
        const products = await categoryPage.getProductsByCategory('ForgeFlex Tools');
        for (const product of products) {
            expect(product).toContain('ForgeFlex Tools');
        }
    });
    test('TC-2: Filter by Brand "MightyCraft Hardware"', async () => {
        await categoryPage.filterByCategory('brand-01KD3KG5HYFC30SSHQXP0R0BDH');
        const products = await categoryPage.getProductsByCategory('MightyCraft Hardware');
        for (const product of products) {
            expect(product).toContain('MightyCraft Hardware');
        }   
    });
}); 