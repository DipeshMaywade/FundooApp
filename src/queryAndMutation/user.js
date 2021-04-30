const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { addUser, loginUser, forgotPass, resetPass } = require("./mutation");
const { users } = require("./query")

const Query = new GraphQLObjectType({
  name: "GetData",
  fields: { users },
});

const Mutation = new GraphQLObjectType({
  name: "Registration",
  fields: { addUser, loginUser, forgotPass, resetPass },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
