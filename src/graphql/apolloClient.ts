import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});
