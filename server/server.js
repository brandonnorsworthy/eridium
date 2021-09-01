const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const cors = require('cors');

/* made files */
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const db = require('./config/connection');
const APOLLOPORT = process.env.PORT || 3001;
const SOCKETPORT = (parseInt(APOLLOPORT) + 10);
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
app.use(cors())

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
} else {
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', process.env.NODE_ENV)
  app.use(express.static(path.join(__dirname, '../client/public')));
}

app.get('/api/port', (req, res) => {
  console.log('user retrieving port from server', SOCKETPORT)
  res.json({port: SOCKETPORT})
})

app.get('/', (req, res) => {
  console.log('user getting index route')
  res.sendFile(path.join('index.html'));
});

db.once('open', () => {
  console.log(APOLLOPORT, typeof (APOLLOPORT), APOLLOPORT + 10, SOCKETPORT)
  app.listen(APOLLOPORT, () => {
    console.log("[server]", `API server running on port ${APOLLOPORT}!`);
    console.log("[server]", `Use GraphQL at http://localhost:${APOLLOPORT}${apolloServer.graphqlPath}`);
  });

  socketServer.listen(SOCKETPORT, () => {
    console.log("[server]", 'socketIO Server running on port', SOCKETPORT)
  })
});