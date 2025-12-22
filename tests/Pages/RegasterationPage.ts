import { test, expect, Page,Locator } from '@playwright/test';
export class RegasterationPage {
  readonly page: Page;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly streetInput: Locator;
  readonly postalCodeInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly countrySelect: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;


  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.dateOfBirthInput = page.locator('#dob');
    this.streetInput = page.locator('#street');
    this.postalCodeInput = page.locator('#postal_code');
    this.cityInput = page.locator('#city');
    this.stateInput = page.locator('#state');
    this.countrySelect = page.locator('#country');
    this.phoneInput = page.locator('#phone');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('button[data-test="register-submit"]');
  }
  async navigate() {
    await this.page.goto('https://practicesoftwaretesting.com/auth/register');
  }
  async register(userData: {
    firstName: string;
    lastName: string; 
    dateOfBirth: string;
    street: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    email: string;
    password: string;
  }) {
    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    await this.dateOfBirthInput.fill(userData.dateOfBirth);
    await this.streetInput.fill(userData.street);
    await this.postalCodeInput.fill(userData.postalCode);
    await this.cityInput.fill(userData.city);
    await this.stateInput.fill(userData.state);
  await this.countrySelect.selectOption(userData.country);
    await this.phoneInput.fill(userData.phone);
    await this.emailInput.fill(userData.email);
    await this.passwordInput.fill(userData.password);
    await this.submitButton.click();
  }

}