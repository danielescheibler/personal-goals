import React from "react";
import styled from "styled-components";
import { useGoals } from "../context/GoalsContext";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 28px 0 24px 0;
`;

const Circle = styled.svg`
  width: 74px;
  height: 74px;
`;

const Percent = styled.span`
  margin-left: 16px;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;

export default function ProgressBar() {
  const { goals } = useGoals();
  const total = goals.length;
  const completed = goals.filter((g) => g.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Barra circular SVG
  const radius = 31;
  const stroke = 7;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <Container>
      <Circle>
        <circle
          stroke="#A0A0A0"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx="37"
          cy="37"
        />
        <circle
          stroke="#1FC8DB"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset, transition: "stroke-dashoffset 0.5s" }}
          r={normalizedRadius}
          cx="37"
          cy="37"
        />
      </Circle>
      <Percent>{percent}% completo</Percent>
    </Container>
  );
}