import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle<{ darkMode: boolean }>`
  body {
    background-color: ${({ darkMode }) => (darkMode ? "#171823" : "#FAFAFA")};
    background-image: ${({ darkMode }) =>
      darkMode ? "url(/images/bg-mobile-dark.jpg)" : ""};
    background-position: top;
    background-size: contain;
    color: ${({ darkMode }) => (darkMode ? "white" : "black")};
    transition: background-color 0.2s ease-in-out;
  }

  @media only screen and (min-width: 90rem) {
    body{
        background-image: ${({ darkMode }) =>
          darkMode ? "url(/images/bg-desktop-dark.jpg)" : ""};
    }
  }
`;

export default GlobalStyle;
