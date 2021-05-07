const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require('graphql');
const { labels } = require('../models/labels');
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
        let label = await labels.find({ userId: root.userId });
        return label;
      },
    },
  }),
});

module.exports = { notesType };
