const { AuthenticationError } = require('apollo-server-express');
const { User, Message, Server } = require('../models');
const { signToken} = require('../utils/auth');

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
            return Server.findOne({ _id: server_id }).populate('messages');
        },
        // Allows authentication to work properly
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
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
        // Send message on server and to one user
        addMessage: async (parent, { message_body }, context) => {
            // if (context.user) {
                const message = await Message.create({
                    message_body: message_body,
                    message_author: context.user.username,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { messages: message._id } }
                );

                await Server.findOneAndUpdate(
                    { _id: context.server._id },
                    { $addToSet: { messages: message._id } }
                );

                return message;
            // }
            throw new AuthenticationError('You need to be logged in!');
        },
        // Edit a message sent on server

        // Edit a message sent to one user
        // Delete a message sent on server
        // Delete a message sent to one user

        // Add server

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
