# Automated Testing Framework for Practice Software Testing Site

TypeScript
Playwright
Browsers
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


What We Learned

Building efficient E2E tests with Playwright's powerful API
Implementing POM for better maintainability and reusability
Managing test data and environments with .env and fixtures
Cross-browser testing to ensure consistent behavior
Optimizing test runs by reusing authentication states
Collaborative development: Dividing features, code reviews, and merging contributions




Developed by: Fathi Heelo and Amal Dweikat 🚀
License: MIT - Feel free to fork, explore, and contribute!
