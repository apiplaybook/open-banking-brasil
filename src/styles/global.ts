import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  * {
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
    color: #000;
  }
  a.blue {
    color: #2e93db;
  }
  strong,
  b {
    font-weight: 700;
  }

  body {
    color: rgba(0, 0, 0, 0.87);
    font-size: 0.875rem;
    font-family: 'Open Sans', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    line-height: 1.43;
    letter-spacing: 0.01071em;
    background-color: #f5f5f5;
    overflow-x: hidden;
    &.dark {
      background-color: #1b1b1b;
      color: #fff;
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.1) inset !important;
        box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.1) inset !important;
      }
      input:-internal-autofill-selected {
        background-color: transparent !important;
      }
    }
  }
  input, button {
    outline: 0;
    border: 0 none;
  }
  @media print {
    body {
      background-color: #fff;
      &.dark {
        background-color: #1b1b1b;
      }
    }
  }
`
