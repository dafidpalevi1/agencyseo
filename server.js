const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema'); // Buat file schema terpisah untuk schema GraphQL

const app = express();

// Tambahkan koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Middleware GraphQL
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true // Untuk menggunakan GraphiQL IDE
}));

// Port server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
