import { gql } from '@apollo/client';

export const QUERY_SERVER_CHANNELS = gql`
	query server_channels($server_id: ID!) {
		server_channels(server_id: $server_id) {
			channels {
				_id
				name
			}
		}
	}
`

export const QUERY_CHANNEL_MESSAGE = gql`
	query channel_messages($channel_id: ID!) {
		channel_messages(channel_id: $channel_id) {
			messages {
				_id
				body
				createdAt
				user_id {
					_id
					username
					profile_picture
				}
			}
		}
	}
`

export const QUERY_USER = gql`
	query user($username: String!) {
		user(username: $username) {
			_id
			username
			email
		}
	}
`;