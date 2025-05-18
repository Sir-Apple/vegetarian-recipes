import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri = process.env.NEXT_PUBLIC_HYGRAPH_API_URL;
const token = process.env.NEXT_PUBLIC_HYGRAPH_API_TOKEN;

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default client;
