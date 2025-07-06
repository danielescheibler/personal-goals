import React from "react";
import styled, { keyframes } from "styled-components";
import { useGoals } from "../context/GoalsContext";

const slide = keyframes`
  from { transform: translateY(80px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Toast = styled.div`
  position: fixed;
  left: 50%;
  bottom: 36px;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.primary};
  color: #fff;
  min-width: 180px;
  padding: 14px 30px;
  border-radius: 20px;
  font-weight: 600;
  box-shadow: 0 2px 12px rgba(31,200,219,0.18);
  z-index: 50;
  animation: ${slide} 0.4s;
  font-size: 1rem;
  text-align: center;
`;

export default function FeedbackToast() {
  const { toast } = useGoals();
  if (!toast) return null;
  return <Toast>{toast}</Toast>;
}