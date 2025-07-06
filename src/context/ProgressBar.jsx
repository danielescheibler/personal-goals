import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  background: #e0e0e0;
  border-radius: 8px;
  width: 100%;
  height: 16px;
  margin: 16px 0;
`;

const Fill = styled.div`
  background: ${({ theme }) => theme.primary};
  height: 100%;
  border-radius: 8px;
  width: ${({ percent }) => percent}%;
  transition: width 0.5s;
`;

export default function ProgressBar({ percent }) {
  return (
    <Bar>
      <Fill percent={percent} />
    </Bar>
  );
}