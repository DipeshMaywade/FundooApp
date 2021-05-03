const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { addUser, loginUser, forgotPassword, resetPassword } = require('./user.mutation');
const { users } = require('./user.query');

const Query = new GraphQLObjectType({
  name: 'GetData',
  fields: { users },
});

const Mutation = new GraphQLObjectType({
  name: 'Registration',
  fields: { addUser, loginUser, forgotPassword, resetPassword },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
