const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { addUser, loginUser, forgotPassword, resetPassword } = require('./user.mutation');
const { addNotes, updateNotes, deleteNote } = require('./notes.mutation');
const { users } = require('./user.query');
const { notes } = require('./notes.query');

const query = new GraphQLObjectType({
  name: 'Query',
  fields: { users, notes },
});

const mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: { addUser, loginUser, forgotPassword, resetPassword, addNotes, updateNotes, deleteNote },
});

module.exports = new GraphQLSchema({
  query: query,
  mutation: mutation,
});
