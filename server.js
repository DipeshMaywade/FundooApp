const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/queryAndMutation/user');
const logger = require('./src/utility/logger');
const { fundooConnection } = require('./config/config');
require('dotenv').config();

fundooConnection();

const port = process.env.PORT;
const host = process.env.HOST;

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  logger.log(`info`, `Server Runing at http://${host}:${port}`);
  console.log(`info`, `Server Runing at http://${host}:${port}`);
});
