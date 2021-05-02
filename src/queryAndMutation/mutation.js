const { GraphQLNonNull, GraphQLString } = require('graphql');
const bcrypt = require('bcrypt');
const { validationSchema, jwtGenerator, sendMail, passEncrypt } = require('../utility/helper');
const { userRegistration } = require('../models/user');
const { userType, outputType } = require('../types/user');
const checkAuth = require('../utility/auth');
const loggers = require('../utility/logger');

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
    resolve: async (root, data) => {
      let result = validationSchema.validate(data);
      if (result.error) {
        return { message: result.error.message };
      }
      try {
        data.password = await passEncrypt(data.password);
        const userModel = new userRegistration(data);
        const newUser = userModel.save();
        if (!newUser) {
          return { message: 'failed to save' };
        }
        return newUser;
      } catch (error) {
        loggers.error(`error`, error);
        return { message: error };
      }
    },
  };
  loginUser = {
    type: outputType,
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
      let result = validationSchema.validate(args);
      if (result.error) {
        return { message: result.error.message };
      }
      try {
        let user = await userRegistration.findOne({ email: args.email });
        if (!user) {
          response.success = false;
          response.message = 'incorrect email, user not Found';
          return response;
        }
        if (user) {
          let isValid = await bcrypt.compare(args.password, user.password);
          if (!isValid) {
            response.success = false;
            response.message = 'incorrect password.';
            return response;
          } else {
            let payload = {
              id: user.id,
              email: user.email,
            };
            response.success = true;
            response.message = 'Login successful';
            response.token = jwtGenerator(payload);
            return response;
          }
        }
      } catch (error) {
        response.success = false;
        response.message = error;
        loggers.error(`error`, response);
        return response;
      }
    },
  };
  forgotPass = {
    type: outputType,
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, args) => {
      let response = {};
      let result = validationSchema.validate(args);
      if (result.error) {
        response.success = false;
        response.message = result.error.message;
        return response;
      }
      try {
        let user = await userRegistration.findOne({ email: args.email });
        if (!user) {
          response.success = false;
          response.message = 'incorrect email user not Found';
          return response;
        } else {
          let payload = {
            id: user.id,
            email: user.email,
          };
          response.success = true;
          response.message = 'Token send to the registered email id';
          response.token = jwtGenerator(payload);
          sendMail(response.token, user.email);
          return response;
        }
      } catch (error) {
        response.success = false;
        response.message = error;
        loggers.error(`error`, response);
        return response;
      }
    },
  };
  resetPass = {
    type: outputType,
    args: {
      newPassword: {
        type: new GraphQLNonNull(GraphQLString),
      },
      confirmPassword: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, args, context) => {
      const verifiedUser = checkAuth(context);
      let response = {};
      if (args.newPassword === args.confirmPassword) {
        try {
          if (!verifiedUser) {
            response.success = false;
            response.message = 'incorrect token';
            return response;
          } else {
            let newpassword = await passEncrypt(args.confirmPassword);
            await userRegistration.findByIdAndUpdate(verifiedUser.payload.id, { password: newpassword });
            response.success = true;
            response.message = 'password updated successfully';
            return response;
          }
        } catch (error) {
          response.success = false;
          response.message = error;
          loggers.error(`error`, response);
          return response;
        }
      } else {
        response.success = false;
        response.message = 'password does not matched';
        return response;
      }
    },
  };
}

module.exports = new Mutation();
