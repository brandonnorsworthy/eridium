import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Chat from './components/Chat'
import Login from './components/Login'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="appContainer">
          <Header />
          <div className="appMain">
            <Sidebar />
            <Switch>
              <Route path="/room">
                <Chat />
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
