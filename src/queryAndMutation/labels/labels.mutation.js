/**
 * @module        queryAndMutation/labels
 * @file          labels.mutation.js
 * @description   perform CRUD for labels
 * @requires      graphql{@linkhttps://www.npmjs.com/package/graphql}
 * @author        Dipesh Maywade <dipeshmaywade@gmail.com>
----------------------------------------------------------------------------------------------------*/

const { GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql');
const { labels } = require('../../models/labels');
const { notes } = require('../../models/notes');
const { labelType } = require('../../types/labels');
const { notesType } = require('../../types/notes');
const { checkAuth } = require('../../utility/auth');
const loggers = require('../../utility/logger');

class labelMutation {
  createLabel = {
    type: labelType,
    args: {
      label: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, args, context) => {
      const verifiedUser = await checkAuth(context);
      try {
        if (!verifiedUser) {
          return { label: 'please login first' };
        } else {
          const label = {
            label: args.label,
            userId: verifiedUser.payload.id,
          };
          const labelModel = new labels(label);
          const newlabel = await labelModel.save();
          return !newlabel ? { label: 'failed to save label' } : newlabel;
        }
      } catch (error) {
        loggers.error(`error`, error);
        return { title: error };
      }
    },
  };

  updateLabelName = {
    type: labelType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
      newLabel: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, args, context) => {
      const verifiedUser = await checkAuth(context);
      try {
        if (!verifiedUser) {
          return { label: 'please login first' };
        } else {
          const updatedLabel = {
            label: args.newLabel,
          };
          const labelUpdate = await labels.findOneAndUpdate({ _id: args.id }, updatedLabel, (err, result) => {
            return err ? { label: 'failed to update label' } : result;
          });
          return !labelUpdate ? { label: 'failed to update label' } : labelUpdate;
        }
      } catch (error) {
        loggers.error(`error`, error);
        return { label: error };
      }
    },
  };

  deleteLabel = {
    type: labelType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (root, args, context) => {
      const verifiedUser = await checkAuth(context);
      try {
        if (!verifiedUser) {
          return { label: 'please login first' };
        } else {
          const labelDelete = await labels.findOneAndDelete({ _id: args.id });
          return !labelDelete ? { label: 'label note found' } : { label: 'label successfully deleted' };
        }
      } catch (error) {
        loggers.error(`error`, error);
        return { label: error };
      }
    },
  };

  addLabelOnNotes = {
    type: notesType,
    args: {
      labelId: {
        type: new GraphQLNonNull(GraphQLID),
      },
      noteId: {
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (root, args, context) => {
      const verifiedUser = await checkAuth(context);
      try {
        if (!verifiedUser) {
          return { title: 'please login first' };
        }
        const checkLabels = await notes.find({
          _id: args.noteId,
          labelId: { $in: [args.labelId] },
        });
        if (checkLabels.length != 0) {
          return {
            title: 'This label is already attached..',
          };
        }
        const notesUpdate = await notes.findByIdAndUpdate(args.noteId, { $push: { labelId: args.labelId } }, { new: true, upsert: true });
        return notesUpdate;
      } catch (error) {
        loggers.error(`error`, error);
        return { label: error };
      }
    },
  };

  removeLabelOnNotes = {
    type: notesType,
    args: {
      labelId: {
        type: new GraphQLNonNull(GraphQLID),
      },
      noteId: {
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (root, args, context) => {
      const verifiedUser = await checkAuth(context);
      try {
        if (!verifiedUser) {
          return { title: 'please login first' };
        } else {
          const notesUpdate = await notes.findByIdAndUpdate(args.noteId, { $pull: { labelId: args.labelId } }, { new: true });
          return notesUpdate;
        }
      } catch (error) {
        loggers.error(`error`, error);
        return { label: error };
      }
    },
  };
}

module.exports = new labelMutation();
