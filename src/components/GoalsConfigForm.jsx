import React, { useState } from "react";
import styled from "styled-components";
import { useGoals } from "../context/GoalsContext";
import {
  FiBook, FiHeart, FiBriefcase, FiUser,
  FiSmile, FiDroplet, FiHome, FiBookOpen,
  FiUsers, FiMusic, FiDollarSign, FiMoon,
  FiCoffee, FiSun, FiTv, FiTarget, FiCheckCircle
} from "react-icons/fi";

const categoryGroups = [
  // ... (igual ao exemplo anterior)
];

const Form = styled.form`
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(31,200,219,0.06);
  padding: 14px;
  margin: 14px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 8px 10px;
  border-radius: 8px;
  border: 1.2px solid ${({ theme }) => theme.label};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  min-width: 0;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 8px 10px;
  border-radius: 8px;
  border: 1.2px solid ${({ theme }) => theme.label};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  min-width: 0;
  width: 100%;
  resize: vertical;
`;

const CategoryGroups = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const GroupTitle = styled.div`
  font-size: 0.97rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 2px;
  margin-top: 4px;
`;

const CategoryBar = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 2px;
`;

const CategoryOption = styled.button`
  background: ${({ selected, theme }) => (selected ? theme.primary : theme.background)};
  color: ${({ selected, theme }) => (selected ? "#fff" : theme.label)};
  border: 2px solid ${({ selected, theme }) => (selected ? theme.primary : theme.label)};
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  transition: background 0.2s, color 0.2s, border 0.2s;
  cursor: pointer;
  outline: none;
  margin-bottom: 2px;
  &:hover, &:focus {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
  }
`;

const CategoryLabel = styled.div`
  text-align: center;
  font-size: 0.80rem;
  color: ${({ selected, theme }) => (selected ? theme.primary : theme.label)};
  margin-top: 2px;
  width: 48px;
  word-break: break-word;
`;

const CategoryOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 54px;
`;

const RowCheck = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.primary};
  color: #fff;
  padding: 8px 0;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
  }
`;

export default function GoalConfigForm({ onClose }) {
  const { dispatch, setToast } = useGoals();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Estudo");
  const [deadline, setDeadline] = useState(() => (new Date()).toISOString().split("T")[0]);
  const [note, setNote] = useState("");
  const [repeat, setRepeat] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_GOAL",
      payload: {
        id: Date.now().toString(),
        title: title || category,
        category,
        deadline,
        note,
        repeat,
        completed: false,
        progress: isProjectCategory(category) ? 0 : undefined,
        total: isProjectCategory(category) ? 1 : undefined,
      },
    });
    setTitle("");
    setCategory("Estudo");
    setDeadline((new Date()).toISOString().split("T")[0]);
    setNote("");
    setRepeat(false);
    setToast("Meta criada com sucesso!");
    if (onClose) onClose();
  };

  function isProjectCategory(cat) {
    return ["Curso", "Leitura", "Série"].includes(cat);
  }

  return (
    <Form onSubmit={submit}>
      <Input
        type="text"
        value={title}
        placeholder="Nome da meta (ex: Caminhar 30min)"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <CategoryGroups>
        {categoryGroups.map(({ group, categories }) => (
          <div key={group}>
            <GroupTitle>{group}</GroupTitle>
            <CategoryBar>
              {categories.map((cat) => (
                <CategoryOptionContainer key={cat.label}>
                  <CategoryOption
                    type="button"
                    selected={category === cat.label}
                    onClick={() => setCategory(cat.label)}
                    title={cat.label}
                  >
                    {cat.icon}
                  </CategoryOption>
                  <CategoryLabel selected={category === cat.label}>
                    {cat.label}
                  </CategoryLabel>
                </CategoryOptionContainer>
              ))}
            </CategoryBar>
          </div>
        ))}
      </CategoryGroups>
      <TextArea
        rows={2}
        value={note}
        placeholder="Mais informações (opcional)"
        onChange={(e) => setNote(e.target.value)}
      />
      <RowCheck>
        <input
          type="checkbox"
          checked={repeat}
          onChange={(e) => setRepeat(e.target.checked)}
          id="repeat"
        />
        <label htmlFor="repeat">Repetir todos os dias</label>
      </RowCheck>
      <Button type="submit">Salvar</Button>
      {onClose && (
        <Button type="button" style={{ background: "#ccc", color: "#222" }} onClick={onClose}>Cancelar</Button>
      )}
    </Form>
  );
}