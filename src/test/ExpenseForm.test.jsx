import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";

import ExpenseForm from "../components/ExpenseForm";

test("rejects an empty description", async () => {
  const user = userEvent.setup();
  const onSaveExpense = vi.fn();

  render(
    <ExpenseForm
      editingExpense={null}
      onSaveExpense={onSaveExpense}
      onCancelEdit={vi.fn()}
    />
  );

  await user.click(
    screen.getByRole("button", { name: "הוספת הוצאה" })
  );

  expect(screen.getByRole("alert")).toHaveTextContent(
    "יש למלא תיאור להוצאה."
  );

  expect(onSaveExpense).not.toHaveBeenCalled();
});

test("submits a valid expense and clears the form", async () => {
  const user = userEvent.setup();
  const onSaveExpense = vi.fn();

  render(
    <ExpenseForm
      editingExpense={null}
      onSaveExpense={onSaveExpense}
      onCancelEdit={vi.fn()}
    />
  );

  // מילוי הטופס
  await user.type(
    screen.getByLabelText("תיאור"),
    "קניות בסופר"
  );

  await user.type(
    screen.getByLabelText("סכום בש״ח"),
    "100.50"
  );

  await user.selectOptions(
    screen.getByLabelText("קטגוריה"),
    "Food"
  );

  await user.type(
    screen.getByLabelText("תאריך"),
    "2026-10-28"
  );

  // לחיצה על הוספה
  await user.click(
    screen.getByRole("button", { name: "הוספת הוצאה" })
  );

  // בדיקה שהטופס שלח הוצאה אחת עם הפרטים הנכונים
  expect(onSaveExpense).toHaveBeenCalledTimes(1);

  expect(onSaveExpense).toHaveBeenCalledWith({
    description: "קניות בסופר",
    amount: 100.5,
    category: "Food",
    date: "2026-10-28",
  });

  // בדיקה שהשדות חזרו לערכי ההתחלה
  expect(screen.getByLabelText("תיאור")).toHaveValue("");
  expect(screen.getByLabelText("סכום בש״ח")).toHaveValue(null);
  expect(screen.getByLabelText("קטגוריה")).toHaveValue("Food");
  expect(screen.getByLabelText("תאריך")).toHaveValue("");
});

//בדיקה של סכום שלילי

test("rejects a negative amount", async () => {
  const user = userEvent.setup();
  const onSaveExpense = vi.fn();

  render(
    <ExpenseForm
      editingExpense={null}
      onSaveExpense={onSaveExpense}
      onCancelEdit={vi.fn()}
    />
  );

  // מילוי תיאור תקין
  await user.type(
    screen.getByLabelText("תיאור"),
    "בדיקת סכום שלילי"
  );

  // הזנת סכום שאינו תקין
  await user.type(
    screen.getByLabelText("סכום בש״ח"),
    "-10"
  );

  await user.type(
    screen.getByLabelText("תאריך"),
    "2026-10-28"
  );

  await user.click(
    screen.getByRole("button", { name: "הוספת הוצאה" })
  );

  // בדיקת הודעת השגיאה
  expect(screen.getByRole("alert")).toHaveTextContent(
    "יש להזין סכום גדול מאפס."
  );

  // לא נשלחה הוצאה לשמירה
  expect(onSaveExpense).not.toHaveBeenCalled();
});

test("loads an existing expense and submits edited details", async () => {
  const user = userEvent.setup();
  const onSaveExpense = vi.fn();

  const expense = {
    id: "expense-1",
    description: "קניות",
    amount: 100,
    category: "Food",
    date: "2026-10-28",
  };

  render(
    <ExpenseForm
      editingExpense={expense}
      onSaveExpense={onSaveExpense}
      onCancelEdit={vi.fn()}
    />
  );

  // מוודאים שכל פרטי ההוצאה מוצגים בטופס
  expect(screen.getByLabelText("תיאור")).toHaveValue("קניות");
  expect(screen.getByLabelText("סכום בש״ח")).toHaveValue(100);
  expect(screen.getByLabelText("קטגוריה")).toHaveValue("Food");
  expect(screen.getByLabelText("תאריך")).toHaveValue("2026-10-28");

  // משנים את התיאור ואת הסכום
  await user.clear(screen.getByLabelText("תיאור"));
  await user.type(screen.getByLabelText("תיאור"), "קניות לבית");

  await user.clear(screen.getByLabelText("סכום בש״ח"));
  await user.type(screen.getByLabelText("סכום בש״ח"), "150");

  await user.click(
    screen.getByRole("button", { name: "שמירת שינויים" })
  );

  // מוודאים שנשלחו הפרטים המעודכנים
  expect(onSaveExpense).toHaveBeenCalledTimes(1);

  expect(onSaveExpense).toHaveBeenCalledWith({
    description: "קניות לבית",
    amount: 150,
    category: "Food",
    date: "2026-10-28",
  });
});