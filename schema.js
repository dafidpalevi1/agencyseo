const { buildSchema } = require('graphql');

// Buat schema GraphQL
const schema = buildSchema(`
  type Host {
    _id: ID!
    hostName: String!
    accountStatus: String!
    berlianBulanIni: String!
    durasiLiveBulanIni: String!
    hariBerlakuBulanIni: String!
    targetBerlianDasar: String!
  }

  type Query {
    hosts: [Host!]!
  }

  type Mutation {
    addHost(hostName: String!, accountStatus: String!, berlianBulanIni: String!, durasiLiveBulanIni: String!, hariBerlakuBulanIni: String!, targetBerlianDasar: String!): Host!
  }
`);

module.exports = schema;
