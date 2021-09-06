const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    profile_picture: String
    messages: [Servers]!
  }
  
  type Server {
    _id: ID
    name: String
    icon: String
    owner_id: [User]!
    users: [User]!
    rooms: [Channel]!
  }
    
  type Channel {
    _id: ID
    name: String
    topic: String
    category: String
    messages: [Message]!
    users: [User]!
  }

  type Message {
    _id: ID
    body: String
    createdAt: Date
    user_id: [User]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    message_user(_id: message_id): [User]
    user_servers(_id: user_id): [Server]
    server_users(_id: server_id): [User]
    server_channels(_id: server_id): [Channel]
    channel_messages(_id: channel_id): [Message]
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!):Auth
    login(email: String!, password: String!): Auth
    addMessage(message_body: String!): Message
    deleteMessage(messageId: ID!): Message
    addServer(server_name: String!): Server
    addChannel(channel_name: String!): Channel
  }
`;

module.exports = typeDefs;