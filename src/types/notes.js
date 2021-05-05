const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');
const { userType } = require('./user');
const { userRegistration } = require('../models/user');

const notesType = new GraphQLObjectType({
  name: 'Notes',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLString },
    title: { type: GraphQLString },
    notes: { type: GraphQLString },
    userDetails: {
      type: userType,
      resolve: async (root) => {
        return await userRegistration.findById(root.userId);
      },
    },
  }),
});

module.exports = { notesType };
