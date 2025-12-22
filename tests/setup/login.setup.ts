import { test, expect } from '@playwright/test';

test('Login Setup - Save storage state', async ({ page }) => {
  const emailValue = process.env.USER_EMAIL;
const passValue = process.env.USER_PASSWORD;

test.skip(!emailValue || !passValue, 'Missing USER_EMAIL/USER_PASSWORD (skip login setup)');

  await page.goto('/auth/login');

 
  await expect(page).toHaveURL(/\/auth\/login/);

  const email = page.locator('input[type="email"]');
  const password = page.locator('input[type="password"]');

  const loginBtn = page.getByRole('button', { name: /login/i });

  await expect(email).toBeVisible();
  await expect(password).toBeVisible();
  await expect(loginBtn).toBeVisible();

  await email.fill(emailValue!);
await password.fill(passValue!);

  await loginBtn.click();

  await expect(page).not.toHaveURL(/\/auth\/login/);

  await page.context().storageState({ path: 'login.json' });
});
