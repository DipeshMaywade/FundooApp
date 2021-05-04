const { GraphQLObjectType, GraphQLString } = require('graphql');
const { userType } = require('./user');
const { userRegistration } = require('../models/user');

const notesType = new GraphQLObjectType({
  name: 'Notes',
  fields: () => ({
    authorId: { type: GraphQLString },
    title: { type: GraphQLString },
    notes: { type: GraphQLString },
    auther: {
      type: userType,
      resolve: async (root) => {
        return await userRegistration.findById(root.authorId);
      },
    },
  }),
});

module.exports = { notesType };
