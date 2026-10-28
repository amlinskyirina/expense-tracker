import styled from "styled-components";

const SummaryBox = styled.section`
  background-color: #ede9fe;
  border: 1px solid #dfd8ff;
  border-radius: 12px;
  padding: 28px;
`;

const SummaryTitle = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: normal;
`;

const Amount = styled.p`
  margin: 10px 0 0;
  color: #4b24b8;
  font-size: 48px;
  font-weight: bold;
`;

function ExpenseSummary({ total }) {
  return (
    <SummaryBox>
      <SummaryTitle>סך ההוצאות המוצגות</SummaryTitle>

      <Amount>
        <bdi>{total.toFixed(2)} ₪</bdi>
      </Amount>
    </SummaryBox>
  );
}

export default ExpenseSummary;