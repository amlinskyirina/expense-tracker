import { useState } from "react";
import styled from "styled-components";

const FormBox = styled.section`
  background-color: white;
  border: 1px solid #e1ddfa;
  border-radius: 12px;
  padding: 24px;
  margin-top: 22px;
`;

const FormTitle = styled.h2`
  margin: 0 0 24px;
  font-size: 28px;
`;

const Fields = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 0.85fr 1fr 1fr;
  gap: 24px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input,
  select {
    width: 100%;
    min-width: 0;
    height: 48px;
    padding: 10px 14px;
    background-color: white;
    color: #100b48;
    border: 1px solid #cdd1e3;
    border-radius: 8px;
  }

  input::placeholder {
    color: #9490ad;
  }

  input:focus,
  select:focus {
    outline: 2px solid #b8a4ff;
    outline-offset: 2px;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
`;

const Button = styled.button`
  background-color: #5126cc;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 28px;
  cursor: pointer;

  &:hover {
    background-color: #3f1ba8;
  }
`;

const ErrorMessage = styled.p`
  color: #b42318;
`;

function ExpenseForm({
  editingExpense,
  onSaveExpense,
  onCancelEdit,
}) {
  // בעריכה מציגים את פרטי ההוצאה שנבחרה
  const [description, setDescription] = useState(
    editingExpense ? editingExpense.description : ""
  );

  const [amount, setAmount] = useState(
    editingExpense ? String(editingExpense.amount) : ""
  );

  const [category, setCategory] = useState(
    editingExpense ? editingExpense.category : "Food"
  );

  const [date, setDate] = useState(
    editingExpense ? editingExpense.date : ""
  );

  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => {
    const cleanDescription = description.trim();
    const numberAmount = Number(amount);

    if (cleanDescription === "") {
      setErrorMessage("יש למלא תיאור להוצאה.");
      return;
    }

    if (!Number.isFinite(numberAmount) || numberAmount <= 0) {
      setErrorMessage("יש להזין סכום גדול מאפס.");
      return;
    }

    if (date === "") {
      setErrorMessage("יש לבחור תאריך.");
      return;
    }

    const expenseData = {
      description: cleanDescription,
      amount: numberAmount,
      category: category,
      date: date,
    };

    // שליחת פרטי ההוצאה ל-App
    onSaveExpense(expenseData);

    // ניקוי השדות
    setDescription("");
    setAmount("");
    setCategory("Food");
    setDate("");
    setErrorMessage("");
  };

  return (
    <FormBox>
      <FormTitle>
        {editingExpense ? "עריכת הוצאה" : "הוספת הוצאה"}
      </FormTitle>

      <Fields>
        <Field>
          תיאור
          <input
            type="text"
            placeholder="על מה שילמת?"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Field>

        <Field>
          סכום בש״ח
          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </Field>

        <Field>
          קטגוריה
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="Food">מזון</option>
            <option value="Transport">תחבורה</option>
            <option value="Home">בית</option>
            <option value="Entertainment">בילויים</option>
            <option value="Other">אחר</option>
          </select>
        </Field>

        <Field>
          תאריך
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </Field>
      </Fields>

      {errorMessage && (
        <ErrorMessage role="alert">
          {errorMessage}
        </ErrorMessage>
      )}

      <Actions>
        <Button type="button" onClick={handleClick}>
          {editingExpense ? "שמירת שינויים" : "הוספת הוצאה"}
        </Button>

        {editingExpense && (
          <Button type="button" onClick={onCancelEdit}>
            ביטול עריכה
          </Button>
        )}
      </Actions>
    </FormBox>
  );
}

export default ExpenseForm;