const typeDefs = `
  type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
  }

  type Auth {
    token: String!
    user: User
  }

  type Query {
    me: User
    getSingleUser(userId: ID, username: String): User  
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(username: String, email: String, password: String!): Auth
    saveBook(bookId: String!, description: String!, title: String!, authors: [String], image: String, link: String): User
    deleteBook(bookId: String!): User
    addUser(username: String!, email: String!, password: String!): Auth  # Added this line
  }
`;

module.exports = typeDefs;
