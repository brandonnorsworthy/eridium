const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

/* made files */
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const db = require('./config/connection');
const PORT = process.env.PORT || 3000;
const app = express();

/*
GraphQL = 3001
REACT = 3005
  SocketIO = 3010
*/

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

/* SOCKET IO */
const http = require('http');
const socketServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(socketServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
io.on('connection', (socket) => {
  console.log("[server]", '⚠ a user connected');
  socket.on('disconnect', () => {
    console.log("[server]", '⚠ user disconnected');
  });
});

/* mongo */
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log("[server]", `API server running on port ${PORT}!`);
    console.log("[server]", `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });

  let socketIOPort = PORT + 10
  socketServer.listen(socketIOPort, () => {
    console.log("[server]", 'socketIO Server running on port', socketIOPort)
  })
});