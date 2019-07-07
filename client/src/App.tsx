import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import PublicRouter from './router';
import { GRAPHQL_URI } from './config';

import './App.css';

const client = new ApolloClient({
  uri: GRAPHQL_URI,
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <PublicRouter />
    </ApolloProvider>
  );
};

export default App;
