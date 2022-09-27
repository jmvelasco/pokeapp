import { useRouter } from "next/router";
import styled from "styled-components";
import { getSportResults } from "../utils/results";
import { useEffect, useState } from "react";
import { Properties, PropertyItem } from "../styles/globalStyles";
import Link from "next/link";

export const SportResults = ({ date }) => {
  const competitionSlug = useRouter().query.slug;
  const sportSlug = useRouter().query.sport;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log({ data });

  useEffect(() => {
    async function fetchData() {
      console.log("getting...");
      setLoading(true);
      const results = await getSportResults(competitionSlug, sportSlug, date);
      // return results;
      // console.log({ results });
      setData(results);
      console.log("got them!");
      setLoading(false);
    }
    fetchData();
  }, [competitionSlug, date, sportSlug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }
  console.log({ data });

  return (
    <>
      <div>Results of {new Date(date).toDateString()}</div>
      <Properties>
        {data &&
          data[0].sportEvents.map((event) => (
            <div key={event.sdwId}>
              <PropertyItem>
                Event:{" "}
                <span>
                  {event.title} [{event.sdwId}]
                </span>
              </PropertyItem>
              {event.sportStages.map((stage) => (
                <>
                  <PropertyItem>
                    Stage:{" "}
                    <span>
                      {stage.title} [{stage.sdwId}]
                    </span>
                  </PropertyItem>

                  {stage.sportPhases.map((phase) => (
                    <>
                      <PropertyItem>
                        Phase:{" "}
                        <span>
                          {phase.title} [{phase.sdwId}]
                        </span>
                      </PropertyItem>

                      <Properties>
                        {phase.sportUnits.map((unit) => (
                          <Link key={unit.sdwId} href={`/olympic-games/${competitionSlug}/discipline/${sportSlug}/match/${unit.sdwId}`}>
                            <UnitWrapper>
                              <PropertyItem>
                                UnitId: <span>{unit.sdwId}</span>
                              </PropertyItem>
                              <PropertyItem>
                                Unit Type: <span>{unit.type}</span>
                              </PropertyItem>
                              <PropertyItem>
                                Unit Title: <span>{unit.title}</span>
                              </PropertyItem>
                              <PropertyItem>
                                Unit Status: <span>{unit.status}</span>
                              </PropertyItem>
                              <Properties>
                                {unit.participants.map((participant) => (
                                  <>
                                    <PropertyItem>
                                      [{participant.country.code}]{" "}
                                      {participant.country.longName}
                                      <Score>
                                        {participant.scores[0].value}
                                      </Score>
                                    </PropertyItem>
                                  </>
                                ))}
                              </Properties>
                            </UnitWrapper>
                          </Link>
                        ))}
                      </Properties>
                    </>
                  ))}
                </>
              ))}
            </div>
          ))}
      </Properties>
    </>
  );
};

const UnitWrapper = styled.div`
  margin: 1rem;
  background-color: lightgreen;
  cursor: pointer
`;

const Score = styled.div`
  background-color: white;
  border-radius: 2.5rem;
  display: inline-block;
  text-align: center;
  margin-left: 1rem !important;
`;
