const resolvers = {
    Query: {
        helloWorld: () => {
            return "it worked!"
        }
    }
}

module.exports = resolvers;