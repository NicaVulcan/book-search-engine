const resolvers = {
    Query: {
        me: () => {
            return "it worked!"
        }
    }
}

module.exports = resolvers;