import styled from "styled-components";
import { getData } from "../../utils/request";
import CloudinaryImage, { TRANSFORMATIONS } from "@ocs/cloudinary-image";
import { Container, Properties, PropertyItem } from "../../styles/globalStyles";
import { NavigateBack } from "../../components/NavigateBack";

const displayDate = (stringDate) => {
  const date = new Date(stringDate);
  return date.toLocaleDateString();
};

const OlympicGame = (props) => {
  return (
    <>
      <h1>{props.gameDetails.name}</h1>
      <NavigateBack backToUrl="/olympic-games" backToPage="Olympic Games" />
      <Container>
        <CloudinaryImage
          imageUrl={props.gameDetails.emblem.image.urlTemplate}
          sources={{
            xs: {
              standard: "t_1-1_380",
              x2: "t_1-1_300",
            },
          }}
          altText={props.gameDetails.emblem.image.alt}
          data-cy="background-image"
        />
        <Properties>
          <PropertyItem>
            Start of the games: :{" "}
            <span>{displayDate(props.gameDetails.startDate)}</span>
          </PropertyItem>

          <PropertyItem>
            End of the games:{" "}
            <span>{displayDate(props.gameDetails.endDate)}</span>
          </PropertyItem>
          <PropertyItem>
            Number of atheletes who participated:{" "}
            <span>{props.gameDetails.overview.numberOfAthletes}</span>
          </PropertyItem>
          <PropertyItem>
            Number of countries who participated:{" "}
            <span>{props.gameDetails.overview.numberOfCountries}</span>
          </PropertyItem>
          <PropertyItem>Sports:</PropertyItem>
          <DisciplinesWrapper>
            {props.gameDetails.disciplines.map((discipline) => (
              <PropertyItem key={discipline.title} pillColor="orange">
                <div>{discipline.title}</div>
              </PropertyItem>
            ))}
          </DisciplinesWrapper>
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
