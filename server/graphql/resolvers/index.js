const { mergeResolvers } = require('merge-graphql-schemas');
const bank = require('./bank');
const employee = require('./employee');

const resolvers = [bank, employee];

module.exports = mergeResolvers(resolvers);
