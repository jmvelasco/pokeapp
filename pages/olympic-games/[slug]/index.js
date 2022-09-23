import CloudinaryImage from "@ocs/cloudinary-image";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { NavigateBack } from "../../../components/NavigateBack";
import {
  Container,
  FilterWrapper,
  Properties,
  PropertyItem,
} from "../../../styles/globalStyles";
import { getData } from "../../../utils/request";

const displayDate = (stringDate) => {
  const date = new Date(stringDate);
  return date.toLocaleDateString();
};

const OlympicGame = ({ gameDetails, countriesList, gameSlug }) => {
  const [searchCountryItem, setSearchCountryItem] = useState("");

  const handleFilter = (event) => {
    setSearchCountryItem(event.target.value.toLowerCase());
  };
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
              <PropertyItem
                key={discipline.title}
                pillColor="orange"
                onClick={() => console.log(discipline.slug)}
              >
                <div>
                  {discipline.title}
                  <Link href={`/olympic-games/${gameSlug}/discipline/${discipline.slug}`}>
                    <a>{discipline.title}</a>
                  </Link>
                </div>
              </PropertyItem>
            ))}
          </DisciplinesWrapper>
          <PropertyItem>Clasification:</PropertyItem>
          <FilterWrapper>
            <input
              placeholder="Search country..."
              type="text"
              onChange={() => handleFilter(event)}
            />
          </FilterWrapper>
          <AwardsWrapper>
            {countriesList
              .filter(
                (country) =>
                  country.name.toLowerCase().indexOf(searchCountryItem) === 0
              )
              .map((awards, idx) => (
                <>
                  <Awards key={awards.name}>
                    <p>
                      <span>{awards.position}</span>
                      {awards.name}
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
  gap: 0.1rem;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Awards = styled.div`
  border: 0.1rem solid lightgray;
  padding: 1rem;
  width: 30rem;
  margin: 0.2rem 0;

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
        slug
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

  console.log({ gameDetails });

  const countriesList = [];
  gameDetails.countryAwards.forEach((award, idx) => {
    countriesList.push({
      ...gameDetails.countryAwards[idx].country,
      medals: award.medals,
      position: idx + 1,
    });
  });

  return {
    props: {
      gameDetails,
      countriesList,
      gameSlug: queryParam
    },
  };
};

export default OlympicGame;
