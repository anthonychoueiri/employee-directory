import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, ApolloProvider } from "@apollo/client";

import App from "./App";
import { link, cache } from "./utils/apolloClientOptions";

const client = new ApolloClient({ link, cache });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
