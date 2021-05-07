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
    },
    resolve: async (root, args, context) => {
      const verifiedUser = await checkAuth(context);
      try {
        if (!verifiedUser) {
          return { title: 'please login first' };
        } else {
          const notesUpdate = await notes.findOneAndUpdate({ _id: args.id, userId: verifiedUser.payload.id }, updatedNote);
          if (!notesUpdate) {
            loggers.error(`error`, `Note not found`);
            return null;
          }
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
