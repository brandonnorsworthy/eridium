import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      messages {
        _id
        message_body
      }
    }
  }
`;

export const QUERY_MESSAGES = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      message_body
      message_author
      createdAt
      server
    }
  }
`;