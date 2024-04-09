module.exports = {
    plugins: [
      // plugins lainnya...
      {
        resolve: `gatsby-plugin-gql-subscriptions`,
        options: {
          websocketUrl: `ws://localhost:4000/graphql`,
        },
      },
    ],
  }
  