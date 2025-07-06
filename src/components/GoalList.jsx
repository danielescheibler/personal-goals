import React from "react";
import { useGoals } from "../context/GoalsContext";
import GoalItem from "./GoalItem";

export default function GoalList() {
  const { goals } = useGoals();
  if (!goals.length) return <div>Nenhuma meta cadastrada ainda!</div>;
  return (
    <div>
      {goals.map(goal => (
        <GoalItem key={goal.id} goal={goal} />
      ))}
    </div>
  );
}