const { notesType } = require('../../types/notes');
const { notes } = require('../../models/notes');
const { GraphQLList } = require('graphql');
const { checkAuth } = require('../../utility/auth');

class NotesQuery {
  notes = {
    type: new GraphQLList(notesType),
    resolve: async (root, args, context) => {
      const verifiedUser = await checkAuth(context);
      console.log(verifiedUser);
      const userNotes = await notes.find(verifiedUser.payload.id);
      console.log(userNotes);
      if (userNotes) {
        return userNotes;
      }
    },
  };
}
module.exports = new NotesQuery();
