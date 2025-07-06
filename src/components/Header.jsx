import React, { useContext } from "react";
import styled from "styled-components";
import ThemeToggle from "./ThemeToggle";
import { ThemeContext } from "../context/ThemeContext";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 420px;
  margin: 0 auto;
  padding: 20px 8px 0 8px;
  background: transparent;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
  margin: 0;
  font-weight: 700;
  letter-spacing: -1px;
`;

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <HeaderContainer>
      <Title>Minhas Metas</Title>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </HeaderContainer>
  );
}