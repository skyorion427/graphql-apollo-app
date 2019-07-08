import gql from 'graphql-tag';

export const GET_BANK_QUERY = gql`
query {
  banks {
    _id
    name
    branchName
  }
}
`;

export const CREATE_BANK_MUTATION = gql`
  mutation createBank($bank: CreateBankInput) {
    createBank(bank: $bank) {
      _id
      name
      branchName
    }
  }
`;

export const UPDATE_BANK_MUTATION = gql`
  mutation updateBank($_id: String!, $bank: UpdateBankInput) {
    updateBank(_id: $_id, bank: $bank) {
      _id
      name
      branchName
    }
  }
`;

export const DELETE_BANK_MUTATION = gql`
  mutation deleteBank($_id: String!) {
    deleteBank(_id: $_id) {
      _id
      name
      branchName
    }
  }
`;
