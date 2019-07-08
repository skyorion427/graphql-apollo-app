import React from 'react';
import { ChildProps, graphql } from 'react-apollo';

import {
  GET_BANK_QUERY,
  CREATE_BANK_MUTATION,
  UPDATE_BANK_MUTATION,
  DELETE_BANK_MUTATION,
} from './gql/bank';
import { Bank, CreateBankInput, UpdateBankInput } from './types';

export const withBankData = graphql<{}, Bank>(GET_BANK_QUERY);

export const createBankData = graphql<CreateBankInput, Bank, {}, {}>(
  CREATE_BANK_MUTATION,
  {
    options: () => ({
      refetchQueries: [
        {
          query: GET_BANK_QUERY,
          variables: {},
        },
      ],
    }),
    props: props => ({
      createBank(newBank: CreateBankInput) {
        if (!props.mutate) {
          throw new Error('unreachable');
        }

        return props.mutate({
          variables: {
            bank: newBank,
          },
        });
      },
    }),
  },
);

export const updateBankData = graphql<UpdateBankInput, Bank, {}, {}>(
  UPDATE_BANK_MUTATION,
  {
    options: () => ({
      refetchQueries: [
        {
          query: GET_BANK_QUERY,
          variables: {},
        },
      ],
    }),
    props: props => ({
      updateBank(_id: string, newBank: UpdateBankInput) {
        if (!props.mutate) {
          throw new Error('unreachable');
        }

        return props.mutate({
          variables: {
            _id,
            bank: newBank,
          },
        });
      },
    }),
  },
);

export const deleteBankData = graphql<string, Bank, {}, {}>(
  DELETE_BANK_MUTATION,
  {
    options: () => ({
      refetchQueries: [
        {
          query: GET_BANK_QUERY,
          variables: {},
        },
      ],
    }),
    props: props => ({
      deleteBank(_id: string) {
        if (!props.mutate) {
          throw new Error('unreachable');
        }

        return props.mutate({
          variables: {
            _id,
          },
        });
      },
    }),
  },
);
