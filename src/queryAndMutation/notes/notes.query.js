const { notesType } = require('../../types/notes');
const { notes } = require('../../models/notes');
const { GraphQLList } = require('graphql');
const { checkAuth } = require('../../utility/auth');
const { ObjectId } = require('mongodb');
const logger = require('../../utility/logger');

class NotesQuery {
  notes = {
    type: new GraphQLList(notesType),
    resolve: async (root, args, context) => {
      try {
        const verifiedUser = await checkAuth(context);
        const userNotes = await notes.find({ userId: ObjectId(verifiedUser.payload.id) }, function (err, result) {
          if (!err) return result;
        });
        if (userNotes) {
          return userNotes;
        }
      } catch (error) {
        logger.error('error', error);
      }
    },
  };
}
module.exports = new NotesQuery();
