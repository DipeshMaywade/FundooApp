const { GraphQLNonNull, GraphQLString } = require('graphql');
const { validationSchema, jwtGenerator, sendMail, passEncrypt, comparePassword } = require('../utility/helper');
const { notes } = require('../models/notes');
const { notesType } = require('../types/notes');
const { checkAuth } = require('../utility/auth');
const loggers = require('../utility/logger');

class NotesMutation {
  addNotes = {
    type: notesType,
    args: {
      title: {
        type: new GraphQLNonNull(GraphQLString),
      },
      notes: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, args, context) => {
      const verifiedUser = await checkAuth(context);
      try {
        if (!verifiedUser) {
          return { title: 'for notes creation please login first' };
        } else {
          let note = {
            authorId: verifiedUser.payload.id,
            title: args.title,
            notes: args.notes,
          };
          let notesModel = new notes(note);
          let newNotes = await notesModel.save();
          if (!newNotes) {
            return { message: 'failed to save note' };
          }
          return newNotes;
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
      notes: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, args, context) => {
      const verifiedUser = await checkAuth(context);
      try {
        if (!verifiedUser) {
          return { title: 'please login first' };
        } else {
          let updatedNote = {
            title: args.title,
            notes: args.notes,
          };
          let notesUpdate = await notes.findOneAndUpdate({ _id: args.id, authorId: verifiedUser.payload.id }, updatedNote);
          if (!notesUpdate) {
            loggers.error(`error`, `Note not found`);
            return null;
          }
          return notesUpdate;
        }
      } catch (error) {
        loggers.error(`error`, error);
        return { title: error };
      }
    },
  };
}

module.exports = new NotesMutation();
