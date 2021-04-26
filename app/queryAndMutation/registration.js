const { GraphQLSchema, GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString } = require("graphql");

const registrationSchema = require('../models/registration');
const { userType } = require('../types/registration');

const queryType = new GraphQLObjectType({
    name: "Query",
    fields:  () => {
      return {
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
        user: {
          type: userType,
          args: {
            id: {
              name: "_id",
              type: GraphQLString,
            },
          },
          resolve: function (root, params) {
            const userDetails = registrationSchema.findById(params.id).exec();
            if (!userDetails) {
              throw new Error("Error");
            }
            return userDetails;
          },
        },
      };
    },
  });

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:  () => {
        return {
          addUser: {
            type: userType,
            args: {
              firstName: {
                type: new GraphQLNonNull(GraphQLString)
              },
              lastName: {
                type: new GraphQLNonNull(GraphQLString)
              },
              email: {
                type: new GraphQLNonNull(GraphQLString)
              },
              password: {
                type: new GraphQLNonNull(GraphQLString)
              },
            },
            resolve: (root, data) => {
              const userModel = new registrationSchema(data);
              const newUser = userModel.save();
              if (!newUser) {
                throw new Error('Error');
              }
              return newUser
            }
          },
        }
    }
})

module.exports = new GraphQLSchema({ query: queryType,  mutation: mutation });
