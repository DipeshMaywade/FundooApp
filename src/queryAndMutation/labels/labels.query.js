const { GraphQLList } = require('graphql');
const { ObjectId } = require('mongodb');
const { checkAuth } = require('../../utility/auth');
const logger = require('../../utility/logger');
const { labelType } = require('../../types/labels');
const { labels } = require('../../models/labels');

class LabelQuery {
  getLabels = {
    type: new GraphQLList(labelType),
    resolve: async (root, args, context) => {
      try {
        const verifiedUser = await checkAuth(context);
        if (!verifiedUser) {
          return [{ label: 'Please Login First' }];
        }
        const userLabel = await labels.find({ userId: ObjectId(verifiedUser.payload.id) });
        if (userLabel) return userLabel;
        return [{ label: 'notes are not created' }];
      } catch (error) {
        logger.error('error', error);
      }
    },
  };
}
module.exports = new LabelQuery();
