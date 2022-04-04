//import gql
const { gql } = require('apollo-server-express');

// type defs
const typeDefs = gql`
    # user info
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    # book info
    type Book {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }
    # queries
    type Query {
        user(username: String!): User
        books(username: String!): [Book]
    }
    # mutations 
    type Mutation {
        login(email: String!, password: String!): User
        addUser(username: String!, email: String!, password: String!): User
        addBook(userId: ID!): User
        removeBook(userId: ID!): User
    }
`;

module.exports = typeDefs;