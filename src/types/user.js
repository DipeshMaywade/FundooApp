const { GraphQLObjectType, GraphQLString } = require("graphql");

const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    message: { type: GraphQLString },
  }),
});

const outputType = new GraphQLObjectType({
  name: "OutPut",
  fields: () => ({
    success: { type: GraphQLString },
    message: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});

module.exports = { userType, outputType };
