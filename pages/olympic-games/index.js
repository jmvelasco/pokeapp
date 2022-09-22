import React from "react";

import { getData } from "../../utils/request";
import { Title } from "../../styles/globalStyles";

import { List } from "../../components/List";

const Olympicgames = (props) => {
  return (
    <>
      <Title>Olympic Games</Title>
      <List items={props.allOlympicGames} />
    </>
  );
};

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
