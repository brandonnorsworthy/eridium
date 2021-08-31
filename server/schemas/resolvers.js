const { AuthenticationError } = require('apollo-server-express');
const { User, Message, Server } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // All users
    users: async () => {
        return User.find()
    },
    // All servers
    server: async () => {
        return Server.find()
    },
    // Messages by server
    server_messages: async (server_id) => {
        return Server.findOne({_id: server_id}).populate('messages');
    },
    // Messages by user
    user_messages: async (user_id) => {
        return User.findOne({_id: user_id}).populate('messages');
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    // Send a message to all users in server
    addMessage: async (parent, { messageText }, context) => {
      if (context.user) {
        const message = await Message.create({
          messageText,
          messageAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { messages: thought._id } }
        );

        return message;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // Send a message to one user

    // Edit a message sent on server
    // Edit a message sent to one user
    // Delete a message sent on server
    // Delete a message sent to one user
    
//     addComment: async (parent, { thoughtId, commentText }, context) => {
//       if (context.user) {
//         return Thought.findOneAndUpdate(
//           { _id: thoughtId },
//           {
//             $addToSet: {
//               comments: { commentText, commentAuthor: context.user.username },
//             },
//           },
//           {
//             new: true,
//             runValidators: true,
//           }
//         );
//       }
//       throw new AuthenticationError('You need to be logged in!');
//     },
//     removeThought: async (parent, { thoughtId }, context) => {
//       if (context.user) {
//         const thought = await Thought.findOneAndDelete({
//           _id: thoughtId,
//           thoughtAuthor: context.user.username,
//         });

//         await User.findOneAndUpdate(
//           { _id: context.user._id },
//           { $pull: { thoughts: thought._id } }
//         );

//         return thought;
//       }
//       throw new AuthenticationError('You need to be logged in!');
//     },
//     removeComment: async (parent, { thoughtId, commentId }, context) => {
//       if (context.user) {
//         return Thought.findOneAndUpdate(
//           { _id: thoughtId },
//           {
//             $pull: {
//               comments: {
//                 _id: commentId,
//                 commentAuthor: context.user.username,
//               },
//             },
//           },
//           { new: true }
//         );
//       }
//       throw new AuthenticationError('You need to be logged in!');
//     },
//   },
}
};

module.exports = resolvers;
