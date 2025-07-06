import React, { useMemo, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GoalsProvider, useGoals } from "./context/GoalsContext";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
import ProgressBar from "./components/ProgressBar";
import ThemeToggle from "./components/ThemeToggle";

const lightTheme = {
  primary: "#1fc8db",
  secondary: "#8ed9f6",
  card: "#fff",
  background: "#f7fafd",
  label: "#b4c3ca",
  text: "#24292f",
  textSecondary: "#666"
};

const darkTheme = {
  primary: "#1fc8db",
  secondary: "#8ed9f6",
  card: "#282c34",
  background: "#181b20",
  label: "#b4c3ca",
  text: "#fff",
  textSecondary: "#aaa"
};

const Container = styled.div`
  max-width: 400px;
  margin: 32px auto;
  background: ${props => props.theme.background};
  border-radius: 18px;
  min-height: 100vh;
  box-shadow: 0 4px 28px rgba(0,0,0,0.08);
  padding: 0 0 20px 0;
`;

const Header = styled.div`
  padding: 24px 16px 8px 16px;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
  text-align: left;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

function ProgressSummary() {
  const { goals } = useGoals();
  const completed = goals.filter(g => g.completed).length;
  const percent = goals.length ? Math.round((completed / goals.length) * 100) : 0;
  return (
    <>
      <ProgressBar percent={percent} />
      <div style={{ textAlign: "center", color: "#888", marginBottom: 8 }}>
        {completed} de {goals.length} metas completas ({percent}%)
      </div>
    </>
  );
}

function AppContent({ isDark, toggleTheme }) {
  return (
    <Container>
      <TopBar>
        <Header>Metas Pessoais</Header>
        <ThemeToggle toggleTheme={toggleTheme} isDark={isDark} />
      </TopBar>
      <GoalForm />
      <ProgressSummary />
      <GoalList />
    </Container>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);
  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeProvider theme={theme}>
      <GoalsProvider>
        <AppContent isDark={isDark} toggleTheme={toggleTheme} />
      </GoalsProvider>
    </ThemeProvider>
  );
}