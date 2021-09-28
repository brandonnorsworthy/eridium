const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const path = require('path');
const cors = require('cors');
const socketio = require('socket.io')
const PORT = process.env.PORT || 3001;

// Initalizes the app server
const app = express()

//establish connection to mongoose (get db working)
const mongoose = require('mongoose');
mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost/eridium',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	}
);

//get apollo server running
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authMiddleware,
});
server.applyMiddleware({ app });

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
} else {
	app.use(express.static(path.join(__dirname, '../client/public')));
}

//force use of the domain we paid for :(
app.get(/eridium.herokuapp.com/, function (req, res) {
	res.redirect('https://www.eridium.chat/');
});

app.get('*', (req, res) => {
	console.log("[server]", 'user getting index route');
	if (process.env.NODE_ENV === 'production') {
		res.sendFile('index.html', { root: path.join(__dirname, '../client/build/') });
	} else {
		res.sendFile('index.html', { root: path.join(__dirname, '../client/public/') });
	}
});

//middleware settings
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

// Listen to port PORT, save on const to attach io to it
const http = app.listen(PORT, () =>
	console.log(`🚀 Server ready at http://localhost:${PORT}` + server.graphqlPath)
)

// Attach socket.io to the server instance
const io = socketio(http, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST']
	}
})

io.of(/^\/dynamic-[a-z0-9]+$/).on("connection", (socket) => {
	console.log('connected', socket.nsp.name)

	socket.on('channel', function (channel) {
		socket.rooms.forEach(element => socket.leave(element));
		socket.join(channel);
	});

	socket.on('message', (payload) => {
		io.of(socket.nsp.name).in(socket.rooms.values().next().value).emit('message', { ...payload });
	});
});