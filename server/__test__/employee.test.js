const chai = require('chai');
const { ApolloServer, gql } = require('apollo-server-express');
const { createTestClient } = require('apollo-server-testing');
const typeDefs = require('../graphql/typeDefs');
const expect = chai.expect;

// Mocked Data
let mockedData = [
  {
    _id: '1',
    name: 'Mr. Robot',
    number: 9818123,
    accountHolder: 'Gregory House',
    accountType: 'Checking',
    accountNumber: 1231442,
    bank: {
      _id: 1,
      name: 'Bank A',
      branchName: 'Branch A',
    },
  },
  {
    _id: 2,
    name: 'Dr. Gregory House',
    number: 3451231,
    accountHolder: 'Elliot Alderson',
    accountType: 'Saving',
    accountNumber: 9001142,
    bank: {
      _id: 2,
      name: 'Bank B',
      branchName: 'Branch B',
    },
  },
];

const resolvers = {
  Query: {
    employees: () => {
      return mockedData;
    },
  },
  Mutation: {
    createEmployee: async (parent, { employee }, context, info) => {
      console.log('employee');
      const newEmployee = {
        _id: mockedData.length + 1,
        name: employee.name,
        number: employee.number,
        accountHolder: employee.accountHolder,
        accountType: employee.accountType,
        accountNumber: employee.accountNumber,
        bank: {
          _id: 3,
          name: employee.bank.name,
          branchName: employee.bank.branchName,
        },
      };
      mockedData.push(newEmployee);
      return newEmployee;
    },
  },
};
console.log(resolvers);
const server = new ApolloServer({ typeDefs, resolvers });
const { query, mutate } = createTestClient(server);

describe('Employee', () => {
  it('should list employees', () => {
    const res = query({
      query:
        '{ employees { _id name number accountHolder accountType accountNumber } }',
    });
    res.then(({ data }) => {
      expect(data).to.be.an('object');
      expect(data).to.have.property('employees');
    });
  });

  it('should create a new employee', async () => {
    const newEmployeeData = {
      name: 'Dr. Gregory House',
      number: '032145698701234',
      accountHolder: 'Elliot Alderson',
      accountType: 'Checking',
      accountNumber: '0041189',
      bank: {
        _id: 1,
        name: 'Bank A',
        branchName: 'Branch A',
      },
    };

    const CREATE_EMPLOYEE_MUTATION = gql`
      mutation {
        createEmployee(
          employee: {
            name: "Dr. Gregory House"
            number: "032145698701234"
            accountHolder: "Elliot Alderson"
            accountType: "Checking"
            accountNumber: "0041189"
            bank: { _id: 1, name: "Bank C", branchName: "Branch C" }
          }
        ) {
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
    const res = await mutate({
      mutation: CREATE_EMPLOYEE_MUTATION,
    });
    console.log('Hello Employee');
    //expect(mockedData).to.have.length(3);
  });
});
