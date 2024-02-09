const { User, Campaign } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { dateScalar } = require('./scalar');

const resolvers = {
  Date: dateScalar,
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }
      return await User.findById(context.user._id)
    },
    campaign: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }
      return await Campaign.findById(context.campaign._id)
    },
  },
  Mutation: {
    addUser: async (parent, argObj) => {
      try {
        const user = await User.create(argObj);
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.log(err);
        throw UserInputError
      }
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addCampaign: async (parent, argObj) => {
      try {
        const campaign = await Campaign.create(argObj);
        return { campaign };
      } catch (err) {
        console.log(err);
        throw CreateCampaignError;
      }
    }
  }
};

module.exports = resolvers;
