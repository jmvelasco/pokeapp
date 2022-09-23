import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";
import { getData } from "../../../../../utils/request";
import {
  Container,
  FilterWrapper,
  Properties,
  PropertyItem,
} from "../../../../../styles/globalStyles";

const Discipline = ({ sportDetails }) => {
  const [selectedEvent, setSelectedEvent] = useState();
  console.log(selectedEvent);
  return (
    <>
      <h1>{sportDetails.title}</h1>
      <SportWrapper>
        <Properties>
          {sportDetails.events.map((event) => {
            return (
              <PropertyItem
                key={event.title}
                pillColor="orange"
                onClick={() => setSelectedEvent(event.title)}
              >
                <div><Link href="#">{event.title}</Link></div>
              </PropertyItem>
            );
          })}
        </Properties>
        <div>
          {sportDetails.events.map((event) => {
            if (event.title === selectedEvent) {
              return (
                <>
                  <h3>
                    {event.title.toUpperCase()}:{" "}
                    <small>
                      From {event.details.startDate} to {event.details.endDate}
                    </small>
                  </h3>

                  {event.results.standing.map((result, idx) => {
                    const keyValue = `key-${idx}`;
                    return (
                      <p key={keyValue}>
                        {result.rank?.position} -{" "}
                        {result.participant?.displayName || result.noc?.longName}
                        {result.medalType ? `: ${result.medalType}` : ""}
                      </p>
                    );
                  })}
                </>
              );
            }
          })}
        </div>
      </SportWrapper>
    </>
  );
};

const SportWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

export const getServerSideProps = async (ctx) => {
  const queryParam = ctx.params;
  console.log({ queryParam });

  const queryGame = `
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
          details {
            startDate
            endDate
          }
        }
      }
    }
  `;

  const params = {
    gameSlug: queryParam.slug,
    disciplineSlug: queryParam.sport,
  };
  const result = await getData(queryGame, params);
  const sportDetails = result.data.gameDiscipline;

  console.dir({ sportDetails }, { depth: 12 });

  return {
    props: {
      sportDetails,
    },
  };
};

export default Discipline;
