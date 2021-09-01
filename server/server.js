const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

/* made files */
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const db = require('./config/connection');
const PORT = process.env.PORT || 3001;
const app = express();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

/* mongo */
apolloServer.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* SOCKET IO */
const socketServer = require('http').createServer(app)
const io = require('socket.io')(socketServer)
io.on('connection', (socket) => {
  console.log("[server]", '⚠ a user connected');

  socket.on('disconnect', () => {
    console.log("[server]", '⚠ user disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log("[server]", '⚠ message: ', msg);
    io.emit('chat message', msg);
  });
});

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// } else {
//   app.use(express.static(path.join(__dirname, '../client/public')));
// }

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/public/index.html'));
// });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log("[server]", `API server running on port ${PORT}!`);
    console.log("[server]", `Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`);
  });

  socketServer.listen(PORT + 10, () => {
    console.log("[server]", 'socketIO Server running on port', PORT + 10)
  })
});