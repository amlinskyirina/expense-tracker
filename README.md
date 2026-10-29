# Expense Tracker

A React application for managing personal expenses in ILS.

## Features
- Add, view, edit and delete expenses.
- Filter expenses by category.
- Display the total of visible expenses.
- Save expenses in localStorage.

## Technologies
React, JavaScript, Vite and styled-components.
No custom backend or database.

## Run locally
Requires Node.js and npm.

npm install
npm run dev

## Checks
npm test
npm run lint
npm run build

## Storage
Data is saved in the same browser and site address.
Clearing site data removes saved expenses.

## Project board
[Trello - Expense Tracker](https://trello.com/b/eGoIHmmw/expense-tracker)

## Dependencies and licenses

Dependencies are listed in package.json.
Exact dependency versions are recorded in package-lock.json.

Install the recorded versions:

```sh
npm ci
```

Third-party license texts and notices for the installed packages
are collected in ALL_LICENSES.
Supplementary license sources are stored in license-supplements.

Regenerate the license report after installation:

```sh
node generate-licenses.cjs
```

Run the project checks:

```sh
npm test
npm run lint
npm run build
```

## Application logs

Logs are displayed in the browser Developer Tools Console.
Open the Console with Ctrl+Shift+J in Chrome on Windows.
Enable Info, Warnings and Errors in the Console level filter.

Each entry includes:
- timestamp: UTC time in ISO format.
- level: info, warn or error.
- event: event identifier.
- message: a fixed description.

Logged events include application startup, adding, editing,
deleting, cancelling actions, validation failures and storage failures.

Expense descriptions, amounts, dates and identifiers are not logged.
Logs are not saved by the application to a file or localStorage.

EXPENSE_ADDED, EXPENSE_UPDATED and EXPENSE_DELETED describe
changes to the displayed list. A separate storage error is logged
if browser storage cannot be updated.

## Security checks

Run dependency and static code checks:

```sh
npm audit
npm run lint
```

Security checks performed on 2026-10-29:
- npm audit reported 0 known dependency vulnerabilities.
- ESLint passed with rules restricting dynamic code execution
  and direct HTML insertion.
- No tracked files matched the checked secret-file patterns:
  .env, .env.*, *.pem, *.key, *.p12, *.pfx and .npmrc.
  This was a filename check, not a full secret scan.
- A manual XSS test confirmed that an HTML-like expense
  description appeared as text before and after a page refresh,
  without executing the event handler.

These checks cover specific risks and do not constitute
a complete security assessment.


## Installation and execution on Ubuntu

Verified on Ubuntu in VirtualBox on 2026-10-29 using:
- Node.js 22.23.1
- npm 10.9.8

Git, Node.js and npm must be installed.
Some dependencies require Node.js 22.22.2 or later within version 22.
The initial installation with Node.js 22.22.1 produced engine warnings.
Updating to 22.23.1 resolved these warnings.

Clone the repository and install the locked dependencies:

```sh
git clone https://github.com/amlinskyirina/expense-tracker.git
cd expense-tracker
npm ci
```

Run the automated checks:

```sh
npm test
npm run lint
npm run build
```

Start the application:

```sh
npm run dev
```

Open the Local URL printed in the terminal in a browser on Ubuntu.
Keep the terminal running while using the application.
Press Ctrl+C to stop the development server.

Validation results:
- Dependency installation completed without engine warnings.
- All 8 automated tests passed.
- Lint and production build passed.
- Adding, displaying, editing and deleting expenses passed in Firefox.
- An edited expense remained after refreshing the page.
- A deleted expense did not return after refreshing the page.

Expenses are stored in the browser's localStorage.
Data is separate between browsers, operating systems and origins.