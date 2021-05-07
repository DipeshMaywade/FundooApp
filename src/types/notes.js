const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require('graphql');
const { notes } = require('../models/notes');
const { labelType } = require('./labels');

const notesType = new GraphQLObjectType({
  name: 'Notes',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLString },
    title: { type: GraphQLString },
    notes: { type: GraphQLString },
    label: {
      type: GraphQLList(labelType),
      resolve: async (root) => {
        let label = await notes.find({ userId: root._id });
        return label;
      },
    },
  }),
});

module.exports = { notesType };
