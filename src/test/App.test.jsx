import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import App from "../App";

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

test("deletes only the selected expense after confirmation", async () => {
  const user = userEvent.setup();

  // מכינים שתי הוצאות שמורות
  localStorage.setItem(
    "expenses",
    JSON.stringify([
      {
        id: "expense-1",
        description: "קניות בסופר",
        amount: 100,
        category: "Food",
        date: "2026-10-28",
      },
      {
        id: "expense-2",
        description: "נסיעה ברכבת",
        amount: 20,
        category: "Transport",
        date: "2026-10-28",
      },
    ])
  );

  // מדמים אישור בחלון המחיקה
  const confirmMock = vi
    .spyOn(window, "confirm")
    .mockReturnValue(true);

  render(<App />);

  // מוצאים את השורה של ההוצאה שרוצים למחוק
  const expenseRow = screen.getByRole("row", {
    name: /קניות בסופר/,
  });

  await user.click(
    within(expenseRow).getByRole("button", { name: "מחיקה" })
  );

  // נשלחה בקשת אישור
  expect(confirmMock).toHaveBeenCalledWith("למחוק את ההוצאה?");

  // רק ההוצאה שנבחרה הוסרה מהמסך
  expect(screen.queryByText("קניות בסופר")).not.toBeInTheDocument();
  expect(screen.getByText("נסיעה ברכבת")).toBeInTheDocument();

  // גם הרשימה השמורה עודכנה
  const savedExpenses = JSON.parse(
    localStorage.getItem("expenses")
  );

  expect(savedExpenses).toHaveLength(1);
  expect(savedExpenses[0].id).toBe("expense-2");
});
test("filters expenses and updates the displayed total", async () => {
  const user = userEvent.setup();

  // מכינים שתי הוצאות מקטגוריות שונות
  const expenses = [
    {
      id: "expense-1",
      description: "קניות בסופר",
      amount: 100.5,
      category: "Food",
      date: "2026-10-28",
    },
    {
      id: "expense-2",
      description: "נסיעה ברכבת",
      amount: 20,
      category: "Transport",
      date: "2026-10-28",
    },
  ];

  localStorage.setItem("expenses", JSON.stringify(expenses));

  render(<App />);

  // מוצאים את אזור הסיכום
  const summary = screen
    .getByRole("heading", { name: "סך ההוצאות המוצגות" })
    .closest("section");

  // בתחילה מוצג הסכום של שתי ההוצאות
  expect(summary).toHaveTextContent("120.50 ₪");

  // מסננים לפי מזון
  await user.selectOptions(
    screen.getByLabelText("סינון לפי קטגוריה"),
    "Food"
  );

  expect(screen.getByText("קניות בסופר")).toBeInTheDocument();

  expect(
    screen.queryByText("נסיעה ברכבת")
  ).not.toBeInTheDocument();

  expect(summary).toHaveTextContent("100.50 ₪");

  // מחזירים את כל ההוצאות
  await user.selectOptions(
    screen.getByLabelText("סינון לפי קטגוריה"),
    "All"
  );

  expect(screen.getByText("נסיעה ברכבת")).toBeInTheDocument();
  expect(summary).toHaveTextContent("120.50 ₪");

  // הסינון לא שינה את הנתונים השמורים
  expect(
    JSON.parse(localStorage.getItem("expenses"))
  ).toEqual(expenses);
});
test("updates an expense without creating a duplicate", async () => {
  const user = userEvent.setup();

  // מכינים הוצאה קיימת
  localStorage.setItem(
    "expenses",
    JSON.stringify([
      {
        id: "expense-1",
        description: "קניות בסופר",
        amount: 100,
        category: "Food",
        date: "2026-10-28",
      },
    ])
  );

  render(<App />);

  // פותחים את ההוצאה לעריכה
  const expenseRow = screen.getByRole("row", {
    name: /קניות בסופר/,
  });

  await user.click(
    within(expenseRow).getByRole("button", { name: "עריכה" })
  );

  // משנים את הסכום
  await user.clear(screen.getByLabelText("סכום בש״ח"));
  await user.type(screen.getByLabelText("סכום בש״ח"), "150");

  await user.click(
    screen.getByRole("button", { name: "שמירת שינויים" })
  );

  // בודקים את השורה המעודכנת
  const updatedRow = screen.getByRole("row", {
    name: /קניות בסופר/,
  });

  expect(updatedRow).toHaveTextContent("150.00 ₪");

  // בטבלה יש כותרת ושורת הוצאה אחת בלבד
  expect(screen.getAllByRole("row")).toHaveLength(2);

  // גם הסכום הכולל התעדכן
  const summary = screen
    .getByRole("heading", { name: "סך ההוצאות המוצגות" })
    .closest("section");

  expect(summary).toHaveTextContent("150.00 ₪");

  // ההוצאה נשמרה עם אותו מזהה והסכום החדש
  const savedExpenses = JSON.parse(
    localStorage.getItem("expenses")
  );

  expect(savedExpenses).toHaveLength(1);

  expect(savedExpenses[0]).toEqual({
    id: "expense-1",
    description: "קניות בסופר",
    amount: 150,
    category: "Food",
    date: "2026-10-28",
  });
});

test("adds an expense to the list and saves it", async () => {
  const user = userEvent.setup();

  render(<App />);

  // ממלאים הוצאה חדשה
  await user.type(
    screen.getByLabelText("תיאור"),
    "בדיקת הוספה"
  );

  await user.type(
    screen.getByLabelText("סכום בש״ח"),
    "25.50"
  );

  await user.type(
    screen.getByLabelText("תאריך"),
    "2026-10-28"
  );

  await user.click(
    screen.getByRole("button", { name: "הוספת הוצאה" })
  );

  // ההוצאה מופיעה בטבלה
  const expenseRow = screen.getByRole("row", {
    name: /בדיקת הוספה/,
  });

  expect(expenseRow).toHaveTextContent("25.50 ₪");

  // הסכום הכולל התעדכן
  const summary = screen
    .getByRole("heading", { name: "סך ההוצאות המוצגות" })
    .closest("section");

  expect(summary).toHaveTextContent("25.50 ₪");

  // ההוצאה נשמרה בדפדפן המדומה
  const savedExpenses = JSON.parse(
    localStorage.getItem("expenses")
  );

  expect(savedExpenses).toHaveLength(1);

  expect(savedExpenses[0]).toEqual({
    id: expect.any(String),
    description: "בדיקת הוספה",
    amount: 25.5,
    category: "Food",
    date: "2026-10-28",
  });
});