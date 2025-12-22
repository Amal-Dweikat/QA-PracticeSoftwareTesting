import { defineConfig, devices } from '@playwright/test';
///******** */
import * as dotenv from 'dotenv';
dotenv.config();



export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,
 
  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    //**** *****/
     baseURL: process.env.BASE_URL || 'https://practicesoftwaretesting.com',

    trace: 'on-first-retry',
  },

 ////********* */
 projects: [
{
  name: 'login',
  testDir: './tests',
  testMatch: ['setup/**/*.setup.ts'],
  use: { ...devices['Desktop Chrome'] },
},

  {
    name: 'chromium',
    dependencies: ['login'],
    use: { ...devices['Desktop Chrome'], storageState: 'login.json' },
  },
  {
    name: 'firefox',
    dependencies: ['login'],
    use: { ...devices['Desktop Firefox'], storageState: 'login.json' },
  },
  {
    name: 'webkit',
    dependencies: ['login'],
    use: { ...devices['Desktop Safari'], storageState: 'login.json' },
  },
],


  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
