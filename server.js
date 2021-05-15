const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/queryAndMutation/index');
const logger = require('./src/utility/logger');
require('./config/config');
require('dotenv').config();
const app = express();

const port = process.env.PORT;
const host = process.env.HOST;

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  logger.log(`info`, `Server Runing at http://${host}:${port}`);
  console.log(`info`, `Server Runing at http://${host}:${port}`);
});
