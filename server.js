const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/queryAndMutation/index');
const logger = require('./src/utility/logger');
//const { MongoDBAdapter } = require('./config/config2');
const { fundooConnection } = require('./config/config');
require('dotenv').config();

fundooConnection();

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

app.listen(port, async () => {
  // await MongoDBAdapter(process.env.DB_URL, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false,
  // });
  logger.log(`info`, `Server Runing at http://${host}:${port}`);
  console.log(`info`, `Server Runing at http://${host}:${port}`);
});
