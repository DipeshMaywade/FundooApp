const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require('graphql');
const { labels } = require('../models/labels');
const { labelType } = require('./labels');

const notesType = new GraphQLObjectType({
  name: 'Notes',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    labelId: { type: GraphQLList(GraphQLString) },
  }),
});

module.exports = { notesType };
