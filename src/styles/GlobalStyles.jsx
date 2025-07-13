import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: 'Open Sans', sans-serif;
    background: ${({ theme }) => theme.background};
    transition: all 0.3s ease;
  }
`;

export default GlobalStyles;

