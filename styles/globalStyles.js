import styled from "styled-components";
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

export const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  text-align: center;
`;

export const StyledLink = styled.a`
  font-size: 1rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: row-reverse;
  flex: auto;

  color: darkblue;
  border-top: 0.1rem solid darkblue;
  border-bottom: 0.1rem solid darkblue;
`;

export const Container = styled.div`
  display: flex;
`;

export const Properties = styled.ul`
  padding: 0.2rem 0.5rem;
`;

export const PropertyItem = styled.li`
  color: black;
  font-weight: bold;
  list-style: none;

  div {
    background-color: ${(props) => props.pillColor};
    text-align: center;
    padding: 0.5rem;
    border-radius: 25px;    
    font-weight: normal;
    width: fit-content;
    margin: 0.1rem 0;
  }

  span {
    font-weight: normal;
  }
`;