const express = require('express');
const app = express();
require("dotenv").config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./app/queryAndMutation/registration');

const port = process.env.PORT;
const host = process.env.HOST;

require('./config/config')()

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
  }));

app.listen(port, ()=> {
    console.log(`Server Runing at http://${host}:${port}`);
})