const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const { notes } = require('../models/notes');
const { notesType } = require('./notes');
const jwt = require('jsonwebtoken');

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
  }),
});

const outputType = new GraphQLObjectType({
  name: 'Output',
  fields: () => ({
    success: { type: GraphQLString },
    message: { type: GraphQLString },
    token: { type: GraphQLString },
    notes: {
      type: GraphQLList(notesType),
      resolve: async (root) => {
        const verifiedUser = await jwt.decode(root.token);
        let note = await notes.find({ userId: verifiedUser.payload.id });
        return note;
      },
    },
  }),
});

module.exports = { userType, outputType };
