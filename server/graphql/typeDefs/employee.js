const { gql } = require('apollo-server-express');

const Employee = gql`
  type Employee {
    _id: ID!
    name: String!
    number: Int!
    accountHolder: String!
    accountType: String
    accountNumber: Int!
    bank: Bank
  }

  type Query {
    employees(
      filters: [EmployeesInput]
      limit: Int
      offset: Int
      order: Order
      sort: String
    ): [Employee!]!
  }

  type Mutation {
    createEmployee(employee: CreateEmployeeInput): Employee!
    updateEmployee(_id: String!, employee: UpdateEmployeeInput): Employee!
    deleteEmployee(_id: String!): Employee!
  }

  input CreateEmployeeInput {
    name: String!
    number: Int!
    accountHolder: String!
    accountType: String
    accountNumber: Int!
    bank: ID!
  }

  input UpdateEmployeeInput {
    name: String
    number: Int
    accountHolder: String
    accountType: String
    accountNumber: Int
    bank: ID
  }

  input EmployeesInput {
    field: String
    value: String
    operator: Operator
  }

  enum Operator {
    gte
    lte
    eq
    like
  }

  enum Order {
    asc
    desc
  }
`;

module.exports = Employee;
