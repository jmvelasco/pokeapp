import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import styled from 'styled-components';

import { List } from "../components/List";

const Olympicgames = (props) => {
  return (
    <>
      <Title>Olympic Games</Title>
      <List items={props.allOlympicGames} />
    </>
  );
};

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  text-align: center;
`;

export const getStaticProps = async () => {
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
  });

  const result = await client
  .query({
    query: gql`
    query AllOlympicGames($type: OlympicGameTypeFilter!) {
      allOlympicGames(type: $type) {
        startDate
        endDate
        name
        mascot {
          image {
            urlTemplate
            format
            title
            alt
          }
        }
      }
    }
    `,
    variables: { type: "NO_YOG" },
    context: {
      headers: {
        "x-api-key": process.env.NEXT_OCS_API_KEY,
        "x-country-code": "US",
        "x-language": "en",
      },
    },
  });
  
  const data = result.data.allOlympicGames;
  const games = [];
  data.forEach(element => {
    games.push({name: element.name})
  });

  return {
    props: {
      allOlympicGames: games
    },
  };
};

export default Olympicgames;
