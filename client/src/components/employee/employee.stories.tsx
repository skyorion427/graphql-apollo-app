import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import CreateModal from './modals/createModal';
import { GRAPHQL_URI } from '../../config';

import '../../App.css';

const client = new ApolloClient({
  uri: GRAPHQL_URI,
});

storiesOf('Components/Employee', module).add('CreateModal', () => {
  return (
    <ApolloProvider client={client}>
      <CreateModal
        visible={true}
        banks={[]}
        onOk={() => () => action('save')}
        onCancel={() => action('cancel')}
      />
    </ApolloProvider>
  );
});
