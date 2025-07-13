import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.background};
    font-family: 'Open Sans', sans-serif;
    transition: background 0.4s ease-in-out;
  }
`;
