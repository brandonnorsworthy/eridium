import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Chat from './components/Chat'
import Login from './components/Login'
import Header from './components/Header'
// import Sidebar from './components/Sidebar'
import Sidebar from './model_ui/Sidebar'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <Sidebar />
          </Route>
          <Route path="/room">
            {/* <Sidebar /> */}
            <Chat />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
