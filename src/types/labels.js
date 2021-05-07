const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

const labelType = new GraphQLObjectType({
  name: 'Labels',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLString },
    label: { type: GraphQLString },
  }),
});

module.exports = { labelType };
