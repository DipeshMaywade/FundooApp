const { GraphQLList } = require('graphql');
const { ObjectId } = require('mongodb');
const { notesType } = require('../../types/notes');
const { notes } = require('../../models/notes');
const { checkAuth } = require('../../utility/auth');
const logger = require('../../utility/logger');

class NotesQuery {
  allNotes = {
    type: new GraphQLList(notesType),
    resolve: async (root, args, context) => {
      try {
        const verifiedUser = await checkAuth(context);
        if (!verifiedUser) {
          return [{ title: 'Please Login First' }];
        }
        const userNotes = await notes.find({ userId: ObjectId(verifiedUser.payload.id) });
        if (userNotes) return userNotes;
        return [{ title: 'notes are not created' }];
      } catch (error) {
        logger.error('error', error);
      }
    },
  };
}
module.exports = new NotesQuery();
