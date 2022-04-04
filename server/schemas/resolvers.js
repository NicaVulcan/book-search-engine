const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        // find user
        user: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id})
                .select('-__v -password')
                .populate('books');
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        addBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = User.findOneAndUpdate(
                    { $addToSet: { books: args.input } },
                    { new: true }
                )
                return updatedUser;
            }
            throw new AuthenticationError("You must be logged in to perform this action!");
        },
        removeBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = User.findOneAndUpdate(
                    { $pull: { books: { bookId: args.bookId } } },
                    { new: true }
                )
                return updatedUser;
            }
            throw new AuthenticationError("You must be logged in to perform this action!");
        },
    }
}

module.exports = resolvers;