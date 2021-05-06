const { GraphQLNonNull, GraphQLString } = require('graphql');
const { labels } = require('../../models/labels');
const { labelType } = require('../../types/labels');
const { checkAuth } = require('../../utility/auth');
const loggers = require('../../utility/logger');

class labelMutation {
  addLabel = {
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
            userId: verifiedUser.payload.id,
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

  updateLabel = {
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
          return { title: 'please login first' };
        } else {
          const updatedLabel = {
            label: args.newLabel,
          };
          const labelUpdate = await labels.findOneAndUpdate({ _id: args.id, userId: verifiedUser.payload.id }, updatedLabel, (err, result) => {
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

  //   deleteNote = {
  //     type: notesType,
  //     args: {
  //       id: {
  //         type: new GraphQLNonNull(GraphQLString),
  //       },
  //     },
  //     resolve: async (root, args, context) => {
  //       const verifiedUser = await checkAuth(context);
  //       try {
  //         if (!verifiedUser) {
  //           return { title: 'please login first' };
  //         } else {
  //           const notesUpdate = await notes.findOneAndDelete({ _id: args.id, userId: verifiedUser.payload.id }, (err, result) => {
  //             if (err) return { title: err };
  //             return result;
  //           });
  //           if (!notesUpdate) {
  //             loggers.error(`error`, `Note not found`);
  //             return null;
  //           }
  //           return { title: 'Note successfully deleted' };
  //         }
  //       } catch (error) {
  //         loggers.error(`error`, error);
  //         return { title: error };
  //       }
  //     },
  //   };
}

module.exports = new labelMutation();
