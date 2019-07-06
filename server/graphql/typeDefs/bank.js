const { gql } = require('apollo-server-express');

const Bank = gql`
  type Bank {
    _id: ID!
    name: String!
    branchName: String!
  }

  type Query {
    banks: [Bank!]!
  }

  type Mutation {
    createBank(bank: CreateBankInput): Bank!
    updateBank(_id: String!, bank: UpdateBankInput): Bank!
    deleteBank(_id: String!): Bank!
  }

  input CreateBankInput {
    name: String!
    branchName: String!
  }

  input UpdateBankInput {
    name: String
    branchName: String
  }
`;

module.exports = Bank;
