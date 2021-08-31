const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    messages: [Message]!
  }

  type Message {
    _id: ID
    message_body: String
    message_author: String
    createdAt: String
    server: [Server]!
  }

  type Server {
    _id: ID
    server_name: String
    users: [User]!
    messages: [Message]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    messages(username: String): [Message]
    message(_id: ID!): Message
    me: User
    server: [Server]
    server_messages(_id: ID!): Server
    user_messages(_id: ID!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!):Auth
    login(email: String!, password: String!): Auth
    addMessage(message_body: String!): Message
    deleteMessage(messageId: ID!): Message
  }
`;

module.exports = typeDefs;