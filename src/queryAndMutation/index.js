/**
 * @module        queryAndMutation
 * @file          index.js
 * @description   this is the main index file which contain all the query and mutaions related to fundooApp
 *                and create and grapghQL schema which is used bt graphQLHTTP middleware.
 * @requires      graphql{@linkhttps://www.npmjs.com/package/graphql}
 * @author        Dipesh Maywade <dipeshmaywade@gmail.com>
----------------------------------------------------------------------------------------------------*/

const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { addUser, loginUser, forgotPassword, resetPassword, uploadAvatarImage } = require('./user/user.mutation');
const { addNotes, updateNotes, moveToTrash, deleteNote } = require('./notes/notes.mutation');
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
    uploadAvatarImage,
    addNotes,
    updateNotes,
    moveToTrash,
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
