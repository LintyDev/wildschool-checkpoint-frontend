import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000',
  cache: new InMemoryCache({
    addTypename: false
  }),
});