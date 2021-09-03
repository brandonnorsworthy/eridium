import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Auth from './utils/auth'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import DemoSidebar from './demo/Sidebar'
import DemoContent from './demo/Content'
import Login from './components/Login'
import Signup from './components/Signup'

// const httpLink = createHttpLink({
//   uri: 'http://localhost:3001/graphql',
// });

const httpLink = createHttpLink({ uri: window.location.hostname === 'eridium.herokuapp.com' ? '/graphql' : 'http://localhost:3001/graphql' });


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

  function checkAuth() {
    if (Auth.loggedIn()) {
      return (
        <Route>
          <Sidebar />
          <Content />
        </Route>
      )
    } else {
      return (
        <Redirect to="/login" />
      )
    }
  }

  return (
    /* go to localhost:3000/demo for an example of what it will look like */
    /* components have the templates that will be used for javascript do not touch /demo folder */
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
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
