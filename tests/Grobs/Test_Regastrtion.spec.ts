import { test, expect } from '@playwright/test';
import { RegasterationPage } from '../Pages/RegasterationPage.ts';
test.describe('User Registration', () => {

    test('TS-1 : should register a new user successfully', async ({ page }) => {
        const registrationPage = new RegasterationPage(page);
            const uniqueEmail = `user_${Date.now()}@test.com`;

        await registrationPage.navigate();
        await registrationPage.register({
            firstName: process.env.FIRST_NAME!,
    lastName: process.env.LAST_NAME!,
    dateOfBirth: process.env.DATE_OF_BIRTH!,
    street: process.env.STREET!,
    postalCode: process.env.POSTAL_CODE!,
    city: process.env.CITY!,
    state: process.env.STATE!,
    country: process.env.COUNTRY!,
    phone: process.env.PHONE!,
    email: uniqueEmail,
    password: process.env.PASSWORD!,
        });

    await expect(page).toHaveURL("https://practicesoftwaretesting.com/auth/register");
    });
    test('TS-2 : should show error for Password Be at least 8 characters long', async ({ page }) => {
        const registrationPage = new RegasterationPage(page);
        const uniqueEmail = `user_${Date.now()}@test.com`;

        await registrationPage.navigate();
        await registrationPage.register({
            firstName: process.env.FIRST_NAME!,
    lastName: process.env.LAST_NAME!,
    dateOfBirth: process.env.DATE_OF_BIRTH!,
    street: process.env.STREET!,
    postalCode: process.env.POSTAL_CODE!,
    city: process.env.CITY!,
    state: process.env.STATE!,
    country: process.env.COUNTRY!,
    phone: process.env.PHONE!,
    email: uniqueEmail,
    password: "Pass1",
        });
        // Add assertion to verify error message for short password
    const passwordError = page.locator(`input[aria-describedby='password-error']`);
    await expect(passwordError).toBeVisible();
    });
    
});