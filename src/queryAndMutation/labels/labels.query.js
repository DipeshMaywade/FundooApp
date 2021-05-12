const { GraphQLList } = require('graphql');
const { ObjectId } = require('mongodb');
const { checkAuth } = require('../../utility/auth');
const { labelType } = require('../../types/labels');
const { labels } = require('../../models/labels');
const { getData, setData } = require('../../utility/redis');

class LabelQuery {
  getLabels = {
    type: new GraphQLList(labelType),
    resolve: async (root, args, context) => {
      const verifiedUser = await checkAuth(context);
      if (!verifiedUser) {
        return [{ title: 'Please Login First' }];
      }
      let KEY = `label_${verifiedUser.payload.id}`;
      let result = await getData(KEY);
      if (!result) {
        let noteResult = await labels.find({ userId: ObjectId(verifiedUser.payload.id) });
        await setData(KEY, noteResult);
        console.log('comming from mongodb');
        return noteResult;
      } else {
        console.log('comming from redis');
        return result;
      }
    },
  };
}
module.exports = new LabelQuery();
