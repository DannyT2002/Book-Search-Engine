import { gql } from '@apollo/client';

export const GET_SINGLE_USER = gql`
  query getSingleUser($userId: ID, $username: String) {
    getSingleUser(userId: $userId, username: $username) {
      _id
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;

export const GET_ME = gql`
  query getMe {
    me {
      _id
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;
