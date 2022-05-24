import { InMemoryCache, ApolloLink, HttpLink } from "@apollo/client";

const uri: string = `${process.env.REACT_APP_API_URL}`;
const httpLink = new HttpLink({ uri });

const omitTypename = (key: any, value: any) => {
  return key === "__typename" ? undefined : value;
};

const omitTypenameLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    );
  }
  return forward(operation);
});

export const link = ApolloLink.from([omitTypenameLink, httpLink]);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        nodes: {
          merge(existing, incoming) {
            return { ...existing, ...incoming };
          },
        },
      },
    },
  },
});
