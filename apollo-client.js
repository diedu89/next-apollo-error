import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from "@apollo/client";

import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL Error] - Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }

  if (networkError) {
    console.error(`[GraphQL Network Error] - ${networkError}`);
  }
});
const httpLink = new HttpLink({
  uri:"https://httpstat.us/500",
});
const link = ApolloLink.from([errorLink, httpLink]);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
  link: link,
});

export default apolloClient;
