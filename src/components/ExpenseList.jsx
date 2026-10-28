import styled from "styled-components";

// שמות הקטגוריות בעברית
const categoryNames = {
  Food: "מזון",
  Transport: "תחבורה",
  Home: "בית",
  Entertainment: "בילויים",
  Other: "אחר",
};

const ListBox = styled.section`
  background-color: white;
  border: 1px solid #e1ddfa;
  border-radius: 12px;
  padding: 24px;
  margin-top: 22px;
`;

const ListHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
`;

const ListTitle = styled.h2`
  margin: 0;
  font-size: 28px;
`;

const CategoryFilter = styled.select`
  min-width: 210px;
  padding: 10px 14px;
  border: 1px solid #cdd1e3;
  border-radius: 8px;
  background-color: white;
  color: #100b48;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  border: 1px solid #e1ddfa;
  border-radius: 8px;
`;

const Table = styled.table`
  width: 100%;
  min-width: 650px;
  border-collapse: collapse;
  text-align: right;

  th,
  td {
    padding: 12px 18px;
    border-bottom: 1px solid #e0e2eb;
  }

  th {
    background-color: #f0edff;
    font-weight: normal;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const EditButton = styled.button`
  padding: 7px 16px;
  border: 1px solid #c9b8ff;
  border-radius: 7px;
  background-color: #f7f4ff;
  color: #5126cc;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  padding: 7px 16px;
  border: 1px solid #ff7777;
  border-radius: 7px;
  background-color: white;
  color: #d62828;
  cursor: pointer;
`;

// שינוי תצוגת התאריך ליום/חודש/שנה
function formatDate(date) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

function ExpenseList({
  expenses,
  selectedCategory,
  onCategoryChange,
  onEditExpense,
  onDeleteExpense,
}) {
  return (
    <ListBox>
      <ListHeader>
        <ListTitle>רשימת ההוצאות</ListTitle>

        <CategoryFilter
          aria-label="סינון לפי קטגוריה"
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="All">כל הקטגוריות</option>
          <option value="Food">מזון</option>
          <option value="Transport">תחבורה</option>
          <option value="Home">בית</option>
          <option value="Entertainment">בילויים</option>
          <option value="Other">אחר</option>
        </CategoryFilter>
      </ListHeader>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th scope="col">תיאור</th>
              <th scope="col">סכום</th>
              <th scope="col">קטגוריה</th>
              <th scope="col">תאריך</th>
              <th scope="col">פעולות</th>
            </tr>
          </thead>

          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={5}>אין הוצאות להצגה.</td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.description}</td>

                  <td>
                    <bdi>{expense.amount.toFixed(2)} ₪</bdi>
                  </td>

                  <td>{categoryNames[expense.category]}</td>

                  <td>
                    <bdi>{formatDate(expense.date)}</bdi>
                  </td>

                  <td>
                    <Actions>
                      <EditButton
                        type="button"
                        onClick={() => onEditExpense(expense)}
                      >
                        עריכה
                      </EditButton>

                      <DeleteButton
                        type="button"
                        onClick={() => onDeleteExpense(expense.id)}
                      >
                        מחיקה
                      </DeleteButton>
                    </Actions>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </TableWrapper>
    </ListBox>
  );
}

export default ExpenseList;