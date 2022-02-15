import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import PusherLink from './pusher-link';
import Pusher from 'pusher-js';

const pusherLink = new PusherLink({
  pusher: new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY ?? '', {
    cluster: 'us2',
    auth: {
      headers: {
        authorization: '',
      },
    },
  }),
})

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
const link = ApolloLink.from([pusherLink, errorLink, httpLink]);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
  link: link,
});

export default apolloClient;
