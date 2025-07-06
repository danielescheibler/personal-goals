import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    width: 100vw;
    min-height: 100vh;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Inter', Arial, sans-serif;
    transition: background 0.3s, color 0.3s;
    box-sizing: border-box;
    overscroll-behavior: none;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  #root {
    min-height: 100vh;
    width: 100vw;
  }

  main {
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    padding: 24px 4px;
  }

  @media (max-width: 540px) {
    main {
      padding: 16px 2vw;
      max-width: 100vw;
    }
  }

  button {
    font-family: inherit;
    border: none;
    cursor: pointer;
    background: none;
  }
`;