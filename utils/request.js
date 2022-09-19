import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
  } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export const getData = async (query, variables) => {
  const result = await client.query({
    query: gql`
      ${query}
    `,
    variables: variables,
    context: {
      headers: {
        "x-api-key": process.env.NEXT_OCS_API_KEY,
        "x-country-code": "US",
        "x-language": "en",
      },
    },
  });
  return result;
};



