import { getSWDToken } from "../../../../../../utils/request";
import { CountryTeam } from "../../../../../../components/CountryTeam";

const Match = ({ matchDetails }) => {
  return (
    <>
      <h1>Match Details</h1>
      {matchDetails?.teams.map((team) => (
        <CountryTeam key={team} team={team}/>
      ))}

      {/* {matchDetails?.teams.map((team) => {
        return team.athletes?.map((player) => (
          <p key={player.familyName}>
            [{player.participantId}] {player.familyName}
          </p>
        ));
      })} */}
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const queryParam = ctx.params;
  console.log({ queryParam });
  console.log(`${process.env.SWD_API_URL}/units/${queryParam.match}`);
  const token = await getSWDToken();

  const matchDetailsResponse = await (
    await fetch(`${process.env.SWD_API_URL}/units/${queryParam.match}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();

  const matchDetails = {
    frames:
      matchDetailsResponse?.body?.competition?.disciplines[0]?.events[0]
        ?.stages[0]?.phases[0]?.units[0]?.frames[0],
    teams:
      matchDetailsResponse?.body?.competition?.disciplines[0]?.events[0]
        ?.stages[0]?.phases[0]?.units[0]?.teams,
  };
  console.dir({ matchDetails }, { depth: 12 });

  return {
    props: {
      matchDetails,
    },
  };
};

export default Match;
