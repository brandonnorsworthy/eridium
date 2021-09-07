import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import React, { useState } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Auth from './utils/auth'
import Login from './components/Login'
import Signup from './components/Signup'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import CreateChannel from './components/modals/CreateChannel'
import DemoSidebar from './demo/Sidebar'
import DemoContent from './demo/Content'

const userServersInitial = JSON.parse(localStorage.getItem("servers") || "[]");
const httpLink = createHttpLink({ uri: (window.location.hostname === 'www.eridium.chat' || window.location.hostname === 'eridium.herokuapp.com') ? '/graphql' : 'http://localhost:3001/graphql' });
const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	const [activeChannel, setActiveChannel] = useState('61367e7949a4bf6080aea8c7');
	const [usersServers, setUsersServers] = useState(userServersInitial);

	function checkAuth() {
		if (Auth.loggedIn()) {
			return (
				<Route>
					<Sidebar setActiveChannel={setActiveChannel} usersServers={usersServers} />
					<Content activeChannel={activeChannel} />
					<CreateChannel />
				</Route>
			)
		} else {
			return (
				<Redirect to="/login" />
			)
		}
	}

	return (
		<ApolloProvider client={client}>
			<div className="App">
				<Router>
					<Switch>
						<Route path="/signup">
							<Signup setUsersServers={setUsersServers} />
						</Route>
						<Route path="/login">
							<Login setUsersServers={setUsersServers} />
						</Route>
						<Route path="/demo">
							<DemoSidebar />
							<DemoContent />
						</Route>
						<Route path="/">
							{checkAuth()}
						</Route>
					</Switch>
				</Router>
			</div>
		</ApolloProvider>
	);
}

export default App;
