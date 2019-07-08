import React from 'react';
import { storiesOf } from '@storybook/react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Bank from './bank';
import { GRAPHQL_URI } from '../../config';

import '../../App.css';

const client = new ApolloClient({
  uri: GRAPHQL_URI,
});

storiesOf('Components/Bank', module).add('default', () => {
  return (
    <ApolloProvider client={client}>
      <Bank />
    </ApolloProvider>
  );
});
