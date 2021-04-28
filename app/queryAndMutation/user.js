const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
} = require("graphql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { schema } = require("../utility/helper");
const { registrationSchema } = require("../models/user");
const { userType, auth } = require("../types/user");

const GetData = new GraphQLObjectType({
  name: "GetData",
  fields: () => ({
    users: {
      type: new GraphQLList(userType),
      resolve: function () {
        const users = registrationSchema.find().exec();
        if (!users) {
          throw new Error("Error");
        }
        return users;
      },
    },
  }),
});

const userRegistration = new GraphQLObjectType({
  name: "Registration",
  fields: () => ({
    addUser: {
      type: userType,
      args: {
        firstName: {
          type: new GraphQLNonNull(GraphQLString),
        },
        lastName: {
          type: new GraphQLNonNull(GraphQLString),
        },
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (root, data) => {
        let result = schema.validate(data);
        if (result.error) {
          throw new Error(result.error);
        }
        try {
          const userModel = new registrationSchema(data);
          const newUser = userModel.save();
          if (!newUser) {
            throw new Error("Error");
          }
          return newUser;
        } catch (error) {
          throw new Error(error);
        }
      },
    },
    loginUser: {
      type: auth,
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },

      resolve: async (root, data) => {
        let result = schema.validate(data);
        if (result.error) {
          throw new Error(result.error);
        }
        try {
          user = await registrationSchema.findOne({ email: data.email });
          console.log(user);
          if (!user) {
            throw new Error("user not Found");
          }
          return { user };
        } catch (error) {
          throw new Error(error);
        }
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: GetData,
  mutation: userRegistration,
});
