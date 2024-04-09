const Host = require('./models/Host');

const resolvers = {
  // Resolver untuk Query
  hosts: async () => {
    try {
      const hosts = await Host.find();
      return hosts;
    } catch (err) {
      throw new Error('Failed to get hosts');
    }
  },

  // Resolver untuk Mutation
  addHost: async ({ hostName, accountStatus, berlianBulanIni, durasiLiveBulanIni, hariBerlakuBulanIni, targetBerlianDasar }) => {
    try {
      const host = new Host({ hostName, accountStatus, berlianBulanIni, durasiLiveBulanIni, hariBerlakuBulanIni, targetBerlianDasar });
      await host.save();
      return host;
    } catch (err) {
      throw new Error('Failed to add host');
    }
  }
};

module.exports = resolvers;
