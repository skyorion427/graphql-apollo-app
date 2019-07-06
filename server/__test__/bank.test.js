const chai = require('chai');
const { ApolloServer, gql } = require('apollo-server-express');
const { createTestClient } = require('apollo-server-testing');
const typeDefs = require('../graphql/typeDefs');
const expect = chai.expect;

// Mocked Data
let mockedData = [
  { _id: 1, name: 'Bank A', branchName: 'Branch A' },
  { _id: 2, name: 'Bank B', branchName: 'Branch B' },
];

const resolvers = {
  Query: {
    banks: () => {
      return mockedData;
    },
  },
  Mutation: {
    createBank: (parent, { bank }, context, info) => {
      const newBank = {
        _id: mockedData.length + 1,
        name: bank.name,
        branchName: bank.branchName,
      };
      mockedData.push(newBank);
      return newBank;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const { query, mutate } = createTestClient(server);

describe('Bank', () => {
  it('should list banks', () => {
    const res = query({ query: '{ banks { name branchName } }' });
    res.then(({ data }) => {
      expect(data).to.be.an('object');
      expect(data).to.have.property('banks');
    });
  });

  it('should create a new bank', async () => {
    const newBankData = {
      name: 'Bank C',
      branchName: 'Branch C',
    };
    const CREATE_BANK_MUTATION = gql`
      mutation {
        createBank(bank: { name: "Bank C", branchName: "Branch C" }) {
          name
          branchName
        }
      }
    `;
    const res = await mutate({
      mutation: CREATE_BANK_MUTATION,
    });

    expect(mockedData).to.have.length(3);
    expect(mockedData).to.have.deep.include({
      _id: mockedData.length,
      ...newBankData,
    });
  });
});
