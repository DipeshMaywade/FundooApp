const { userType } = require('../../types/user');
const { userRegistration } = require('../../models/user');
const { GraphQLList } = require('graphql');

class Query {
  users = {
    type: new GraphQLList(userType),
    resolve: function () {
      const users = userRegistration.find().exec();
      if (users) {
        return users;
      }
    },
  };
}
module.exports = new Query();
