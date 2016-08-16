const express = require('express');
const graphqlHTTP = require('express-graphql')
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const db = require('./models');
const User = db.User;
const pool = db.sequelize.connectionManager.pool;
// function, the actual executor of the schema
const { graphql } = require('graphql');

// // app.use(bodyParser.urlencoded({ extended : false }));

// // I used this route to get users in the DB
// app.post('/users', function (req, res) {
//   User.create({ username: req.body.username })
//     .then(function (user) {
//       res.json(user);
//     });
// });

// the schema to execute
const mySchema = require('./schema');

app.use('/graphql', (req, res) => {
  return graphqlHTTP({
    schema: mySchema,
    graphiql: true,
    context: { pool }, // available to all graphql resolve as the third argument
  })(req, res);
});

app.listen(PORT, function() {
  db.sequelize.sync();
});