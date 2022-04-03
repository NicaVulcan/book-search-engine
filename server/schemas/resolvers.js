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
        },
        // find books by user
        books: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Book.find(params);
        }
    }
}

module.exports = resolvers;