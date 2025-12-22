import { test } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';




test.describe('Login Feature - PracticeSoftwareTesting', () => {

 
  test.use({ storageState: undefined });

  test('Valid login (using env credentials)', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      process.env.USER_EMAIL || '',
      process.env.USER_PASSWORD || ''
    );

    await loginPage.expectLoggedIn();
  });

  test('Empty fields -> shows email + password required', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.submitOnly();

    await loginPage.expectEmailRequired();
    await loginPage.expectPasswordRequired();
  });

  test('Email filled, password empty -> shows password required', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillEmailOnly(process.env.USER_EMAIL || '');

    await loginPage.expectPasswordRequired();
  });

});
