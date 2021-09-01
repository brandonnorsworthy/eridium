import { gql } from '@apollo/client';

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