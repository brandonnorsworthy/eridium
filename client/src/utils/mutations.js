import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
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
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage(
    $message_body: String!
    $message_author: String!
  ) {
    addMessage(
      message_body: $message_body
      message_author: $message_author
    ) {
      message_body
    }
  }
`