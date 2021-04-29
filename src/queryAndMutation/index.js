const {
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");
const bcrypt = require("bcrypt");
const { schema, jwtGenerator } = require("../utility/helper");
const { userRegistration } = require("../models/user");
const { userType, login } = require("../types/user");

class Mutation {
  addUser = {
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
        return {message: result.error.message}
      }
      try {
        const userModel = new userRegistration(data);
        const newUser = userModel.save();
        if (!newUser) {
          return {message: "failed to save" }
        }
        return newUser;
      } catch (error) {
        return { message: error }
      }
    },
  };
  loginUser = {
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
      let response = {};
      let result = schema.validate(args);
      if (result.error) {
        return { message: result.error.message }
      }
      try {
        let user = await userRegistration.findOne({ email: args.email });
        if (!user) {
          response.success = false;
          response.message = "incorrect email user not Found";
          return response;
        }
        if (user) {
          let isValid = await bcrypt.compare(args.password, user.password);
          if (!isValid) {
            response.success = false;
            response.message = "incorrect password.";
            return response;
          } else {
            response.success = true;
            response.message = "Login Sucessfull token";
            response.token = jwtGenerator(user);
            return response;
          }
        }
      } catch (error) {
            response.success = false
            response.message = error
            return response
      }
    },
  };
  forgetPass = {
    type: login,
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, args) => {
      let response = {}
      let result = schema.validate(args);
      if (result.error) {
          response.success = false;
          response.message = result.error.message;
          return response;
      }
      try {
        let user = await userRegistration.findOne({ email: args.email });
        if (!user) {
          response.success = false
          response.message = "incorrect email user not Found"
          return response;
        } else {
          response.success = true
          response.message = "Token send to the registered email id"
          response.token = jwtGenerator(user)
          return response
        }
      }
      catch (error) {
        response.success = false;
        response.message = error;
        return response;
      }
    },
  };
}

module.exports = new Mutation();
