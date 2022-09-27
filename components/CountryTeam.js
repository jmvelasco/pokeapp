import { Properties, PropertyItem } from "../styles/globalStyles";

export const CountryTeam = ({ team }) => {
  return (
    <>
      <h3>
        <PropertyItem>
          {team.name} <span>[{team.participantId}]</span>
        </PropertyItem>
      </h3>
      {team.athletes.map((player) => (
        <>
          <PropertyItem>
            {player.familyName} <span>[{player.participantId}]</span>
          </PropertyItem>
        </>
      ))}
    </>
  );
};
