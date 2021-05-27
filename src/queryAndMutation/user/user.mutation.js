/**
 * @module        queryAndMutation/user
 * @file          user.mutation.js
 * @description   create addUser loginUser forgotPassword resetPassword API'S/
 * @requires      graphql{@linkhttps://www.npmjs.com/package/graphql}
 * @author        Dipesh Maywade <dipeshmaywade@gmail.com>
----------------------------------------------------------------------------------------------------*/

const { GraphQLNonNull, GraphQLString } = require('graphql');
const { GraphQLUpload } = require('graphql-upload');
const { promisify } = require('util');
const { validationSchema, jwtGenerator, passEncrypt, comparePassword } = require('../../utility/helper');
const { userRegistration } = require('../../models/user');
const { userType, outputType } = require('../../types/user');
const { checkAuth } = require('../../utility/auth');
const { sentToQueue } = require('../../utility/sender');
const { consumeMessage } = require('../../utility/reciver');
const sentToSQS = require('../../utility/sqsService/publisher');
const consumefromSQS = require('../../utility/sqsService/consumer');
const loggers = require('../../utility/logger');
const S3 = require('../../../config/awsConfig');
const { subs } = require('../../utility/snsService/subscribe');
require('dotenv').config();

/** user all type of mutation fields are wrapped into the class
 * @class Mutation
 * @property addUser, loginUser, forgetPassword, resetPassword
 * @description class for all the mutation property
 */
class Mutation {
  /**
   * @fileds addUser
   * @type userType
   * @argument args
   * @param {resolveParameter} root
   * @param {resolveParameter} data
   * @description addUser fields provide ability to create new user account for
   */
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
      const result = validationSchema.validate(data);
      if (result.error) {
        return { firstName: 'validation failed' };
      }
      try {
        data.password = await passEncrypt(data.password);
        const userModel = new userRegistration(data);
        const newUser = await userModel.save();
        if (!newUser) {
          return { firstName: 'failed to save' };
        }
        await subs(newUser.email);
        return newUser;
      } catch (error) {
        loggers.error(`error`, error);
        return { firstName: error };
      }
    },
  };

  /**
   * @fileds loginUser
   * @type outputType
   * @param {resolveParameter} root
   * @param {resolveParameter} args
   * @description login fields provide ability to user login with correct email and password and genrate a tocken.
   */
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
      const response = {};
      const result = validationSchema.validate(args);
      if (result.error) {
        return { message: 'validation failed' };
      }
      try {
        let user = await userRegistration.findOne({ email: args.email });
        if (!user) {
          response.success = false;
          response.message = 'incorrect email, user not Found';
          return response;
        }
        if (user) {
          let isValid = await comparePassword(args.password, user.password);
          if (!isValid) {
            response.success = false;
            response.message = 'incorrect password.';
            return response;
          }
          let payload = {
            id: user.id,
            email: user.email,
          };
          response.success = true;
          response.message = 'Login successful';
          response.token = jwtGenerator(payload);
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

  /**
   * @fileds forgotPassword
   * @type outputType
   * @param {resolveParameter} root
   * @param {resolveParameter} args
   * @description forgotPassword fields provide ability to send mail on registered email ID with reset password token.
   */
  forgotPassword = {
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
        response.message = 'validation failed';
        return response;
      }
      try {
        let user = await userRegistration.findOne({ email: args.email });
        if (!user) {
          response.success = false;
          response.message = 'incorrect email user not Found';
          return response;
        }
        let payload = {
          id: user.id,
          email: user.email,
        };
        response.token = jwtGenerator(payload);
        await sentToQueue(user.email, response.token);
        let message = await consumeMessage();
        response.success = true;
        response.message = message;
        return response;
      } catch (error) {
        response.success = false;
        response.message = error;
        loggers.error(`error`, response);
        return response;
      }
    },
  };

  /**
   * @fileds forgotPassword
   * @type outputType
   * @param {resolveParameter} root
   * @param {resolveParameter} args
   * @description forgotPassword fields provide ability to send mail on registered email ID with reset password token.
   */
  forgotPasswordWithSQS = {
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
        response.message = 'validation failed';
        return response;
      }
      try {
        let user = await userRegistration.findOne({ email: args.email });
        if (!user) {
          response.success = false;
          response.message = 'incorrect email user not Found';
          return response;
        }
        let payload = {
          id: user.id,
          email: user.email,
        };
        response.token = await jwtGenerator(payload);
        await sentToSQS(user.email, response.token);
        let message = await consumefromSQS();
        response.success = true;
        response.message = 'Token sent to the registered email address';
        return response;
      } catch (error) {
        response.success = false;
        response.message = error;
        loggers.error(`error`, response);
        return response;
      }
    },
  };

  /**
   * @fileds resetPassword
   * @type outputType
   * @param {resolveParameter} root
   * @param {resolveParameter} args
   * @param {resolveParameter} context
   * @description resetPassword provide ability to reset password only for authenticate user using jwt.
   */
  resetPassword = {
    type: outputType,
    args: {
      newPassword: {
        type: new GraphQLNonNull(GraphQLString),
      },
      confirmPassword: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (_, args, context) => {
      let response = {};
      const verifiedUser = await checkAuth(context);
      let result = validationSchema.validate(args);
      if (args.newPassword === args.confirmPassword && !result.error) {
        try {
          if (!verifiedUser) {
            response.success = false;
            response.message = 'incorrect token';
            return response;
          }
          let newPassword = await passEncrypt(args.confirmPassword);
          await userRegistration.findByIdAndUpdate(verifiedUser.payload.id, {
            password: newPassword,
          });
          response.success = true;
          response.message = 'password updated successfully';
          return response;
        } catch (error) {
          response.success = false;
          response.message = error;
          loggers.error(`error`, response);
          return response;
        }
      } else {
        response.success = false;
        response.message = 'password does not matched or invalid formate';
        return response;
      }
    },
  };

  /**
   * @fileds uploadAvatarImage
   * @type outputType
   * @param {resolveParameter} root
   * @param {resolveParameter} args
   * @param {resolveParameter} context
   * @description uploading Avatar image and sotre that image into s3 bucket and image url stored in mongoDB
   */
  uploadAvatarImage = {
    type: outputType,
    args: {
      file: {
        type: new GraphQLNonNull(GraphQLUpload),
      },
    },
    resolve: async (_, args, context) => {
      let response = {};
      const verifiedUser = await checkAuth(context);
      try {
        if (!verifiedUser) {
          response.success = false;
          response.message = 'please login first..!';
          return response;
        }
        const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: '',
          Body: '',
          ACL: 'public-read',
        };

        let { createReadStream, filename } = await args.file;
        let fileStream = createReadStream();
        fileStream.on('error', (error) => console.error(error));
        params.Body = fileStream;
        console.log(fileStream);
        let timestamp = new Date().getTime();
        params.Key = `AvatarImages/${timestamp}${filename}`;

        let upload = promisify(S3.upload.bind(S3));
        let result = await upload(params).catch(console.log);

        await userRegistration.findByIdAndUpdate(verifiedUser.payload.id, {
          imageUrl: result.Location,
        });

        response.success = true;
        response.message = `download url: ${result.Location}`;
        return response;
      } catch (error) {
        response.success = false;
        response.message = 'failed';
        loggers.error(`error`, response);
        return response;
      }
    },
  };
}

module.exports = new Mutation();
