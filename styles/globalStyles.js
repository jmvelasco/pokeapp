import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    html,
    body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    * {
        box-sizing: border-box;
    }

    nav {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        font-size: 1.6rem;
        color: white;
        background-color: darkblue;
        padding: 0.5rem;
        display: flex;
    }

    .active {
        color: yellow;
    }
`;
