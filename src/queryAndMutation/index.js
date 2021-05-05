const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { addUser, loginUser, forgotPassword, resetPassword } = require('./user/user.mutation');
const { addNotes, updateNotes, deleteNote } = require('./notes/notes.mutation');
const { notes } = require('./notes/notes.query');
const { users } = require('./user/user.query');

const query = new GraphQLObjectType({
  name: 'Query',
  fields: { users, notes },
});

const mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: { addUser, loginUser, forgotPassword, resetPassword, addNotes, updateNotes, deleteNote },
});

module.exports = new GraphQLSchema({
  query,
  mutation,
});
