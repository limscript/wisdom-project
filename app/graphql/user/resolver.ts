export default {
  // Query: {
  //   // async githubURL(_root: any, {}, { connector }) {
  //   //   return await connector.utils.githubURL();
  //   // },
  // },

  Mutation: {
    async register(_root: any, { data }, { connector }) {
      return await connector.user.register(data);
    },
  },
};
