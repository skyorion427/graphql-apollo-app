const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const config = require('./config');
dotenv.config();

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true });

mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open to ' + config.database);
});

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.applyMiddleware({ app });
app.set('port', config.PORT);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});