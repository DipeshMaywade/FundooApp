/**
 * @module        queryAndMutation/notes
 * @file          labels.mutation.js
 * @description   perform CRUD opration for notes
 * @requires      graphql{@linkhttps://www.npmjs.com/package/graphql}
 * @author        Dipesh Maywade <dipeshmaywade@gmail.com>
----------------------------------------------------------------------------------------------------*/

const { GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql');
const { notes } = require('../../models/notes');
const { notesType } = require('../../types/notes');
const { checkAuth } = require('../../utility/auth');
const loggers = require('../../utility/logger');

class NotesMutation {
  addNotes = {
    type: notesType,
    args: {
      title: {
        type: new GraphQLNonNull(GraphQLString),
      },
      description: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, args, context) => {
      const verifiedUser = await checkAuth(context);
      try {
        if (!verifiedUser) {
          return { title: 'for notes creation please login first' };
        } else {
          const note = {
            userId: verifiedUser.payload.id,
            title: args.title,
            description: args.description,
          };
          const notesModel = new notes(note);
          const newNotes = await notesModel.save();
          return !newNotes ? { message: 'failed to save note' } : newNotes;
        }
      } catch (error) {
        loggers.error(`error`, error);
        return { title: error };
      }
    },
  };

  updateNotes = {
    type: notesType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
      title: {
        type: new GraphQLNonNull(GraphQLString),
      },
      description: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, args, context) => {
      const verifiedUser = await checkAuth(context);
      try {
        if (!verifiedUser) {
          return { title: 'please login first' };
        } else {
          const updatedNote = {
            title: args.title,
            description: args.description,
          };
          const notesUpdate = await notes.findOneAndUpdate({ _id: args.id, userId: verifiedUser.payload.id }, updatedNote);
          return !notesUpdate ? { title: 'failed to update' } : notesUpdate;
        }
      } catch (error) {
        loggers.error(`error`, error);
        return { title: error };
      }
    },
  };

  moveToTrash = {
    type: notesType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (root, args, context) => {
      const verifiedUser = await checkAuth(context);
      try {
        if (!verifiedUser) {
          return { title: 'please login first' };
        } else {
          const notesDelete = await notes.findByIdAndUpdate(args.id, { trash: true });
          return !notesDelete ? { title: 'Note note found' } : { title: 'Note successfully moved to trash' };
        }
      } catch (error) {
        loggers.error(`error`, error);
      }
    },
  };

  deleteNote = {
    type: notesType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, args, context) => {
      const verifiedUser = await checkAuth(context);
      try {
        if (!verifiedUser) {
          return { title: 'please login first' };
        } else {
          const notesDelete = await notes.findOneAndDelete({
            _id: args.id,
            userId: verifiedUser.payload.id,
          });
          return !notesDelete ? { title: 'Note note found' } : { title: 'Note successfully deleted' };
        }
      } catch (error) {
        loggers.error(`error`, error);
      }
    },
  };
}

module.exports = new NotesMutation();
