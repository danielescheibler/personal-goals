import React, { createContext, useReducer, useContext, useEffect } from "react";

const GoalsContext = createContext();

const initialState = JSON.parse(localStorage.getItem("goals")) || [];

function goalsReducer(state, action) {
  switch (action.type) {
    case "ADD_GOAL":
      return [...state, action.payload];
    case "TOGGLE_GOAL":
      return state.map(goal =>
        goal.id === action.payload ? { ...goal, completed: !goal.completed } : goal
      );
    case "DELETE_GOAL":
      return state.filter(goal => goal.id !== action.payload);
    default:
      return state;
  }
}

export function GoalsProvider({ children }) {
  const [goals, dispatch] = useReducer(goalsReducer, initialState);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  return (
    <GoalsContext.Provider value={{ goals, dispatch }}>
      {children}
    </GoalsContext.Provider>
  );
}

export function useGoals() {
  return useContext(GoalsContext);
}