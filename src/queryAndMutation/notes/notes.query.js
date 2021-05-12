const { GraphQLList } = require('graphql');
const { ObjectId } = require('mongodb');
const { notesType } = require('../../types/notes');
const { notes } = require('../../models/notes');
const { checkAuth } = require('../../utility/auth');
const logger = require('../../utility/logger');
const redis = require('../../utility/redis');

class NotesQuery {
  // getNotes = {
  //   type: new GraphQLList(notesType),
  //   resolve: async (root, args, context) => {
  //     try {
  //       const verifiedUser = await checkAuth(context);
  //       if (!verifiedUser) {
  //         return [{ title: 'Please Login First' }];
  //       }
  //       const userNotes = await notes.find({ userId: ObjectId(verifiedUser.payload.id) });
  //       if (userNotes) return userNotes;
  //       return [{ title: 'notes are not created' }];
  //     } catch (error) {
  //       logger.error('error', error);
  //     }
  //   },
  // };

  getNotes = {
    type: new GraphQLList(notesType),
    resolve: async (root, args, context) => {
      const verifiedUser = await checkAuth(context);
      if (!verifiedUser) {
        return [{ title: 'Please Login First' }];
      }
      let KEY = verifiedUser.payload.id;
      console.log(KEY);

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
