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

const login = new GraphQLObjectType({
  name: "Login",
  fields: () => ({
    success: {type: GraphQLString},
    message: { type: GraphQLString },
    token: { type: GraphQLString }
  }),
});

module.exports = { userType, login };
