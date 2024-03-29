/**
 * @module        queryAndMutation/notes
 * @file          notes.query.js
 * @description   perform GET opration for notes.
 * @requires      graphql{@linkhttps://www.npmjs.com/package/graphql}
 * @author        Dipesh Maywade <dipeshmaywade@gmail.com>
----------------------------------------------------------------------------------------------------*/

const { GraphQLList } = require('graphql');
const { ObjectId } = require('mongodb');
const { notesType } = require('../../types/notes');
const { notes } = require('../../models/notes');
const { checkAuth } = require('../../utility/auth');
const redis = require('../../utility/redis');

class NotesQuery {
  getNotes = {
    type: new GraphQLList(notesType),
    resolve: async (root, args, context) => {
      const verifiedUser = await checkAuth(context);
      if (!verifiedUser) {
        return [{ title: 'Please Login First' }];
      }
      let KEY = verifiedUser.payload.id;
      let result = await redis.getData(KEY);
      if (!result) {
        let noteResult = await notes.find({ userId: ObjectId(verifiedUser.payload.id) });
        await redis.setData(KEY, noteResult);
        console.log('comming from mongodb');
        return noteResult;
      } else {
        console.log('comming from redis');
        return result;
      }
    },
  };
}

module.exports = new NotesQuery();
