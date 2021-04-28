const { GraphQLObjectType, GraphQLString, GraphQLObject, GraphQLList } = require("graphql");

const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
      id: { type: GraphQLString },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
  }),
});

const auth = new GraphQLObjectType({
  name: "Auth",
  fields: () => ({
    message: { type: GraphQLString },
    token: { type: GraphQLString }
  }),
});

module.exports = { userType, auth };
