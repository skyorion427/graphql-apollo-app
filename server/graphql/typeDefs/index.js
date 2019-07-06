const { mergeTypes } = require('merge-graphql-schemas');
const bank = require('./bank');
const employee = require('./employee');

const typeDefs = [bank, employee];

module.exports = mergeTypes(typeDefs, { all: true });
