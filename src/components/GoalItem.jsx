import React from "react";
import styled from "styled-components";
import { useGoals } from "../context/GoalsContext";
import { motion } from "framer-motion";

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  margin-bottom: 10px;
  border-radius: 8px;
  padding: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
  color: ${({ completed, theme }) => (completed ? theme.label : theme.text)};
`;

const Button = styled.button`
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  margin-left: 10px;
  font-weight: 600;
  cursor: pointer;
`;

export default function GoalItem({ goal }) {
  const { dispatch } = useGoals();
  return (
    <Card
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Title completed={goal.completed}>{goal.title}</Title>
      <div>
        {!goal.completed && (
          <Button onClick={() => dispatch({ type: "TOGGLE_GOAL", payload: goal.id })}>
            Concluir
          </Button>
        )}
        <Button
          style={{ background: "#e74c3c" }}
          onClick={() => dispatch({ type: "DELETE_GOAL", payload: goal.id })}
        >
          Excluir
        </Button>
      </div>
    </Card>
  );
}