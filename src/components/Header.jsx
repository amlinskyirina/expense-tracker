import styled from "styled-components";

const StyledHeader = styled.header`
  margin-bottom: 28px;
`;

const Title = styled.h1`
  margin: 0 0 10px;
  color: #100b48;
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 800;
`;

const Subtitle = styled.p`
  margin: 0;
  color: #77729c;
  font-size: 24px;
`;

function Header() {
  return (
    <StyledHeader>
      <Title>ניהול ההוצאות שלי</Title>
      <Subtitle>כל ההוצאות במקום אחד</Subtitle>
    </StyledHeader>
  );
}

export default Header;