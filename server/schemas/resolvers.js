const { User } = require('../models');
const { signToken } = require('../utils/auth');

// Resolvers for GraphQL
const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      return await User.findById(user._id);
    },
    getSingleUser: async (_, { userId, username }) => {
      // Implementation for getSingleUser if needed
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      if (!user) {
        throw new Error('Something went wrong');
      }
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password, username }) => {
      const user = await User.findOne({ $or: [{ username }, { email }] });
      if (!user) {
        throw new Error("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error('Wrong password!');
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_, { bookId, description, title, authors, image, link }, { user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      try {
        return await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: { bookId, description, title, authors, image, link } } },
          { new: true, runValidators: true }
        );
      } catch (err) {
        throw new Error('Error saving book: ' + err.message);
      }
    },
    deleteBook: async (_, { bookId }, { user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        if (!updatedUser) {
          throw new Error("Couldn't find user with this id!");
        }
        return updatedUser;
      } catch (err) {
        throw new Error('Error removing book: ' + err.message);
      }
    },
  },
};

module.exports = resolvers;
