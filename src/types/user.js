const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const { notes } = require('../models/notes');
const { notesType } = require('./notes');
const { labels } = require('../models/labels');
const { labelType } = require('./labels');

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    notes: {
      type: GraphQLList(notesType),
      resolve: async (root) => {
        let note = await notes.find({ userId: root._id });
        return note;
      },
    },
    label: {
      type: GraphQLList(labelType),
      resolve: async (root) => {
        let label = await labels.find({ userId: root._id });
        return label;
      },
    },
  }),
});

const outputType = new GraphQLObjectType({
  name: 'Output',
  fields: () => ({
    success: { type: GraphQLString },
    message: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});

module.exports = { userType, outputType };
