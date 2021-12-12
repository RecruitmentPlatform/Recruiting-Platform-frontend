import App from './App';
import React from 'react'
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#000"
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
