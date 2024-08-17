import { gql } from '@apollo/client';

export const LOGIN_USER  = gql`
mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER  = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
        }
        }
    }
`;

export const SAVE_BOOK  = gql`
    mutation SaveBook($bookInput: BookInput) {
        saveBook(bookInput: $bookInput) {
        _id
        username
        email
        password
        bookCount
            savedBooks {
                bookId
                authors
                description
                image
                link
                title
            }
        }
    }
`;

export const REMOVE_BOOK  = gql`
mutation RemoveBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        image
        link
        title
      }
    }
  }
`;