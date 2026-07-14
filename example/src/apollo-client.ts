import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://spacex-production.up.railway.app/graphql",
  }),
});
