const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		password: String
		profile_picture: String
		servers: [Server]!
	}
	
	type Server {
		_id: ID!
		name: String
		icon: String
		owner_id: User!
		users: [User]!
		channels: [Channel]!
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
		createdAt: String
		user_id: User!
	}

	type Auth {
		token: ID!
		user: User!
	}

	type Query {
		message_user(_id: String!): [User]
		user_servers(_id: String!): [Server]
		server_users(_id: String!): [User]
		server_channels(server_id: ID!): Server
		channel_messages(channel_id: ID!): Channel
		me: User
	}

	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		login(email: String!, password: String!): Auth
		addMessage(body: String!, user_id: ID!, channel_id: ID!): Message
		deleteMessage(messageId: ID!): Message
		addServer(server_name: String!): Server
		addChannel(channel_name: String!): Channel
	}
`;

module.exports = typeDefs;