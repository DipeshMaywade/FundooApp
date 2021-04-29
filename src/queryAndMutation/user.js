const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
} = require("graphql");
const { userRegistration } = require("../models/user");
const { userType } = require("../types/user");
const { addUser, loginUser, forgetPass, resetPass } = require("./index")

const Query = new GraphQLObjectType({
  name: "GetData",
  fields: () => ({
    users: {
      type: new GraphQLList(userType),
      resolve: function () {
        const users = userRegistration.find().exec();
        if (users) {
          return users
        }
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Registration",
  fields: { addUser, loginUser, forgetPass, resetPass }
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
