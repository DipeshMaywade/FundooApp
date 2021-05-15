/**
 * @module        queryAndMutation/user
 * @file          user.query.js
 * @description   create getAllUser loggedinUser API'S filed
 * @requires      graphql{@linkhttps://www.npmjs.com/package/graphql}
 * @requires      mongodb{@linkhttps://www.npmjs.com/package/mongodb}
 * @author        Dipesh Maywade <dipeshmaywade@gmail.com>
----------------------------------------------------------------------------------------------------*/

const { GraphQLList } = require('graphql');
const { ObjectId } = require('mongodb');
const { userType } = require('../../types/user');
const { userRegistration } = require('../../models/user');
const { checkAuth } = require('../../utility/auth');

class Query {
  allUsers = {
    type: new GraphQLList(userType),
    resolve: async () => {
      const users = await userRegistration.find();
      return users ? users : [{ firstName: 'No users Found' }];
    },
  };

  loggedinUser = {
    type: new GraphQLList(userType),
    resolve: async (root, args, context) => {
      let verifiedUser = await checkAuth(context);
      if (!verifiedUser) return [{ firstName: 'please login first' }];
      const users = await userRegistration.find({ _id: ObjectId(verifiedUser.payload.id) });
      return users ? users : [{ firstName: 'No users Found' }];
    },
  };
}
module.exports = new Query();
