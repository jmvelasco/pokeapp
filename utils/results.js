import { formatDate } from "../utils/dates";
import { getData } from "../utils/request";

export const getSportResults = async (competitionSlug, sportSlug, date) => {

  if (!date) return;

  const formatedDate = formatDate(new Date(date), "-");

  const queryGetResults = `
    query Competition($competitionSlug: String!, $date: String!) {
        sportCompetition(competitionSlug: $competitionSlug) {
        sdwId
        title
        categories
        startDate
        location
        endDate
        sportDisciplines {
            sdwId
            slug
            sportDisciplineId
            title
            sportEvents {
            sdwId
            title
            competitorType
            gender
            type
            sportStages(date: $date) {
                sdwId
                title
                type
                order
                sportPhases {
                title
                type
                order
                sdwId
                sportUnits {
                    status
                    type
                    startDate
                    endDate
                    sdwId
                    title
                    participants {
                    rank
                    individuals {
                        displayName
                        participantId
                    }
                    scores {
                        type
                        value
                        winnerLoseTie
                    }
                    country {
                        code
                        longName
                        isoTwoLetterCode
                        name
                    }
                    }
                }
                }
            }
            }
        }
        }
    }
  `;

  const getResultsParams = {
    competitionSlug: competitionSlug,
    date: formatedDate,
  };

//   console.log({ getResultsParams });
  const getResultsResponse = await getData(queryGetResults, getResultsParams);
//   console.log({ getResultsResponse });
//   console.log({ sport: getResultsResponse.data.sportCompetition.sportDisciplines });
  const sportResults = getResultsResponse.data.sportCompetition.sportDisciplines.filter(sport => sport.slug === sportSlug);
//   console.log({ sportResults });
  return sportResults;
  
};
