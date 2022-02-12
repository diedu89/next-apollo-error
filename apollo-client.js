import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://httpstat.us/500",
    cache: new InMemoryCache(),
});

export default client;