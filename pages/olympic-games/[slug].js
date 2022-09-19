import styled from "styled-components";
import { getData } from "../../utils/request";

const displayDate = (stringDate) => {
  const date = new Date(stringDate);
  return date.toLocaleDateString();
};

const OlympicGame = (props) => {
  console.log({ props });
  return (
    <>
      <h1>{props.gameDetails.name}</h1>
      <ul>
        <li>Start of the games: {displayDate(props.gameDetails.startDate)}</li>
        <li>End of the games: {displayDate(props.gameDetails.endDate)}</li>
        <li>
          Number of atheletes who participated:{" "}
          {props.gameDetails.overview.numberOfAthletes}
        </li>
        <li>
          Number of countries who participated:{" "}
          {props.gameDetails.overview.numberOfCountries}
        </li>
        <li>Sports:</li>
        <ul>
          {props.gameDetails.disciplines.map((discipline) => (
            <li key={discipline.title}>{discipline.title}</li>
          ))}
        </ul>
      </ul>
    </>
  );
};

const Container = styled.div`
  display: flex;
`;

export const getServerSideProps = async (ctx) => {
  const queryParam = ctx.params.slug;
  const queryGame = `
  query OlympicGame($slug: String!) {
    olympicGame(slug: $slug) {
      sdwId
      name
      year
      startDate
      endDate
      overview {
        numberOfAthletes
        numberOfCountries
        numberOfEvents
      }
      disciplines {
        title
      }
    }
  }`;

  const params = { slug: queryParam };
  const result = await getData(queryGame, params);
  console.log(result.data.olympicGame);
  const gameDetails = result.data.olympicGame;

  return {
    props: {
      gameDetails,
    },
  };
};

export default OlympicGame;
