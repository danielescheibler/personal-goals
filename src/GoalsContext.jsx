import React, { createContext, useContext, useReducer, useState } from "react";

const GoalsContext = createContext();

function goalsReducer(state, action) {
  switch (action.type) {
    case "ADD_GOAL":
      return [...state, action.payload];
    case "TOGGLE_GOAL":
      return state.map(goal =>
        goal.id === action.payload.id ? { ...goal, completed: !goal.completed } : goal
      );
    case "DELETE_GOAL":
      return state.filter(goal => goal.id !== action.payload.id);
    case "UPDATE_PROGRESS":
      return state.map(goal =>
        goal.id === action.payload.id
          ? {
              ...goal,
              progress: action.payload.progress,
              completed: action.payload.progress >= (goal.total || 1),
            }
          : goal
      );
    case "FINALIZE_PROJECT":
      return state.map(goal =>
        goal.id === action.payload.id
          ? { ...goal, completed: true, progress: goal.total || 1 }
          : goal
      );
    default:
      return state;
  }
}

export function GoalsProvider({ children }) {
  const [goals, dispatch] = useReducer(goalsReducer, []);
  const [toast, setToast] = useState(null);

  return (
    <GoalsContext.Provider value={{ goals, dispatch, toast, setToast }}>
      {children}
    </GoalsContext.Provider>
  );
}

export function useGoals() {
  return useContext(GoalsContext);
}