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

export const getSWDToken = async () => {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", process.env.SWD_API_CLIENT);
    params.append("client_secret", process.env.SWD_API_CLIENT_CREDENTIALS);

    const response = await fetch(
      process.env.SWD_AUTH_URL,
      {
        method: "post",
        body: params,
      }
    );

    const json = await response.json();
    return json.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};
