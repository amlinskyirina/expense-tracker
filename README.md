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
Data is separate between browsers, operating systems and origin

## Docker

Build and run from the project directory on Ubuntu:

```sh
sudo docker build -t expense-tracker:local .
sudo docker run -d --name expense-tracker -p 127.0.0.1:8080:80 expense-tracker:local
```

Open http://localhost:8080 in a browser on Ubuntu.

Check container status:

```sh
sudo docker ps
```

Stop the container:

```sh
sudo docker stop expense-tracker
```

Start the existing container again:

```sh
sudo docker start expense-tracker
```

Remove a stopped container and create a new one:

```sh
sudo docker rm expense-tracker
sudo docker run -d --name expense-tracker -p 127.0.0.1:8080:80 expense-tracker:local
```

The Dockerfile builds the application with Node.js and serves
the production files using Nginx. The final image contains
the production output, without the source tree or node_modules.

Expense data is stored in the browser's localStorage, outside
the container. No Docker volume is required for this frontend.
Use the same browser profile and http://localhost:8080 to retain data.
Clearing browser storage removes the saved expenses.

Validated on Ubuntu on 2026-10-29:
- Docker image built successfully.
- Container ran and the application was accessible.
- Adding, displaying, editing and deleting expenses passed.
- An edited expense remained after container removal,
  recreation and browser refresh.
- A deleted expense did not return after browser refresh.
## Continuous integration

The GitHub Actions workflow is defined in `.github/workflows/ci.yml`.

For pull requests targeting main and pushes to main, it:
- Installs dependencies using npm ci.
- Runs ESLint.
- Runs the automated tests.
- Builds the application.

After a push to main, it also builds the Docker image,
provided all previous checks passed.

A failed check causes the workflow to fail.
Coverage reporting and the 70% threshold are not included.

To view results, open the repository's Actions tab,
select a workflow run, then open a job and its steps.
The Docker image is built for validation and is not published.




## Release process

Versions use the MAJOR.MINOR.PATCH format:
- MAJOR: incompatible changes.
- MINOR: backward-compatible features.
- PATCH: backward-compatible fixes.

To prepare a release:
1. Update the version in package.json and package-lock.json.
2. Open a pull request and wait for CI checks to pass.
3. Merge into main and verify the Docker build succeeds.
4. Create an annotated Git tag on the verified commit.
5. Push the tag and create a GitHub Release for that tag.
6. Use Generate release notes to generate notes automatically.
7. Review the notes for accuracy before publishing.

The first release is v1.0.0.


## Final validation

Validated from a fresh clone on Ubuntu on 2026-10-29:
- npm ci completed successfully.
- npm reported 0 known dependency vulnerabilities.
- All 8 automated tests passed.
- ESLint and the production build passed.
- The application started successfully.
- Manual checks passed for adding, editing, category filtering,
  the displayed total, persistence after refresh and deletion.
- Editing did not create a duplicate expense.
- A deleted expense did not return after refreshing.

Docker build and container recreation were validated separately,
as described in the Docker section.

## Project links

- Repository: https://github.com/amlinskyirina/expense-tracker
- CI results: https://github.com/amlinskyirina/expense-tracker/actions
- Release v1.0.0: https://github.com/amlinskyirina/expense-tracker/releases/tag/v1.0.0
- CI implementation: https://github.com/amlinskyirina/expense-tracker/pull/10
- Intentional CI failure check, closed without merging:
  https://github.com/amlinskyirina/expense-tracker/pull/11
- Release preparation: https://github.com/amlinskyirina/expense-tracker/pull/12

## Scope and remaining requirements

Implemented features are listed in the Features section.
Date filtering and a monthly summary are not implemented.
Automated coverage reporting and enforcement of a 70% threshold
are not included.
Three peer code reviews have not been completed.
