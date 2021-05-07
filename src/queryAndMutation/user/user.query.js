const { GraphQLList } = require('graphql');
const { userType } = require('../../types/user');
const { userRegistration } = require('../../models/user');
const { checkAuth } = require('../../utility/auth');
const { ObjectId } = require('mongodb');

class Query {
  allUsers = {
    type: new GraphQLList(userType),
    resolve: async () => {
      const users = await userRegistration.find();
      if (users) {
        return users;
      }
    },
  };

  loggedinUser = {
    type: new GraphQLList(userType),
    resolve: async (root, args, context) => {
      let verifiedUser = await checkAuth(context);
      console.log(verifiedUser);
      const users = await userRegistration.find({ _id: ObjectId(verifiedUser.payload.id) });
      if (users) {
        return users;
      }
    },
  };
}
module.exports = new Query();
