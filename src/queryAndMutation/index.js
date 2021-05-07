const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { addUser, loginUser, forgotPassword, resetPassword } = require('./user/user.mutation');
const { addNotes, updateNotes, deleteNote } = require('./notes/notes.mutation');
const { createLabel, updateLabelName, deleteLabel, addLabelOnNotes } = require('./labels/labels.mutation');
const { allNotes } = require('./notes/notes.query');
const { allUsers, loggedinUser } = require('./user/user.query');

const query = new GraphQLObjectType({
  name: 'Query',
  fields: { allUsers, loggedinUser, allNotes },
});

const mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    addUser,
    loginUser,
    forgotPassword,
    resetPassword,
    addNotes,
    updateNotes,
    deleteNote,
    createLabel,
    updateLabelName,
    deleteLabel,
    addLabelOnNotes,
  },
});

module.exports = new GraphQLSchema({
  query,
  mutation,
});
