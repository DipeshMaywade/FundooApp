const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/queryAndMutation/index');
const logger = require('./src/utility/logger');
require('./config/config');
require('./config/redisConfig');
require('dotenv').config();
const app = express();
const { graphqlUploadExpress } = require('graphql-upload');

const port = process.env.PORT;
const host = process.env.HOST;

app.use(
  '/graphql',
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  logger.log(`info`, `Server Runing at http://${host}:${port}`);
  console.log(`info`, `Server Runing at http://${host}:${port}`);
});
