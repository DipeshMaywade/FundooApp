const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { addUser, loginUser, forgotPassword, resetPassword } = require('./user/user.mutation');
const { addNotes, updateNotes, deleteNote } = require('./notes/notes.mutation');
const { createLabel, updateLabelName, deleteLabel, addLabelOnNotes, removeLabelOnNotes } = require('./labels/labels.mutation');
const { getNotes } = require('./notes/notes.query');
const { getLabels } = require('./labels/labels.query');
const { allUsers, loggedinUser } = require('./user/user.query');

const query = new GraphQLObjectType({
  name: 'Query',
  fields: { allUsers, loggedinUser, getNotes, getLabels },
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
    removeLabelOnNotes,
  },
});

module.exports = new GraphQLSchema({
  query,
  mutation,
});
