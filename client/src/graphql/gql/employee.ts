import gql from 'graphql-tag';

export const GET_EMPLOYEE_QUERY = gql`
  query {
    employees {
      _id
      name
      number
      accountHolder
      accountType
      accountNumber
      bank {
        _id
        name
        branchName
      }
    }
  }
`;

export const CREATE_EMPLOYEE_MUTATION = gql`
  mutation createEmployee($employee: CreateEmployeeInput) {
    createEmployee(employee: $employee) {
      _id
      name
      number
      accountNumber
      accountHolder
      accountType
      bank {
        _id
        name
        branchName
      }
    }
  }
`;

export const UPDATE_EMPLOYEE_MUTATION = gql`
  mutation updateEmployee($_id: String!, $employee: UpdateEmployeeInput) {
    updateEmployee(_id: $_id, employee: $employee) {
      _id
      name
      number
      accountNumber
      accountHolder
      accountType
      bank {
        _id
        name
        branchName
      }
    }
  }
`;

export const DELETE_EMPLOYEE_MUTATION = gql`
  mutation deleteEmployee($_id: String!) {
    deleteEmployee(_id: $_id) {
      _id
      name
      number
      accountNumber
      accountHolder
      accountType
      bank {
        _id
        name
        branchName
      }
    }
  }
`;
