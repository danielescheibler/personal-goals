import React, { useState } from "react";
import styled from "styled-components";
import { useGoals } from "../context/GoalsContext";
import { FiTrash2, FiPlus } from "react-icons/fi";
import GoalConfigForm from "./GoalsConfigForm";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: ${({ theme }) => theme.card};
  padding: 10px;
  border-radius: 8px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

export default function GoalConfigList() {
  const { goals, dispatch } = useGoals();
  const [showForm, setShowForm] = useState(false);

  const handleDelete = id => {
    dispatch({ type: "DELETE_GOAL", payload: { id } });
  };

  return (
    <div>
      <Button onClick={() => setShowForm(!showForm)}>
        <FiPlus /> Nova Meta
      </Button>
      {showForm && <GoalConfigForm onClose={() => setShowForm(false)} />}
      <List>
        {goals.length === 0 && <div>Nenhuma meta cadastrada ainda.</div>}
        {goals.map(goal => (
          <Row key={goal.id}>
            <div>
              <strong>{goal.title}</strong>
              <div style={{ fontSize: "0.9em", color: "#888" }}>{goal.category}</div>
            </div>
            <Button style={{ background: "#f66" }} onClick={() => handleDelete(goal.id)}>
              <FiTrash2 />
            </Button>
          </Row>
        ))}
      </List>
    </div>
  );
}