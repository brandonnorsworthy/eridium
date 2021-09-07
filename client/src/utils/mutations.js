import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        servers {
          name
          icon
          _id
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        servers {
          name
          icon
          _id
        }
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage(
    $body: String!
    $user_id: ID!
    $channel_id: ID!
  ) {
    addMessage(
      body: $body
      user_id: $user_id
      channel_id: $channel_id
    ) {
      body
    }
  }
`