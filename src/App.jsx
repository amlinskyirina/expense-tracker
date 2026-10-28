import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

import Header from "./components/Header";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

// עיצוב בסיסי של הדף
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color: #f5f3ff;
    color: #100b48;
    font-family: Arial, sans-serif;
  }

  #root {
    width: 100%;
    max-width: none;
    margin: 0;
    padding: 0;
    text-align: right;
  }

  input, select, button {
    font: inherit;
  }
`;

const Page = styled.main`
  max-width: 1440px;
  margin: 0 auto;
  padding: 28px 32px;

  @media (max-width: 700px) {
    padding: 20px 12px;
  }
`;

const StorageError = styled.p`
  color: #b42318;
`;

// קריאת הנתונים השמורים בדפדפן
function loadExpenses() {
  try {
    const savedExpenses = localStorage.getItem("expenses");

    if (savedExpenses === null) {
      return { items: [], canSave: true };
    }

    const items = JSON.parse(savedExpenses);

    // בדיקה שהנתונים מתאימים להצגה באפליקציה
    const validCategories = [
      "Food",
      "Transport",
      "Home",
      "Entertainment",
      "Other",
    ];

    if (
      !Array.isArray(items) ||
      !items.every(
        (expense) =>
          expense !== null &&
          typeof expense === "object" &&
          (typeof expense.id === "string" ||
            typeof expense.id === "number") &&
          typeof expense.description === "string" &&
          typeof expense.amount === "number" &&
          Number.isFinite(expense.amount) &&
          expense.amount > 0 &&
          validCategories.includes(expense.category) &&
          typeof expense.date === "string" &&
          /^\d{4}-\d{2}-\d{2}$/.test(expense.date)
      )
    ) {
      throw new Error("Invalid saved expenses");
    }

    return { items: items, canSave: true };
  } catch {
    // לא נכתוב מעל מידע שלא הצלחנו לקרוא
    return { items: [], canSave: false };
  }
}

function App() {
  const [initialData] = useState(loadExpenses);
  const [expenses, setExpenses] = useState(initialData.items);

  const [editingExpense, setEditingExpense] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [storageError, setStorageError] = useState(
    initialData.canSave
      ? ""
      : "לא הצלחנו לקרוא את ההוצאות השמורות. השמירה כבויה."
  );

  // עדכון הרשימה ושמירתה בדפדפן
  const saveExpenses = (updatedExpenses) => {
    setExpenses(updatedExpenses);

    if (!initialData.canSave) {
      return;
    }

    try {
      localStorage.setItem(
        "expenses",
        JSON.stringify(updatedExpenses)
      );

      setStorageError("");
    } catch {
      setStorageError(
        "השינוי מוצג במסך, אך לא הצלחנו לשמור אותו בדפדפן."
      );
    }
  };

  // הוספת הוצאה או שמירת עריכה
  const handleSaveExpense = (expenseData) => {
    if (editingExpense !== null) {
      const updatedExpenses = expenses.map((expense) => {
        if (expense.id === editingExpense.id) {
          return {
            ...expense,
            ...expenseData,
          };
        }

        return expense;
      });

      saveExpenses(updatedExpenses);
      setEditingExpense(null);
    } else {
      const newExpense = {
        ...expenseData,
        id: crypto.randomUUID(),
      };

      saveExpenses([...expenses, newExpense]);
    }
  };

  // בחירת הוצאה לעריכה
  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
  };

  // ביטול עריכה
  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  // מחיקת הוצאה לאחר אישור
  const handleDeleteExpense = (expenseId) => {
    const confirmed = window.confirm("למחוק את ההוצאה?");

    if (!confirmed) {
      return;
    }

    const remainingExpenses = expenses.filter(
      (expense) => expense.id !== expenseId
    );

    saveExpenses(remainingExpenses);

    if (editingExpense?.id === expenseId) {
      setEditingExpense(null);
    }
  };

  // סינון לפי קטגוריה
  const visibleExpenses = expenses.filter((expense) => {
    return (
      selectedCategory === "All" ||
      expense.category === selectedCategory
    );
  });

  // חישוב הסכום של ההוצאות המוצגות
  let total = 0;

  for (const expense of visibleExpenses) {
    total = total + expense.amount;
  }

  return (
    <>
      <GlobalStyle />

      <Page dir="rtl">
        <Header />

        {storageError && (
          <StorageError role="alert">
            {storageError}
          </StorageError>
        )}

        <ExpenseSummary total={total} />

        <ExpenseForm
          key={editingExpense ? editingExpense.id : "new"}
          editingExpense={editingExpense}
          onSaveExpense={handleSaveExpense}
          onCancelEdit={handleCancelEdit}
        />

        <ExpenseList
          expenses={visibleExpenses}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onEditExpense={handleEditExpense}
          onDeleteExpense={handleDeleteExpense}
        />
      </Page>
    </>
  );
}

export default App;