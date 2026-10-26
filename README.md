# expense-tracker
A simple expense tracker built to practice Git, testing, Docker, and CI/CD


## Project board

[Trello - Expense Tracker](https://trello.com/b/eGoIHmmw/expense-tracker)

## Technical plan

### Technologies
- React with JavaScript for the user interface.
- CSS for styling.
- localStorage for saving expenses in the browser.
- No custom backend or database.

### Main features
- Add, view, edit and delete expenses.
- Filter expenses by category.
- Display the total amount of the visible expenses.

### Expense fields
- id: a unique identifier.
- description: a required description.
- amount: a positive amount in ILS.
- category: Food, Transport, Home, Entertainment or Other.
- date: a valid date.

### Planned code structure
- src/components/: React components.
- src/utils/: validation, filtering and calculation functions.
- src/storage/: functions for reading and saving expenses.
- src/: application entry files and styles.

### Storage limitations
- Expenses are saved in the same browser and site address.
- Data is not automatically shared between computers.
- Clearing the site's browser data removes the saved expenses.