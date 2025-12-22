import { test, expect } from '@playwright/test';

test('Login Setup - Save storage state', async ({ page }) => {
   if (process.env.CI) {
    test.skip(true, 'Skip login setup on CI');
  }
  await page.goto('/auth/login');

 
  await expect(page).toHaveURL(/\/auth\/login/);

  const email = page.locator('input[type="email"]');
  const password = page.locator('input[type="password"]');

  const loginBtn = page.getByRole('button', { name: /login/i });

  await expect(email).toBeVisible();
  await expect(password).toBeVisible();
  await expect(loginBtn).toBeVisible();

  await email.fill(process.env.USER_EMAIL || '');
  await password.fill(process.env.USER_PASSWORD || '');
  await loginBtn.click();

  await expect(page).not.toHaveURL(/\/auth\/login/);

  await page.context().storageState({ path: 'login.json' });
});
