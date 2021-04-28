const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
} = require("graphql");
const bcrypt = require("bcrypt");
const { schema, jwtGenerator } = require("../utility/helper");
const { userRegistration } = require("../models/user");
const { userType, login } = require("../types/user");

const GetData = new GraphQLObjectType({
  name: "GetData",
  fields: () => ({
    users: {
      type: new GraphQLList(userType),
      resolve: function () {
        const users = userRegistration.find().exec();
        if (!users) {
          throw new Error("Error");
        }
        return users;
      },
    },
  }),
});

const registration = new GraphQLObjectType({
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
          const userModel = new userRegistration(data);
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
      type: login,
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (root, args) => {
        let response = {}
        let result = schema.validate(args);
        if (result.error) {
          throw new Error(result.error);
        }
        try {
          user = await userRegistration.findOne({ email: args.email });
          if (!user) {
            response.success = false
            response.message = "incorrect email user not Found"
            return response;
          }
          if (user) {
            const isValid = await bcrypt.compare(args.password, user.password);
            if (!isValid) {
              response.success = false
              response.message = "incorrect password."
              return response;
            } else {
              response.success = true
              response.message = "Login Sucessfull token generated for 1hr"
              response.token = jwtGenerator(user)
              return response
            }
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: GetData,
  mutation: registration,
});
