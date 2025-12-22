import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

 
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginSubmit: Locator;

  readonly emailError: Locator;
  readonly passwordError: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');

  
    this.loginSubmit = page.locator('[data-test="login-submit"]');

   
    this.emailError = page.locator('[data-test="email-error"]');
    this.passwordError = page.locator('[data-test="password-error"]');
  }

  async goto() {
    await this.page.goto('/auth/login');
    await expect(this.page).toHaveURL(/\/auth\/login/);
  }

 
  async submitOnly() {
    await this.loginSubmit.click();
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginSubmit.click();
  }

  async fillEmailOnly(email: string) {
    await this.emailInput.fill(email);
    await this.loginSubmit.click();
  }

  async expectLoggedIn() {
    await expect(this.page).not.toHaveURL(/\/auth\/login/);
  }

  async expectEmailRequired() {
    await expect(this.emailError).toBeVisible();
    await expect(this.emailError).toContainText('Email is required');
  }

  async expectPasswordRequired() {
    await expect(this.passwordError).toBeVisible();
    await expect(this.passwordError).toContainText('Password is required');
  }
}
