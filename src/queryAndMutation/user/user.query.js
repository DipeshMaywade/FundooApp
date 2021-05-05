const { GraphQLList } = require('graphql');
const { userType } = require('../../types/user');
const { userRegistration } = require('../../models/user');

class Query {
  users = {
    type: new GraphQLList(userType),
    resolve: async () => {
      const users = await userRegistration.find();
      if (users) {
        return users;
      }
    },
  };
}
module.exports = new Query();
