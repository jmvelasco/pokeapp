import React from "react";

import { getData } from "../../utils/request";
import styled from "styled-components";

import { List } from "../../components/List";

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
  const queryAllGames = `
    query AllOlympicGames($type: OlympicGameTypeFilter!) {
      allOlympicGames(type: $type) {
          startDate
          endDate
          name
          meta {
              slug
          }
      }
    }`;

  const params = { type: "NO_YOG" };
  const result = await getData(queryAllGames, params);
  const data = result.data.allOlympicGames;
  const games = [];
  data.forEach((element) => {
    games.push({
      name: element.name,
      link: `/olympic-games/${element.meta.slug}`,
    });
  });

  return {
    props: {
      allOlympicGames: games,
    },
  };
};

export default Olympicgames;
