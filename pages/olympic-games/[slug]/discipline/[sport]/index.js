import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";
import { getData } from "../../../../../utils/request";
import { Properties, PropertyItem } from "../../../../../styles/globalStyles";
import { getDatesFromDateRange } from "../../../../../utils/dates";
import {SportResults} from "../../../../../components/SportResults";

const Discipline = ({ sportDetails, dateRange }) => {
  const [selectedEvent, setSelectedEvent] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  // console.log({ sportDetails });
  // console.log({ dateRange });
  return (
    <>
      <h1>{sportDetails.title}</h1>
      <SelectDateWrapper>
        {dateRange.map((date) => (
          <span key={date} className={selectedDate === date ? 'selected' : ''} onClick={ () => setSelectedDate(date)}>{new Date(date).toDateString()}</span>
        ))}
      </SelectDateWrapper>
      {/* <SportWrapper>
        <Properties>
          {sportDetails.events.map((event) => {
            return (
              <>
                <PropertyItem
                  key={event.title}
                  pillColor="orange"
                  onClick={() => setSelectedEvent(event.title)}
                >
                  <div>
                    <Link href="#">{event.title}</Link>
                  </div>
                </PropertyItem>
              </>
            );
          })}
        </Properties>
        <div>
          {sportDetails.events.map((event) => {
            if (event.title === selectedEvent) {
              return (
                <>
                  <h3>{event.title.toUpperCase()}: </h3>

                  {event.results.standing.map((result, idx) => {
                    const keyValue = `key-${idx}`;
                    return (
                      <p key={keyValue}>
                        {result.rank?.position} -{" "}
                        {result.participant?.displayName ||
                          result.noc?.longName}
                        {result.medalType ? `: ${result.medalType}` : ""}
                      </p>
                    );
                  })}
                </>
              );
            }
          })}
        </div>
      </SportWrapper> */}
      <SportResults date={selectedDate} />
    </>
  );
};

const SportWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

const SelectDateWrapper = styled.div`
  display: flex;
  gap: 2rem;
  > span {
    border: 1px solid grey;
    text-align: center;
    cursor: pointer;
  }
  
  .selected {
    background-color: blue;
    color: white;
  }
`;

export const getServerSideProps = async (ctx) => {
  const queryParam = ctx.params;
  // console.log({ queryParam });

  const queryGameDiscipline = `
    query GameDiscipline($gameSlug: String!, $disciplineSlug: String!) {
      gameDiscipline(gameSlug: $gameSlug, disciplineSlug: $disciplineSlug) {
        slug
        title
        events {
          title
          gender
          results {
            standing {
              participant {
                ... on Athlete {
                  displayName
                  thumbnail {
                    title
                    alt
                    urlTemplate
                  }
                }
              }
              rank {
                position
              }
              medalType
              noc {
                code
                isoTwoLetterCode
                longName
              }
            }
          }
        }
      }
    }
  `;

  const gameDisciplineParams = {
    gameSlug: queryParam.slug,
    disciplineSlug: queryParam.sport,
  };
  const gameDisciplineResponse = await getData(
    queryGameDiscipline,
    gameDisciplineParams
  );
  const sportDetails = gameDisciplineResponse.data.gameDiscipline;

  const queryOlympicGame = `
  query OlympicGame($slug: String!) {
    olympicGame(slug: $slug) {
      sdwId
      name
      year
      startDate
      endDate
    }
  }`;

  const olympicGameParams = { slug: queryParam.slug };
  const olympicGameResponse = await getData(
    queryOlympicGame,
    olympicGameParams
  );
  const gameDetails = olympicGameResponse.data.olympicGame;

  const from = new Date(gameDetails.startDate);
  const to = new Date(gameDetails.endDate);
  const range = getDatesFromDateRange(from, to);

  return {
    props: {
      sportDetails,
      dateRange: range,
    },
  };
};

export default Discipline;
