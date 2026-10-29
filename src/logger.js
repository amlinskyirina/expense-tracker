const events = {
  APP_STARTED: ["info", "Application started."],
  STORAGE_READ_FAILED: [
    "error",
    "Saved expenses could not be loaded. Saving is disabled.",
  ],
  STORAGE_WRITE_FAILED: [
    "error",
    "The screen was updated, but browser storage could not be updated.",
  ],
  STORAGE_WRITE_BLOCKED: [
    "warn",
    "Browser storage was not updated because saving is disabled.",
  ],
  EXPENSE_ADDED: ["info", "An expense was added to the displayed list."],
  EXPENSE_UPDATED: ["info", "An expense was updated in the displayed list."],
  EXPENSE_DELETED: ["info", "An expense was deleted from the displayed list."],
  EDIT_STARTED: ["info", "Expense editing started."],
  EDIT_CANCELLED: ["info", "Expense editing was cancelled."],
  DELETE_CANCELLED: ["info", "Expense deletion was cancelled."],
  DESCRIPTION_INVALID: ["warn", "Submission rejected: description is empty."],
  AMOUNT_INVALID: ["warn", "Submission rejected: amount must be positive."],
  DATE_INVALID: ["warn", "Submission rejected: date is missing."],
};

export function logEvent(event) {
  const definition = events[event];

  if (!definition) {
    return;
  }

  const [level, message] = definition;

  console[level]({
    timestamp: new Date().toISOString(),
    level,
    event,
    message,
  });
}