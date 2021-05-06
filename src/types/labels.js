const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

const labelType = new GraphQLObjectType({
  name: 'Labels',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLString },
    label: { type: GraphQLString },
    // label: {
    //     type: GraphQLList(notesType),
    //     resolve: async (root) => {
    //       let note = await notes.find({ userId: root._id });
    //       return note;
    //     },
  }),
});

module.exports = { labelType };
