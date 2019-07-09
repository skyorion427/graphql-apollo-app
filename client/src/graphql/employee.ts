import React from 'react';
import { ChildProps, graphql } from 'react-apollo';

import {
  GET_EMPLOYEE_QUERY,
  CREATE_EMPLOYEE_MUTATION,
  UPDATE_EMPLOYEE_MUTATION,
  DELETE_EMPLOYEE_MUTATION,
} from './gql/employee';
import { Employee, CreateEmployeeInput, UpdateEmployeeInput } from './types';

export const withEmployeeData = graphql<{}, Employee>(GET_EMPLOYEE_QUERY);

export const createEmployeeData = graphql<
  CreateEmployeeInput,
  Employee,
  {},
  {}
>(CREATE_EMPLOYEE_MUTATION, {
  options: () => ({
    refetchQueries: [
      {
        query: GET_EMPLOYEE_QUERY,
        variables: {},
      },
    ],
  }),
  props: props => ({
    createEmployee(newEmployee: CreateEmployeeInput) {
      if (!props.mutate) {
        throw new Error('unreachable');
      }

      return props.mutate({
        variables: {
          employee: newEmployee,
        },
      });
    },
  }),
});

export const updateEmployeeData = graphql<
  UpdateEmployeeInput,
  Employee,
  {},
  {}
>(UPDATE_EMPLOYEE_MUTATION, {
  options: () => ({
    refetchQueries: [
      {
        query: GET_EMPLOYEE_QUERY,
        variables: {},
      },
    ],
  }),
  props: props => ({
    updateEmployee(_id: string, newEmployee: UpdateEmployeeInput) {
      if (!props.mutate) {
        throw new Error('unreachable');
      }

      return props.mutate({
        variables: {
          _id,
          employee: newEmployee,
        },
      });
    },
  }),
});

export const deleteEmployeeData = graphql<string, Employee, {}, {}>(
  DELETE_EMPLOYEE_MUTATION,
  {
    options: () => ({
      refetchQueries: [
        {
          query: GET_EMPLOYEE_QUERY,
          variables: {},
        },
      ],
    }),
    props: props => ({
      deleteEmployee(_id: string) {
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
