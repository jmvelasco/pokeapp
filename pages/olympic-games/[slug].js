import styled from "styled-components";
import { getData } from "../../utils/request";
import CloudinaryImage, { TRANSFORMATIONS } from "@ocs/cloudinary-image";
import { Container, Properties, PropertyItem } from "../../styles/globalStyles";
import { NavigateBack } from "../../components/NavigateBack";

const displayDate = (stringDate) => {
  const date = new Date(stringDate);
  return date.toLocaleDateString();
};

const OlympicGame = ({ gameDetails }) => {
  console.dir(gameDetails, { depth: 12 });
  return (
    <>
      <h1>{gameDetails.name}</h1>
      <NavigateBack backToUrl="/olympic-games" backToPage="Olympic Games" />
      <Container>
        <CloudinaryImage
          imageUrl={gameDetails.emblem.image.urlTemplate}
          sources={{
            xs: {
              standard: "t_1-1_380",
              x2: "t_1-1_300",
            },
          }}
          altText={gameDetails.emblem.image.alt}
          data-cy="background-image"
        />
        <Properties>
          <PropertyItem>
            Start of the games: :{" "}
            <span>{displayDate(gameDetails.startDate)}</span>
          </PropertyItem>

          <PropertyItem>
            End of the games: <span>{displayDate(gameDetails.endDate)}</span>
          </PropertyItem>
          <PropertyItem>
            Number of atheletes who participated:{" "}
            <span>{gameDetails.overview.numberOfAthletes}</span>
          </PropertyItem>
          <PropertyItem>
            Number of countries who participated:{" "}
            <span>{gameDetails.overview.numberOfCountries}</span>
          </PropertyItem>
          <PropertyItem>Sports:</PropertyItem>
          <DisciplinesWrapper>
            {gameDetails.disciplines.map((discipline) => (
              <PropertyItem key={discipline.title} pillColor="orange">
                <div>{discipline.title}</div>
              </PropertyItem>
            ))}
          </DisciplinesWrapper>
          <PropertyItem>Clasification:</PropertyItem>
          <AwardsWrapper>
            {gameDetails.countryAwards.map((awards, idx) => (
              <>
                <Awards key={awards.country.name}>
                  <p>
                    <span>{idx + 1}</span>{awards.country.name}
                  </p>

                  <MedalsWrapper>
                    {awards.medals.map((medal) => (
                      <Medal
                        key={`${medal.medalType}-${medal.count}`}
                        medalColor={
                          medal.medalType === "BRONZE"
                            ? "#CD7F32"
                            : medal.medalType.toLowerCase()
                        }
                      >
                        {medal.medalType}: {medal.count}
                      </Medal>
                    ))}
                  </MedalsWrapper>
                </Awards>
              </>
            ))}
          </AwardsWrapper>
        </Properties>
      </Container>
    </>
  );
};

const DisciplinesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.1rem;
`;

const AwardsWrapper = styled.div`
  display: flex;  
  gap: 1rem;
  flex-direction: row;
  flex-wrap: wrap;

`;

const Awards = styled.div`
  border: 0.1rem solid lightgray;
  padding: 1rem;
  width: 30rem;

  > p {
    font-weight: bold;

    > span {
      padding: 0.4rem;
      border: 1px solid blue;
      border-radius: 2.5rem;
      width: 3.5rem;
      display: inline-block;
      text-align: center;
      margin: 0 0.4rem 0;
    }
  }
`;

const MedalsWrapper = styled.div`
  width: 100%;
  padding-left: 2rem;
  margin: 0 0.2rem;
`;

const Medal = styled.div`
  background-color: ${(props) => props.medalColor};
`;

// const Container = styled.div`
//   display: flex;
// `;

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
      emblem {
        image {
          title
          meta {
            slug
            url
            canonicalUrl
            theme
          }
          urlTemplate
          format
          alt
          description
          credits
          displayPreferences {
            position
            imageRatio
            hideCaption
            wideMode
          }
        }
      }       
      disciplines {
        title
      }
      countryAwards {
        medals {
          medalType
          count
        }
        country {
          name
        }
      }
    }
  }`;

  const params = { slug: queryParam };
  const result = await getData(queryGame, params);
  const gameDetails = result.data.olympicGame;

  return {
    props: {
      gameDetails,
    },
  };
};

export default OlympicGame;
