"use client";

import { ReactNode } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import _ from "lodash";
import Notiflix from "notiflix";
import { LoadScript } from "@react-google-maps/api";
import ThemeProvider from "@/components/ui/ThemeProvider";

const API_URL = "http://localhost:4000/graphql";
  //  const API_URL = "https://dash.api.anousith-express.com/graphql";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("USER_KEY");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors }) => {
  const isExpired = _.some(graphQLErrors, {
    message: "Error: TokenExpiredError: jwt expired",
  });
  const isNotProvided = _.some(graphQLErrors, {
    message: "Error: JsonWebTokenError: jwt must be provided",
  });
  const isNoPermission = _.some(graphQLErrors, {
    message: "Error: DO_NOT_HAVE_PERMISSION",
  });

  let message = "";
  if (isExpired) message = "Session expired. Please log in again.";
  if (isNotProvided) message = "Invalid session. Please log in again.";
  if (isNoPermission) message = "You don't have permission to access this.";

  if (isExpired || isNotProvided) {
    Notiflix.Report.warning("Warning", message, "OK", () => {
      localStorage.removeItem("USER_KEY");
      window.location.replace("/login");
    });
  }
});

const client = new ApolloClient({
  link: from([
    errorLink,
    authLink.concat(
      createHttpLink({
        uri: API_URL,
      })
    ),
  ]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default function ClientBody({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <LoadScript googleMapsApiKey="AIzaSyBEYR4WPB2KnYBJxue4s9TuK4qlL3VYg9s">
        {children}
      </LoadScript>
    </ApolloProvider>
  );
}
