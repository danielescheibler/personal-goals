import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.primary};
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(31,200,219,0.09);
  border: 1.5px solid ${({ theme }) => theme.primary};
`;

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <Button onClick={toggleTheme} title="Alternar tema">
      {theme === "light" ? "🌙" : "☀️"}
    </Button>
  );
}