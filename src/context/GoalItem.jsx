import { motion } from "framer-motion";
import styled from "styled-components";

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(31,200,219,0.05);
  margin: 12px 0;
  padding: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  font-size: 1.1rem;
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
  color: ${({ completed, theme }) => (completed ? theme.label : theme.text)};
`;

export function GoalItem({ goal, onToggle, onRemove }) {
  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <Title completed={goal.completed}>{goal.title}</Title>
      <div>
        <button onClick={() => onToggle(goal.id)}>
          {goal.completed ? "✅" : "✔️"}
        </button>
        <button onClick={() => onRemove(goal.id)}>🗑️</button>
      </div>
    </Card>
  );
}