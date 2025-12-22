# Automated Testing Framework for Practice Software Testing Site

TypeScript
Playwright
Browsers
Repository: https://github.com/FathiHeelo/QA-PracticeSoftwareTesting.git
Project Overview
This repository contains our collaborative end-to-end testing framework developed in Playwright and TypeScript for the website practicesoftwaretesting.com. Amal Dweikat and I worked together to build a robust testing suite that verifies key e-commerce functionalities, ensuring reliability and coverage of essential user flows.
We focused on minimum required test cases for features like registration, login, cart management, sorting, filtering by price range/category/brand, and search. The project incorporates advanced Playwright concepts to create a maintainable, scalable automation setup tested across multiple browsers.
Key Features Tested

Register: User account creation with validation
Login: Authentication and session management
Add to Cart: Adding products with quantity checks
Remove from Cart: Removing items and updating totals
Sort Feature: Sorting products A-Z and price high-to-low
Price Range: Filtering by price sliders or inputs
By Category: Category-based product filtering
Search: Keyword search with result verification
By Brand: Brand-specific filtering

Each feature has dedicated test files, covering happy paths, edge cases, and errors.
Technologies & Concepts Used

Language: TypeScript
Framework: Playwright for E2E testing
Browsers: Chromium and Firefox (configurable for more)
Playwright Features:
Hooks (beforeAll, beforeEach, etc.) for setup/teardown
Page Object Models (POM) for reusable locators and actions
Parameterized tests via .env files (e.g., credentials, URLs)
Grouping with test.describe for organized scenarios
Shared authentication state to avoid repeated logins
Multi-browser testing with projects in config

Other: dotenv for environment variables, async/await for clean async handling


How to Run
Bashgit clone https://github.com/FathiHeelo/QA-PracticeSoftwareTesting.git
cd QA-PracticeSoftwareTesting

Install dependencies:Bashnpm install
npx playwright install  # Install browsers
Set up .env (example):textBASE_URL=https://practicesoftwaretesting.com/
USER_EMAIL=test@example.com
USER_PASSWORD=securepass
Run tests:
All tests: npx playwright test
Specific file: npx playwright test tests/login.spec.ts
UI mode: npx playwright test --ui
Headed mode: npx playwright test --headed
Multi-browser: Configured by default for Chromium and Firefox

View reports: npx playwright show-report

What We Learned

Building efficient E2E tests with Playwright's powerful API
Implementing POM for better maintainability and reusability
Managing test data and environments with .env and fixtures
Cross-browser testing to ensure consistent behavior
Optimizing test runs by reusing authentication states
Collaborative development: Dividing features, code reviews, and merging contributions

Future Enhancements (Ideas)

Add CI/CD integration (e.g., GitHub Actions) for automated runs
Incorporate visual regression testing with screenshots
Expand to mobile emulation and WebKit browser
Add custom reporters for detailed metrics
Include API testing alongside UI for hybrid coverage

Developed by: Fathi Heelo and Amal Dweikat 🚀
License: MIT - Feel free to fork, explore, and contribute!
