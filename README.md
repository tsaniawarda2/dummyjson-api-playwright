# 🚀 Playwright API Automation — DummyJSON

API automation testing project using **Playwright + TypeScript** for testing REST APIs on DummyJSON.

This project was created to practice and demonstrate:

- API Automation Testing
- REST API Testing
- API Validation
- Test Design
- Clean Test Structure

---

## 🌐 Application Under Test (AUT)

🔗 **[DummyJSON](https://dummyjson.com/docs/)**

---

## 📌 Project Overview

This project automates several core API functionalities on DummyJSON, including:

- 🔐 Authentication
- 👤 Users
- 📦 Products
- 🛒 Cart Management
- 🔄 CRUD Operations
- ✅ API Response Validation

---

## 🧪 Test Coverage

| Feature | Test Cases |
| -------- | ---------: |
| Authentication | 6 |
| Users | 6 |
| Products | 6 |
| Cart | 16 |
| **Total** | **34** |

---

## 🏗️ Framework Features

- ✅ Modular Test Structure
- ✅ API Request Context
- ✅ Reusable Test Utilities
- ✅ Test Data Management
- ✅ Environment Variables (.env)
- ✅ Response Validation
- ✅ JSON Schema Validation *(Optional)*
- ✅ GitHub Actions (CI/CD)
- ✅ HTML Report

---

## ⚙️ Tech Stack

- 🎭 Playwright
- 🔵 TypeScript
- 🟢 Node.js
- 🌐 REST API
- 📊 Playwright HTML Report

---

## 🚀 Installation

Clone repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Install Playwright:

```bash
npx playwright install
```

Run all tests:

```bash
npx playwright test
```

Run Authentication tests:

```bash
npx playwright test tests/authentication
```

Run Users tests:

```bash
npx playwright test tests/users
```

Run Products tests:

```bash
npx playwright test tests/products
```

Run Cart tests:

```bash
npx playwright test tests/carts
```

Open HTML Report:

```bash
npx playwright show-report
```

---

## 🔄 Continuous Integration

This project uses GitHub Actions to automatically:

- Install project dependencies
- Install Playwright
- Execute API test suites
- Generate HTML Report
- Upload HTML Report as a workflow artifact

---

## 📸 Test Evidence

This project generates:

- HTML Report
- API Request & Response Logs

---

✨ Built for learning REST API testing, automation best practices, and scalable Playwright API test development.
