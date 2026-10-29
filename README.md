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