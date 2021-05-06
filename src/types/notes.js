const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

const notesType = new GraphQLObjectType({
  name: 'Notes',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLString },
    title: { type: GraphQLString },
    notes: { type: GraphQLString },
  }),
});

module.exports = { notesType };
