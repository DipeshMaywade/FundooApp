const { GraphQLList } = require('graphql');
const { ObjectId } = require('mongodb');
const { notesType } = require('../../types/notes');
const { notes } = require('../../models/notes');
const { checkAuth } = require('../../utility/auth');
const logger = require('../../utility/logger');
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
      console.log(KEY);
      redis.getData(KEY, (err, data) => {
        if (err) {
          return [{ title: 'error from redis', err }];
        } else if (!data) {
          notes.find({ userId: ObjectId(verifiedUser.payload.id) }, (error, noteResult) => {
            if (error) {
              return [{ title: 'notes not found' }];
            } else {
              redis.setData(KEY, noteResult);
              console.log('comming from mongodb');
              return noteResult;
            }
          });
        } else {
          console.log('comming from redis');
          return data;
        }
      });
    },
  };
}

module.exports = new NotesQuery();

retrieveAllNotes = (userId, callback) => {
  logger.info(`TRACKED_PATH: Inside services`);
  const KEY = `NOTE_${userId}`;
  helper.getResponseFromRedis(KEY, (error, dataFromRedis) => {
    if (error) {
      error = {
        success: false,
        statusCode: resposnsCode.INTERNAL_SERVER_ERROR,
        message: error,
      };
      callback(error, null);
    } else if (!dataFromRedis) {
      noteModel.getAllNotes(userId, (error, noteResult) => {
        error
          ? ((error = {
              success: false,
              statusCode: resposnsCode.INTERNAL_SERVER_ERROR,
              message: error,
            }),
            callback(error, null))
          : (helper.setDataToRedis(KEY, noteResult),
            console.log('comming from mongodb'),
            (noteResult = {
              success: true,
              statusCode: resposnsCode.SUCCESS,
              message: 'Notes of current account has been retrieved',
              data: noteResult,
            }),
            callback(null, noteResult));
      });
    } else {
      console.log('comming from redis');
      dataFromRedis = {
        success: true,
        statusCode: resposnsCode.SUCCESS,
        message: 'Notes of current account has been retrieved',
        data: dataFromRedis,
      };
      callback(null, dataFromRedis);
    }
  });
};
