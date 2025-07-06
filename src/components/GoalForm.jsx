import React, { useState } from "react";
import styled from "styled-components";
import { useGoals } from "../context/GoalsContext";

const Form = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #dedede;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 600;
`;

export default function GoalForm() {
  const { dispatch } = useGoals();
  const [title, setTitle] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!title) return;
    dispatch({
      type: "ADD_GOAL",
      payload: {
        id: Date.now().toString(),
        title,
        completed: false,
      },
    });
    setTitle("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Nova meta..."
        required
      />
      <Button type="submit">Adicionar</Button>
    </Form>
  );
}